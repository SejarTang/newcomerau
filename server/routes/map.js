// routes/map.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// get map locations
router.get('/map-locations', async (req, res) => {
  try {
    // clinics
    const clinicsQuery = `
      SELECT c.clinic_code, c.clinic_type, c.clinic_name, c.clinic_address, c.suburb, c.post_code, c.phone, c.opening_hours, c.rating, c.service,
             g.latitude, g.longitude
      FROM clinics c
      JOIN clinics_geospatial g ON c.clinic_code = g.clinic_code
    `;
    const clinics = await db.query(clinicsQuery);

    // hospitals
    const hospitalsQuery = `
      SELECT h.hos_code, h.hos_type, h.hos_state, h.hos_name, h.suburb, h.postcode, h.second_tier_eligible, h.second_tier_category,
             h.hos_address, h.phone, h.opening_hours, h.rating, h.service,
             g.latitude, g.longitude
      FROM hospitals_victoria h
      JOIN hospital_geospatial g ON h.hos_code = g.hos_code
    `;
    const hospitals = await db.query(hospitalsQuery);

    // hospital_type type
    const privateHospitals = hospitals.rows.filter(h => h.hos_type === 'Private Hospital');
    const publicHospitals = hospitals.rows.filter(h => h.hos_type === 'Public Hospital');

    res.json({
      clinics: clinics.rows,
      privateHospitals,
      publicHospitals,
    });
  } catch (error) {
    console.error('Error fetching map locations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
