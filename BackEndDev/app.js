const express = require('express');
const { Pool } = require('pg');
const ejs = require('ejs');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zitharadb',
    password: '1234', 
    port: 5432, 
  });
  
const query = 'SELECT * FROM customer_data';

app.get('/', (req, res) => {
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const rows = result.rows;
    res.json(rows);
  });
});
app.post('/nameSearch', (req, res) => {
  console.log(req.body);
  const dataSearch = req.body.name;
  console.log(`This name search is: ${dataSearch}`);
  
  const query = {
    text: 'SELECT * FROM customer_data WHERE customer_name ILIKE $1',
    values: [`${dataSearch}%`],
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const rows = result.rows;
    res.json(rows);

   });
});

app.post('/LocationSearch', (req, res) => {
  console.log(req.body);
  const dataSearch = req.body.name;
  console.log(`This name search is: ${dataSearch}`);

  const query = {
    text: 'SELECT * FROM customer_data WHERE location ILIKE $1',
    values: [`${dataSearch}%`],
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const rows = result.rows;
    res.json(rows);

   });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
