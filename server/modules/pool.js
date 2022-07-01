const pg = require('pg');

const Pool = pg.Pool;

// create a new pool instance to manage our connections
const pool = new Pool({

  database: 'Koala-holla',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

// not required but useful for debugging
pool.on('connect', () => {
    console.log('Postgres connected! WOOOO');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

// allow access to this pool from other code
module.exports = pool;
