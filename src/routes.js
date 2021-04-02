const { Router } = require('express');
const { createConnection } = require('mysql');

const router = Router();

const db = createConnection({
  host: 'localhost',
  user: 'root',
  database: 'languagesdb',
});

router.get('/languages', (request, response) => {

});

module.exports = router;
