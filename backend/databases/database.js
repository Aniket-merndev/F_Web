// import mysql from 'mysql2'

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// }).promise()

// async function getEntries() {
//     const [result] = await pool.query("SELECT * FROM main");
//     return result
// }


// export {getEntries, pool}






// import env from 'dotenv';

// import pkg from 'pg';
// const { Pool } = pkg;

// env.config();

// // const pool = new pg.Pool({

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// async function getEntries() {
//   const result = await pool.query("SELECT * FROM main");
//   return result.rows;
// }

// export { getEntries, pool };


import env from 'dotenv';
env.config();

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function getEntries() {
  const result = await sql`SELECT * FROM main`;
  return result; // result is an array of rows
}

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

console.log(requestHandler);

export { getEntries, sql as pool };

