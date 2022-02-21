import React, { useEffect, useState, useContext } from 'react'
import { SettingsContext } from '../utilities/Context'

const Settings = () => {

  const { currentSettings, setCurrentSettings } = useContext(SettingsContext)

  const [ workTime, setWorkTime ] = useState(currentSettings.workTime)
  const [ shortBreakTime, setShortBreakTime ] = useState(currentSettings.shortBreakTime)
  const [ longBreakTime, setLongBreakTime ] = useState(currentSettings.longBreakTime)
  const [ rounds, setRounds ] = useState(currentSettings.rounds)

  const handleClickReset = () => {
    setWorkTime(25)
    setShortBreakTime(5)
    setLongBreakTime(15)
    setRounds(3)
  }

  useEffect(() => {
    setNewLocalStoreData()
  }, [workTime, shortBreakTime, longBreakTime, rounds])

  const setNewLocalStoreData = () => {
    localStorage.setItem("settingsTime", `{"workTime": ${workTime}, "shortBreakTime": ${shortBreakTime}, "longBreakTime": ${longBreakTime}, "rounds": ${rounds}}`)
    setCurrentSettings(JSON.parse(localStorage.getItem("settings")))
  }

  const handleClickWork = (e) => {
    if (e.target.innerText === "+") {
      setWorkTime(workTime+1)
    } else if (workTime !== 0) {
      setWorkTime(workTime-1)
    }
  }

  const handleClickShortBreak = (e) => {
    if (e.target.innerText === "+") {
      setShortBreakTime(shortBreakTime+1)
    } else if (shortBreakTime !== 0) {
      setShortBreakTime(shortBreakTime-1)
    }
  }

  const handleClickLongBreak = (e) => {
    if (e.target.innerText === "+") {
      setLongBreakTime(longBreakTime+1)
    } else if (longBreakTime !== 0) {
      setLongBreakTime(longBreakTime-1)
    }
  }

  const handleClickRounds = (e) => {
    if (e.target.innerText === "+") {
      setRounds(rounds+1)
    } else if (rounds !== 0) {
      setRounds(rounds-1)
    }
  }

  return (
    <div className="container-mid modal-settings">
      <div className="container-mid-top">
        <p>Timer Settings</p>
      </div>
      <div className="container-mid-mid">
        <div className="box-work">
          <button className="btn-small" onClick={(e) => handleClickWork(e)}>-</button>
          <div className="box-mid">
            <p>Focus</p>
            <div className="val">{workTime}:00</div>
          </div>
          <button className="btn-small" onClick={(e) => handleClickWork(e)}>+</button>
        </div>
        <div className="box-sbreak">
          <button className="btn-small" onClick={(e) => handleClickShortBreak(e)}>-</button>
          <div className="box-mid">
            <p>Short Break</p>
            <div className="val">{shortBreakTime}:00</div>
          </div>
          <button className="btn-small" onClick={(e) => handleClickShortBreak(e)}>+</button>
        </div>
        <div className="box-lbreak">
        <button className="btn-small" onClick={(e) => handleClickLongBreak(e)}>-</button>
          <div className="box-mid">
            <p>Long Break</p>
            <div className="val">{longBreakTime}:00</div>
          </div>
          <button className="btn-small" onClick={(e) => handleClickLongBreak(e)}>+</button>
        </div>
        <div className="box-rounds">
          <button className="btn-small" onClick={(e) => handleClickRounds(e)}>-</button>
          <div className="box-mid">
            <p>Rounds</p>
            <div className="val">{rounds}</div>
          </div>
          <button className="btn-small" onClick={(e) => handleClickRounds(e)}>+</button>
        </div>
      </div>
      <div className="container-mid-bot">
        <button className="btn" onClick={handleClickReset}>Reset</button>
      </div>
    </div>
  )
}

export default Settings