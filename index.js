const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'ejercicio4'
});

//Conectamos a la base de datos
connection.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencode

app.get('/', (req, res) => {
  res.send("Bienvenido a la API de Alberto Vazquez");
});

app.get('/autos', (req, res) => {
  //Consultar los autos
  connection.query('SELECT * FROM autos', function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
    }
    //Regresar un objeto json con el listado de los autos.
    res.status(200).json(results);
  });
});


app.get('/autos/:id', (req, res) => {
  const id = Number(req.params.id);
  if(isNaN(id)) {
    res.status(400).json({ error: 'parametros no validos.'});
    return;
  }
  //Consultar los autos
  connection.query(`SELECT * FROM autos WHERE id=?`, [id] ,function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
      return;
    }
    if(results.length === 0) {
      res.status(404).json({ error: 'personaje no existente.'});
      return;
    }
    //Regresar un objeto json con el listado de los autos.
    res.status(200).json(results);
  });
});

app.post('/autos', (req, res) => {
  console.log("req", req.body);
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const descripcion = req.body.descripcion;
  connection.query(`INSERT INTO autos (marca, modelo, descripcion) VALUES (?,?,?)`, [marca,modelo,descripcion] ,function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
      return;
    }
    res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});