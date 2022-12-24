import React from 'react'
import './history.css'
import closeImg from '../../images/close.png';

function History({handleHistory, hisOpen, historyData, setInputHis}) {
    return (
        <section className={hisOpen?'history-section open': 'history-section'}>
            <div className="his-container">
                <div className="history-head">
                    <h2 className="title">History</h2>
                    <img className='close-img' onClick={() => handleHistory(false)} src={closeImg} alt="close histroy section" />
                </div>
                <ul className="history-data">
                    {historyData.map(data => <li key={data.id}>
                        <p onClick={(e) => setInputHis(e.target.textContent)}>{data.cal}</p>
                        <p onClick={(e) => setInputHis(e.target.textContent)}>{data.res}</p>
                    </li>)}
                </ul>
            </div>
        </section>
    )
}

export default History