import React, { useState } from 'react'
import { crearOperacion } from '../services/api'

const Calculadora = ({ onOperacionGuardada }) => {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [op, setOp] = useState('')
  const [resultado, setResultado] = useState('0')
  const [expr, setExpr] = useState('')
  const [nombre, setNombre] = useState('')
  const [ultimoCalculo, setUltimoCalculo] = useState(null)

  const opSym = (o) => ({'+':'+','-':'−','*':'×','/':'÷','%':'%'}[o] || o)
  const opNombre = (o) => ({'+':'suma','-':'resta','*':'multiplicacion','/':'division','%':'division'}[o] || 'suma')

  const agregarNum = (n) => {
    if (!op) {
      if (n === '.' && num1.includes('.')) return
      const nuevo = num1 + n
      setNum1(nuevo)
      setResultado(nuevo)
      setExpr(nuevo)
    } else {
      if (n === '.' && num2.includes('.')) return
      const nuevo = num2 + n
      setNum2(nuevo)
      setResultado(nuevo)
      setExpr(num1 + ' ' + opSym(op) + ' ' + nuevo)
    }
  }

  const elegirOp = (o) => {
    if (!num1) return
    setOp(o)
    setExpr(num1 + ' ' + opSym(o) + ' ')
  }

  const calcular = () => {
    if (!num1 || !op || !num2) return
    const a = parseFloat(num1)
    const b = parseFloat(num2)
    let res
    if (op === '+') res = a + b
    else if (op === '-') res = a - b
    else if (op === '*') res = a * b
    else if (op === '/') res = b !== 0 ? a / b : null
    else if (op === '%') res = a * (b / 100)
    if (res === null) { setResultado('Error'); return }
    const rounded = parseFloat(res.toFixed(6))

    // Capturamos todo ANTES de tocar cualquier estado
    const calculo = {
      numero1: a,
      numero2: b,
      operacion: opNombre(op),
      resultado: rounded
    }

    setUltimoCalculo(calculo)
    setResultado(String(rounded))
    setExpr(num1 + ' ' + opSym(op) + ' ' + num2 + ' =')
    setNum1(String(rounded))
    setNum2('')
    setOp('')
  }

  const limpiar = () => {
    setNum1(''); setNum2(''); setOp('')
    setResultado('0'); setExpr('')
    setNombre(''); setUltimoCalculo(null)
  }

  const borrar = () => {
    if (!op) setNum1(prev => prev.slice(0, -1))
    else if (num2) setNum2(prev => prev.slice(0, -1))
    else setOp('')
  }

  const guardar = async () => {
    if (!nombre || !ultimoCalculo) {
      alert('Primero realiza un cálculo y ponle un nombre')
      return
    }
    try {
      const nueva = await crearOperacion({
        nombre,
        ...ultimoCalculo
      })
      onOperacionGuardada(nueva)
      setNombre('')
      setUltimoCalculo(null)
    } catch (error) {
      console.error('Error guardando:', error)
      alert('Error al guardar — verifica que el backend esté corriendo')
    }
  }

  return (
    <div className="calc-main">
      <div className="screen">
        <div className="screen-expr">{expr || '\u00a0'}</div>
        <div className="screen-result">{resultado}</div>
      </div>
      <div className="btn-grid">
        <div className="btn btn-clear" onClick={limpiar}>C</div>
        <div className="btn btn-clear" onClick={borrar}>⌫</div>
        <div className="btn btn-op" onClick={() => elegirOp('%')}>%</div>
        <div className="btn btn-op" onClick={() => elegirOp('/')}>÷</div>

        <div className="btn btn-num" onClick={() => agregarNum('1')}>1</div>
        <div className="btn btn-num" onClick={() => agregarNum('2')}>2<span className="sub">ABC</span></div>
        <div className="btn btn-num" onClick={() => agregarNum('3')}>3<span className="sub">DEF</span></div>
        <div className="btn btn-op" onClick={() => elegirOp('+')}>+</div>

        <div className="btn btn-num" onClick={() => agregarNum('4')}>4<span className="sub">GHI</span></div>
        <div className="btn btn-num" onClick={() => agregarNum('5')}>5<span className="sub">JKL</span></div>
        <div className="btn btn-num" onClick={() => agregarNum('6')}>6<span className="sub">MNO</span></div>
        <div className="btn btn-op" onClick={() => elegirOp('-')}>−</div>

        <div className="btn btn-num" onClick={() => agregarNum('7')}>7<span className="sub">PQRS</span></div>
        <div className="btn btn-num" onClick={() => agregarNum('8')}>8<span className="sub">TUV</span></div>
        <div className="btn btn-num" onClick={() => agregarNum('9')}>9<span className="sub">WXYZ</span></div>
        <div className="btn btn-op" onClick={() => elegirOp('*')}>×</div>

        <div className="btn btn-num btn-cero" onClick={() => agregarNum('0')}>0</div>
        <div className="btn btn-num" onClick={() => agregarNum('.')}>.</div>
        <div className="btn btn-eq" onClick={calcular}>=</div>
      </div>
      <div className="name-row">
        <input
          className="name-input"
          placeholder="Nombre de la operación..."
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <button className="save-btn" onClick={guardar}>Guardar</button>
      </div>
    </div>
  )
}

export default Calculadora