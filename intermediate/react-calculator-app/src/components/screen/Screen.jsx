import React from 'react'
import './screen.css'

function Screen({input}) {
  return (
    <section className='screen'>
        <div data-screen>{input}</div>
    </section>
  )
}

export default Screen