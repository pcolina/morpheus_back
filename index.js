const express = require("express");

const app = express();

// rutas
app.get(  '/' , (req, res) => {

    res.json({
        ok: true,
        msg: "hola mundo"
    })
});

app.listen( 3000, () =>{

    console.log("servidor corriendo en  puerto "+ 3000);
})