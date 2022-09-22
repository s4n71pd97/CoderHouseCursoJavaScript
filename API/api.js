const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const {
    response
} = require("express");
const puerto = process.env.PORT || 5000
let cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors());
var corsOptions = {
    origin: function (origin, callback) {
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
      db.loadOrigins(function (error, origins) {
        callback(error, origins)
      })
    }
  }
  

//MYSQL

const conexion = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b4154c58a4549e",
    password: "f9fa92d6",
    database: "heroku_1959a2e571e2bfc"
})

//PruebaConexion

conexion.connect(error => {
    if (error) throw error;
    console.log("funciono")

})

app.listen(puerto, () => console.log('el puerto es ' + puerto));


//routeos

app.get("/",(req, response)=>{
    response.send("funciono")
})

app.get("/traer", cors(), (req, response) => {
    const sql = `SELECT * FROM personas`;

    conexion.query(sql, (error, result) => {
        if (error) throw error
        if (result.length > 0) {
            response.json(result)

        } else {
            response.send("no resultado")
        }
    })

})

app.get("/traerConId/:id", cors(), (req, response) => {
    const {id} = req.params
    const sql = `SELECT * FROM personas where id = ${id}`;

    conexion.query(sql, (error, result) => {
        if (error) throw error
        if (result.length > 0) {
            response.json(result)

        } else {
            response.send("no resultado")
        }
    })

})

app.post("/carga",cors(),(req, response) => {
    const sql = "INSERT INTO Personas SET ?";
    const PersonaObject = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        DNI: req.body.DNI,
        CUIL: req.body.CUIL,
        Ciudad:req.body.Ciudad,
        Direccion:req.body.Direccion,
    }

    conexion.query(sql, PersonaObject, error => {
        if(error) throw error
        response.send("Persona creado")

    })
})
