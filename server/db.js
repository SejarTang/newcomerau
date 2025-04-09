const { Pool } = require('pg');

const pool = new Pool({
  user: 'immi_project',
  host: 'ie-project-db.c5ewi2w0m89v.ap-southeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'immi_project',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;