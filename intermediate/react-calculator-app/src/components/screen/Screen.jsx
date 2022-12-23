import React from 'react'
import './screen.css'

function Screen({input, handleSetInput}) {
  return (
    <section className='screen'>
        <input type="text" name='res' value={input} onChange={(e) => handleSetInput(e.target.value)}/>
    </section>
  )
}

export default Screen