import React from 'react'
import profileImg from '../../images/image-jeremy.png';
import './profile.css'

function Profile({handleActive, active}) {
    return (
        <section className="card">
            <div className="card__profile">
                <div className="card__profile__img">
                    <img src={profileImg} alt="Jeremy Robson" />
                </div>
                <div className="card__profile__name">
                    <p>Report for</p>
                    <h1>Jeremy<br /> Robson</h1>
                </div>
            </div>
            <div className="card__options">
                <button className={active === 'daily' ?  'btn active' : 'btn'} onClick={() => handleActive('daily')}>Daily</button>
                <button className={active === 'weekly' ?  'btn active' : 'btn'} onClick={() => handleActive('weekly')}>Weekly</button>
                <button className={active === 'monthly' ?  'btn active' : 'btn'} onClick={() => handleActive('monthly')}>Monthly</button>
            </div>
        </section>
    )
}

export default Profile