import React from 'react'
import { useState } from 'react'
import Profile from '../components/profile/Profile'
import Task from '../components/task/Task'
import taskData from '../data/data.json';
import './home.css'

const time = {
    "daily": 'Yesterday',
    "weekly": "Last Week",
    "monthly": "Last Month"
}

const Home = () => {
    const [data, ] = useState(taskData);
    const [activeTracker, setActiveTracker] = useState('daily')
    
    function handleActive(tracker){
        setActiveTracker(tracker);
    }

    return (
        <main className="container">
            <Profile active={activeTracker}  handleActive={handleActive}/>
            <section className="card__wrapper">
                { data.map(d => <Task key={d.title} tData={d} time={activeTracker} summaryTime={time[activeTracker]}/>) }
            </section>
        </main>
    )
}

export default Home