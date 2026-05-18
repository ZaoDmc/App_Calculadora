import React, { useEffect, useRef } from 'react'

const Historial = ({ operaciones, onEliminar }) => {
  const mensajesRef = useRef(null)

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [operaciones])

  return (
    <div className="hist-panel">
      <div className="msn-header">
        <div className="msn-avatar">D</div>
        <div className="msn-info">
          <div className="msn-name">Dante — Devil May Cry</div>
          <div className="msn-status">En línea — Listo para el combate</div>
        </div>
      </div>
      <div className="msn-messages" ref={mensajesRef}>
        <div className="msg recv">
          <div className="msg-name">Dante</div>
          <div className="msg-bubble">Bienvenido mi rey. Aquí verás todas las operaciones que vayas guardando.</div>
          <div className="msg-meta">ahora</div>
        </div>
        {operaciones.map((op) => (
          <React.Fragment key={op.id}>
            <div className="msg recv">
              <div className="msg-name">Dante</div>
              <div className="msg-bubble">
                Operación guardada: <strong>{op.nombre}</strong>
              </div>
              <div className="msg-meta">{new Date(op.createdAt).toLocaleTimeString()}</div>
            </div>
            <div className="msg sent">
              <div className="msg-name">Tú</div>
              <div className="msg-bubble">
                {op.numero1} {op.operacion} {op.numero2} = <strong>{op.resultado}</strong>
                <span className="msg-delete" onClick={() => onEliminar(op.id)}>🗑</span>
              </div>
              <div className="msg-meta">{new Date(op.createdAt).toLocaleTimeString()}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Historial