// routes/maplocations.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// get map locations
router.get('/maplocations', async (req, res) => {
  try {
    // Clinics
    const clinicsQuery = `
      SELECT c.clinic_code, c.clinic_type, c.clinic_name, c.clinic_address, c.suburb, c.post_code, c.phone, c.opening_hours, c.rating, c.service,
             g.latitude, g.longitude
      FROM clinics c
      JOIN clinics_geospatial g ON c.clinic_code = g.clinic_code
    `;
    const clinics = await db.query(clinicsQuery);

    // Hospitals
    const hospitalsQuery = `
      SELECT h.hos_code, h.hos_type, h.hos_state, h.hos_name, h.suburb, h.postcode, h.second_tier_eligible, h.second_tier_category,
             h.hos_address, h.phone, h.opening_hours, h.rating, h.service,
             g.latitude, g.longitude
      FROM hospitals_victoria h
      JOIN hospital_geospatial g ON h.hos_code = g.hos_code
    `;
    const hospitals = await db.query(hospitalsQuery);

    // Schools
    const schoolsQuery = `
      SELECT s.provider_id, s.provider_type, s.provider_name, s.provider_address,
             s.suburb, s.postcode, s.phone, s.rating,
             g.latitude, g.longitude
      FROM education_provider s
      JOIN education_provider_location g ON s.provider_id = g.provider_id
    `;
    const schools = await db.query(schoolsQuery);

    // Hospital_type type
    const privateHospitals = hospitals.rows.filter(h => h.hos_type === 'PRIVATE');
    const publicHospitals = hospitals.rows.filter(h => h.hos_type === 'PUBLIC');

    res.json({
      clinics: clinics.rows,
      privateHospitals,
      publicHospitals,
      schools: schools.rows
    });
  } catch (error) {
    console.error('Error fetching map locations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
