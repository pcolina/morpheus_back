/*
    RUTA: /api/clients
*/
const { Router } = require('express');
const { getClients } = require('../controllers/clients')
const { addClients } = require('../controllers/clients')
const { fieldsvalidate } = require('../middleware/fieldsValidator');

const router = Router();
const { check } = require('express-validator');

router.get('/', getClients);
router.post('/', [
        check('name', 'The field name is mandatory').not().isEmpty(),
        check('document_type', 'The field document_type is mandatory').not().isEmpty(),
        check('document_number', 'The field document_number is mandatory').not().isEmpty(),
        check('email').isEmail(),
        fieldsvalidate,
    ],
    addClients);

module.exports = router;