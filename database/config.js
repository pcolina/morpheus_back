const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL);

        console.log('db connection succesfully');
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion en la base de datos');
    }

}


module.exports = {
    dbConnection
}