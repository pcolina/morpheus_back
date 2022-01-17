/*
    RUTA: /api/clients
*/
const { Router } = require('express');
const { getUsers, addUser, updateUser } = require('../controllers/users');
const { fieldsvalidate } = require('../middleware/fieldsValidator');
const { jwtValidator } = require('../middleware/jwtValidator');

const router = Router();
const { check } = require('express-validator');

router.get('/', jwtValidator, getUsers);
router.post('/', [
        check('name', 'The field name is mandatory').not().isEmpty(),
        check('email').isEmail(),
        check('password', 'The field password is mandatory').not().isEmpty(),
        check('role', 'The field role is mandatory').not().isEmpty(),
        fieldsvalidate,
    ],
    addUser);

router.put('/:id', [
        jwtValidator,
        check('name', 'The field name is mandatory').not().isEmpty(),
        check('email').isEmail(),
        check('role', 'The field role is mandatory').not().isEmpty(),
        fieldsvalidate,
    ],
    updateUser);

module.exports = router;