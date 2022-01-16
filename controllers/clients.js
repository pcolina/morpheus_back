const { response } = require("express");
const Clients = require("../models/client");

const getClients = async(req, res) => {
    const clients = await Clients.find();
    res.json({
        ok: true,
        msg: "getClientes",
        clients,
    });
};

const addClients = async(req, res = response) => {
    const { email } = req.body;

    try {
        console.log(req.body.email);
        const existeEmail = await Clients.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El cliente ya esta dado de alta",
            });
        }
        const clients = new Clients(req.body);

        await clients.save();

        res.json({
            ok: true,
            clients,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error de sistema. consulte con el administrador",
        });
    }
};

module.exports = {
    getClients,
    addClients,
};