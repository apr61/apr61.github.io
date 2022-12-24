import React from 'react'
import './header.css'
import { useTheme, useThemeFun } from '../../context/ThemeContext'

function Header() {
  const theme = useTheme();
  const themeFun = useThemeFun();
  return (
    <header>
      <h1 className='title'>calc</h1>
      <p className='theme'>THEME</p>
      <fieldset>
        <label htmlFor="theme1">1</label>
        <input type="radio" checked={theme === 'theme1'} onChange={() => themeFun('theme1')} name="theme" id='theme1' />
        <label htmlFor="theme2">2</label>
        <input type="radio" checked={theme === 'theme2'} onChange={() => themeFun('theme2')} name="theme" id='theme2' />
        <label htmlFor="theme3">3</label>
        <input type="radio" checked={theme === 'theme3'} onChange={() => themeFun('theme3')} name="theme" id='theme3' />
      </fieldset>
    </header>
  )
}

export default Header