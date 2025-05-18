#!/usr/bin/env python
import sys
import json
import os
import pandas as pd
from prophet import Prophet
import psycopg2

"""
Dynamic forecasting service: reads continuous hfce_share table (monthly ds & share),
fits Prophet, outputs JSON with history and forecast.
"""

def main():
    # Forecast horizon in months, default=12
    horizon = int(sys.argv[1]) if len(sys.argv) > 1 else 12

    # Database URL, can override via env var
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://immi_project:newcomeraudsbas6@"
        "ie-project-db.c5ewi2w0m89v.ap-southeast-2.rds.amazonaws.com:5432/newcomerau_db"
    )

    # 1. Read continuous monthly data from hfce_share table
    conn = psycopg2.connect(DATABASE_URL)
    df = pd.read_sql(
        "SELECT ds, share FROM hfce_share ORDER BY ds",
        conn,
        parse_dates=["ds"]
    )
    conn.close()

    # 2. Prepare data for Prophet
    # Prophet expects columns 'ds' (datetime) and 'y' (numeric)
    df = df.rename(columns={'share': 'y'})

    # 3. Fit Prophet model (trend only)
    model = Prophet(
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False
    )
    model.fit(df)

    # 4. Construct future dataframe & forecast
    future = model.make_future_dataframe(periods=horizon, freq="M")
    forecast = model.predict(future)

    # 5. Merge history 'y' and forecast outputs
    merged = (
        future
        .merge(
            forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']],
            on='ds', how='left'
        )
        .merge(
            df[['ds','y']], on='ds', how='left'
        )
    )

    # 6. Build JSON result
    result = []
    for row in merged.itertuples(index=False):
        result.append({
            'ds': row.ds.strftime('%Y-%m-%d'),
            'share': None if pd.isna(row.y) else float(row.y),
            'yhat': None if pd.isna(row.yhat) else float(row.yhat),
            'yhat_lower': None if pd.isna(row.yhat_lower) else float(row.yhat_lower),
            'yhat_upper': None if pd.isna(row.yhat_upper) else float(row.yhat_upper),
        })

    # 7. Output JSON
    print(json.dumps(result))

if __name__ == '__main__':
    main()
