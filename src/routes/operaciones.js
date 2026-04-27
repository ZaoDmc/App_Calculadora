const express = require('express')
const router = express.Router()
const { crearOperacion, obtenerOperaciones, eliminarOperacion } = require('../controllers/operacionController')

router.get('/', obtenerOperaciones)
router.post('/', crearOperacion)
router.delete('/:id', eliminarOperacion)

module.exports = router