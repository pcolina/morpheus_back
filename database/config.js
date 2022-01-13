const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false');

    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion en la base de datos');
    }

}