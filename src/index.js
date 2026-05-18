const express = require('express')
const cors = require('cors')
const { conectarDB, sequelize } = require('./database/conexion')
const Operacion = require('./models/operacion')
const operacionesRouter = require('./routes/operaciones')
const app = express()
const PORT = 3000

app.use(cors({ origin: 'http://localhost:3001' }))
app.use(express.json())
app.use('/operaciones', operacionesRouter)

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor funcionando!' })
})

const iniciar = async () => {
    await conectarDB()
    await sequelize.sync({ alter: true })
    console.log('Tablas sincronizadas')
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}

iniciar()