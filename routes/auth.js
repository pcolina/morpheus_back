/*
    Path: /api/login
*/
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { fieldsvalidate } = require('../middleware/fieldsValidator');

const router = Router();

const { check } = require('express-validator');


router.post('/', [
        check('email', 'The field name is mandatory').not().isEmpty(),
        check('password', 'The field password is mandatory').not().isEmpty(),
        fieldsvalidate,
    ],
    login);



module.exports = router;