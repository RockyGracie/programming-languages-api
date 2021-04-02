const { Router } = require('express');
const { createPool } = require('mysql');

const router = Router();

const db = createPool({
  host: 'localhost',
  user: 'root',
  database: 'languagesdb',
});

router.get('/languages', (request, response) => {
  db.getConnection((err, connection) => {
      if (err) throw err;

      console.log(`Connected as id ${connection.threadId}`);

      connection.query('SELECT * FROM languagesinfo ORDER BY name ASC', (err, rows) => {
         connection.release(); // return connection to pool

         if (err) return response.json({ error: 'error' });

         response.json(rows);
      });
  });
});

module.exports = router;
