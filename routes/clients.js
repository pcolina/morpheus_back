/*
    RUTA: /api/clients
*/
const { Router } = require('express');
const { getClients } = require('../controllers/clients')
const { addClients } = require('../controllers/clients')

const router = Router();


router.get('/', getClients);
router.post('/', addClients);

module.exports = router;