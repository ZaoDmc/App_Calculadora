const Operacion = require('../models/operación')

const calcular = (num1, num2, tipo) => {
    switch(tipo) {
        case 'suma':           return num1 + num2
        case 'resta':          return num1 - num2
        case 'multiplicacion': return num1 * num2
        case 'division':       return num2 !== 0 ? num1 / num2 : null
        default:               return null
    }
}

const crearOperacion = async (req, res) => {
    try {
        const { nombre, numero1, numero2, operacion } = req.body

        if (!nombre || !numero1 || !numero2 || !operacion) {
            return res.status(400).json({ error: 'Faltan datos' })
        }

        const resultado = calcular(numero1, numero2, operacion)

        if (resultado === null) {
            return res.status(400).json({ error: 'Operación inválida o división por cero' })
        }

        const nueva = await Operacion.create({ nombre, numero1, numero2, operacion, resultado })
        res.status(201).json(nueva)

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
}

const obtenerOperaciones = async (req, res) => {
    try {
        const operaciones = await Operacion.findAll()
        res.json(operaciones)
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
}

const eliminarOperacion = async (req, res) => {
    try {
        const { id } = req.params
        const operacion = await Operacion.findByPk(id)

        if (!operacion) {
            return res.status(404).json({ error: 'Operación no encontrada' })
        }

        await operacion.destroy()
        res.json({ mensaje: 'Operación eliminada' })

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' })
    }
}

module.exports = { crearOperacion, obtenerOperaciones, eliminarOperacion }