import React from 'react'
import './screen.css'

function Screen({input}) {
  return (
    <section className='screen'>
        <div>{input}</div>
    </section>
  )
}

export default Screen