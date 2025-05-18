#!/usr/bin/env python
import sys
import json
import pandas as pd
from prophet import Prophet

def main():
    # 预测期（月）
    horizon = int(sys.argv[1]) if len(sys.argv) > 1 else 12

    # 从 stdin 读取历史数据
    raw = sys.stdin.read()
    if not raw.strip():
        sys.stderr.write("ERROR: No input data provided via stdin\n")
        sys.exit(1)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        sys.stderr.write(f"ERROR: Invalid JSON input: {e}\n")
        sys.exit(1)

    # 构建 DataFrame
    df = pd.DataFrame(data)
    if 'ds' not in df.columns or 'share' not in df.columns:
        sys.stderr.write("ERROR: Input JSON must contain 'ds' and 'share'\n")
        sys.exit(1)
    df['ds'] = pd.to_datetime(df['ds'])
    df = df.rename(columns={'share': 'y'})

    # 拟合 Prophet（仅趋势）
    model = Prophet(
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False
    )
    model.fit(df)

    # 预测未来
    future = model.make_future_dataframe(periods=horizon, freq='M')
    forecast = model.predict(future)

    # 合并历史与预测
    merged = (
        future
        .merge(forecast[['ds','yhat','yhat_lower','yhat_upper']], on='ds', how='left')
        .merge(df[['ds','y']], on='ds', how='left')
    )

    # 输出 JSON
    result = []
    for row in merged.itertuples(index=False):
        result.append({
            'ds':           row.ds.strftime('%Y-%m-%d'),
            'share':        None if pd.isna(row.y) else float(row.y),
            'yhat':         None if pd.isna(row.yhat) else float(row.yhat),
            'yhat_lower':   None if pd.isna(row.yhat_lower) else float(row.yhat_lower),
            'yhat_upper':   None if pd.isna(row.yhat_upper) else float(row.yhat_upper),
        })

    print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__':
    main()
