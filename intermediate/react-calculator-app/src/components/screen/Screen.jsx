import React from 'react'
import './screen.css'
import HistoryImg from '../../images/history.png';
import HistoryImgWhite from '../../images/history-white.png';
import { useTheme } from '../../context/ThemeContext';

function Screen({input,hisOpen, handleHistory}) {
  const theme = useTheme();
  return (
    <section className='screen'>
      <div className="history">
        <img src={theme === 'theme2' ? HistoryImg : HistoryImgWhite} onClick={() => handleHistory(!hisOpen)} alt="history" aria-hidden='true' />
      </div>
      <div className='input'>{input}</div>
    </section>
  )
}

export default Screen