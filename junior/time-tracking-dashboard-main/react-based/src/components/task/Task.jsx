import React from 'react'
import './task.css'

function Task({tData, time, summaryTime}) {
    return (
        <div className={`card card--color--${tData.title.toLowerCase()}`}>
            <div className="card__data">
                <div className="card__data__title__menu">
                    <h2 className="card__data__title">{tData.title}</h2>
                    <i class="fa-solid icon"></i>
                </div>
                <div className="card__data__summary">
                    <div className="card__data__current">{tData.timeframes[time].current}hrs</div>
                    <div className="card__data__previous">{summaryTime} - {tData.timeframes[time].previous}hrs</div>
                </div>
            </div>
        </div>
    )
}

export default Task