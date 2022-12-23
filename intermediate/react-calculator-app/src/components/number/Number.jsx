import React from 'react'
import './number.css'


const operators = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '+': 'plus',
  'x': 'mul',
  '-': 'minus',
  '/': 'div',
  '.': 'dot',
  'reset': 'reset',
  'del': 'del'
}

function Number(props) {
  const { num, handleNumber, handleReset, handleRemove } = { ...props }
  return (
    <button type={num === 'reset' ? 'reset' : num === '=' ? 'submit' : 'button'}
      className={operators[num]}
      onClick={num === 'reset'? () => handleReset() : num === 'del'? () => 
      handleRemove() : (e) => handleNumber(e.target.textContent)}>{num}</button>
  )
}

export default Number