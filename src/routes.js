const { Router } = require('express');
const { createPool } = require('mysql');

const router = Router();

const db = createPool({
  host: 'localhost',
  user: 'root',
  database: 'languagesdb',
});

//
// GET ALL LANGUAGES
router.get('/languages', (request, response) => {
  db.getConnection((err, connection) => {
      if (err) throw err;

      console.log(`Connected as id ${connection.threadId}`);

      connection.query('SELECT * FROM languagesinfo ORDER BY name ASC', (err, rows) => {
         connection.release(); // return connection to pool

         if (err) return response.status.json('error');

         response.json(rows);
      });
  });
});

//
// GET LANGUAGE BY ID
router.get('/languages/:id', (request, response) => {
   const { id } = request.params;

   db.getConnection((err, connection) => {
      if (err) throw err;

      console.log(`Connected as id ${connection.threadId}`);

      connection.query('SELECT * FROM languagesinfo WHERE id = ?', [id], (err, rows) => {
         connection.release();

         if (err) return response.status(400).json('error');

         if (!id) return response.status(404).json({ error: 'Language not found.' });

         response.json(rows);
      });
   });
});

//
// POST LANGUAGE
router.post('/languages', (request, response) => {
   const {
 name, created_by, created_in, style_type,
} = request.body;

   db.getConnection((err, connection) => {
      if (err) throw err;

      console.log(`Connected as id ${connection.threadId}`);

      connection.query(`
         INSERT INTO languagesinfo(name, created_by, created_in, style_type)
         VALUES(?, ?, ?, ?)
      `,
      [name, created_by, created_in, style_type], (err, rows) => {
         if (err) return response.status(400).json('Error');

         if (!name) return response.status(400).json({ error: 'Name is required' });
         if (!created_by) return response.status(400).json({ error: 'Year of creation is required' });
         if (!created_in) return response.status(400).json({ error: 'Who created is required' });
         if (!style_type) return response.status(400).json({ error: 'Style typing is required.' });

         response.json(rows);
      });
   });
});

//
// DELETE LANGUAGE
router.delete('/languages/:id', (request, response) => {
   const { id } = request.params;

   db.getConnection((err, connection) => {
      if (err) throw err;

      console.log(`Connected as id ${connection.threadId}}`);

      connection.query('DELETE FROM languagesinfo WHERE id = ?', [id], (err, rows) => {
         connection.release();

         if (err) return response.status(400).json('Error');

         response.sendStatus(204);
      });
   });
});

module.exports = router;
