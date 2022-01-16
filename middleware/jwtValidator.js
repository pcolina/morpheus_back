const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Unauthorized request. Not Token send"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Unauthorized request. Token invalid"
        })
    }

}

module.exports = {
    jwtValidator
}