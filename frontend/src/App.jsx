import React, { useState, useEffect } from 'react'
import Ventana from './components/Ventana'
import Calculadora from './components/Calculadora'
import Historial from './components/Historial'
import { obtenerOperaciones, eliminarOperacion } from './services/api'
import './components/Ventana.css'
import './components/Calculadora.css'
import './components/Historial.css'

const App = () => {
  const [vista, setVista] = useState('calc')
  const [operaciones, setOperaciones] = useState([])

  useEffect(() => {
    cargarOperaciones()
  }, [])

  const cargarOperaciones = async () => {
    try {
      const data = await obtenerOperaciones()
      setOperaciones(data)
    } catch (error) {
      console.error('Error cargando operaciones:', error)
    }
  }

  const handleOperacionGuardada = (nueva) => {
    setOperaciones(prev => [...prev, nueva])
  }

  const handleEliminar = async (id) => {
    try {
      await eliminarOperacion(id)
      setOperaciones(prev => prev.filter(op => op.id !== id))
    } catch (error) {
      console.error('Error eliminando:', error)
    }
  }

  return (
    <Ventana>
      <div className="tab-bar">
        <div
          className={`tab ${vista === 'calc' ? 'active' : ''}`}
          onClick={() => setVista('calc')}
        >
          Calculadora
        </div>
        <div
          className={`tab ${vista === 'hist' ? 'active' : ''}`}
          onClick={() => setVista('hist')}
        >
          Historial MSN
        </div>
      </div>
      <div className="content">
        <div className="dante-bg">
          <img src="/dante.jpg" alt="Dante DMC3" className="dante-img" />
        </div>
        {vista === 'calc' ? (
          <div className="calc-overlay">
            <Calculadora onOperacionGuardada={handleOperacionGuardada} />
          </div>
        ) : (
          <Historial
            operaciones={operaciones}
            onEliminar={handleEliminar}
          />
        )}
      </div>
      <div className="statusbar">
        <span>Listo</span>
        <div className="sep"></div>
        <span>MySQL conectado</span>
        <div className="sep"></div>
        <span>{operaciones.length} operaciones guardadas</span>
      </div>
    </Ventana>
  )
}

export default App