const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'clasenode'
});

//Conectarnos a la base de datos
connection.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send("Bienvenido a la API de Rogelio Noris");
});

app.get('/personajes', (req, res) => {
  //Consultar los personajes
  connection.query('SELECT * FROM personajes', function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
    }
    //Regresar un objeto json con el listado de los personajes.
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});