import React from 'react'

const Ventana = ({ children }) => {
  return (
    <div className="ventana">
      <div className="titlebar">
        <span className="titlebar-icon">🖩</span>
        <span className="titlebar-title">VixitoCalculator v1.0 — Calculadora</span>
        <div className="titlebar-btns">
          <div className="tb-btn min">_</div>
          <div className="tb-btn max">□</div>
          <div className="tb-btn cls">✕</div>
        </div>
      </div>
      <div className="ventana-body">
        {children}
      </div>
    </div>
  )
}

export default Ventana