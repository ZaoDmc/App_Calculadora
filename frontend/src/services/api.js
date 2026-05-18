import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const crearOperacion = async (datos) => {
    const response = await api.post('/operaciones', datos)
    return response.data
}

export const obtenerOperaciones = async () => {
    const response = await api.get('/operaciones')
    return response.data
}

export const eliminarOperacion = async (id) => {
    const response = await api.delete(`/operaciones/${id}`)
    return response.data
}