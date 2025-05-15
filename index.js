// backend/index.js
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

app.get('/api/data', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT * FROM computers`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de connexion à la base de données');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Backend en écoute sur le port ${port}`));
