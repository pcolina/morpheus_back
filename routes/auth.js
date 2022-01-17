/*
    Path: /api/login
*/
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { fieldsvalidate } = require('../middleware/fieldsValidator');

const router = Router();

const { check } = require('express-validator');
const { jwtValidator } = require('../middleware/jwtValidator');


router.post('/', [
        check('email', 'The field name is mandatory').not().isEmpty(),
        check('password', 'The field password is mandatory').not().isEmpty(),
        fieldsvalidate,
    ],
    login);

router.get('/renew', [
        jwtValidator,
        renewToken
    ],
    login);



module.exports = router;