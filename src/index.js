const express = require('express')
const { conectarDB, sequelize } = require('./database/conexion')
const Operacion = require('./models/operacion')
const operacionesRouter = require('./routes/operaciones')
const app = express()
const PORT = 3000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
})
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
