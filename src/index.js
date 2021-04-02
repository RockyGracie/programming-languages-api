const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

app.listen(5000, () => console.log('Server started at localhost:5000'));
