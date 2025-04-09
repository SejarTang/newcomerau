const { Pool } = require('pg');

const pool = new Pool({
  host: 'ie-project-db.c5ewi2w0m89v.ap-southeast-2.rds.amazonaws.com',
  user: 'immi_project',
  password: 'immi_project',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }

});

module.exports = pool;
