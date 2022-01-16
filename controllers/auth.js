const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt")

const login = async(req, res) => {
    //const users = await Users.find();

    const { email, password } = req.body;

    try {

        const usuarioDB = await User.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        // verify pass
        console.log(password, usuarioDB.password);
        const validPass = bcrypt.compareSync(password, usuarioDB.password);


        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not correct'
            });
        }

        // TOKEN GENERATION 
        const token = await generateJWT(usuarioDB._id);

        res.json({
            ok: true,
            token,

        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: ' something was wrong. please contact the admistrator'
        })
    }

};

module.exports = {
    login,

};