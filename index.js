require('dotenv').config();

const express = require("express");
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());

// lectura y parseo del body
app.use(express.json());


dbConnection();

// rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: "hola mundo"
    })
});

// Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/clients', require('./routes/clients'));




app.listen(process.env.port, () => {

    console.log("servidor corriendo en  puerto " + 3000);
})