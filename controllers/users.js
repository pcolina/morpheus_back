const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

const getUsers = async(req, res) => {
    const users = await User.find();
    res.json({
        ok: true,
        msg: "getUsers",
        users,
    });
};

const addUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        console.log(req.body.email);
        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El cliente ya esta dado de alta",
            });
        }
        const user = new User(req.body);

        // Encript the pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        res.json({
            ok: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error de sistema. consulte con el administrador",
        });
    }
};

const updateUser = async(req, res = response) => {

    const uid = req.params.id;
    try {
        const usuarioDB = await User.findById(uid)

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, id, email, ...campos } = req.body;
        console.log(usuarioDB.email, ' === ', req.body.email);

        if (usuarioDB.email !== email) {

            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe ese email en el sistema'
                });
            }
        }

        campos.email = email;

        const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            user: userUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser
};