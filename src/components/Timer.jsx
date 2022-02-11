import React, { useEffect, useState, useContext } from 'react'
import { SettingsContext } from '../utilities/Context'

const Timer = () => {

  const { currentSettings, setCurrentSettings } = useContext(SettingsContext)

  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeLeft, setTimeLeft ] = useState(currentSettings.workTime * 60)
  const [ displayTime, setDisplayTime ] = useState({})
  const [ selectedType, setSelectedType ] = useState("Focus")
  const [ refreshDisplayTime, setRefreshDisplayTime ] = useState(false)

  
  const calculateDisplayTime = () => {
    let mins = Math.floor(timeLeft / 60).toString()
    let secs = Math.floor(timeLeft - (mins * 60)).toString()
    if (mins < 10) mins = "0" + mins.toString()
    if (secs < 10) secs = "0" + secs.toString()
    // console.log(displayTime)
    setRefreshDisplayTime(!refreshDisplayTime)
    setDisplayTime({mins, secs})
  }

  const handleClickType = (e) => {
    console.log("CLICKED ON CHANGE")
    setSelectedType(e.target.innerText)
    console.log(currentSettings)
    if (e.target.innerText === "Focus") setTimeLeft(currentSettings.workTime * 60)
    if (e.target.innerText === "Short Break") setTimeLeft(currentSettings.shortBreakTime * 60)
    if (e.target.innerText === "Long Break") setTimeLeft(currentSettings.longBreakTime * 60)
    if (isRunning) setIsRunning(false)
    console.log(timeLeft)
  }

  const handleClickStart = () => {
    if (!isRunning) setTimeLeft(timeLeft * 1.00000000001)
    setIsRunning(!isRunning)
    calculateDisplayTime()
    console.log("timeLeft:")
    console.log(timeLeft)
    console.log("clicked")
  }
  
  useEffect(() => {
    document.title = displayTime.mins + ":" + displayTime.secs
    console.log(timeLeft)
    if (isRunning && timeLeft !== 0) {
      calculateDisplayTime()
      setTimeout(() => {
        setTimeLeft(timeLeft-1)
      }, 1000)
    } else {
      console.log("end of count down")
      setIsRunning(false)
    }
  }, [timeLeft])

  useEffect(() => {
    console.log("DEFAULT useEffect INITIATED")
    console.log(timeLeft)
    calculateDisplayTime()
  }, [selectedType])

  return (
    <div className="container-mid">
      <div className="container-mid-top">
        <button disabled={isRunning} onClick={(e) => handleClickType(e)}>Focus</button>
        <button disabled={isRunning} onClick={(e) => handleClickType(e)}>Short Break</button>
        <button disabled={isRunning} onClick={(e) => handleClickType(e)}>Long Break</button>
      </div>
      <div className="container-mid-mid">
        <div className="timer-progressbar">
          <div className="timer">
            <div className="timer-mins">{displayTime.mins}</div>
            <div className="timer-colon">&#58;</div>
            <div className="timer-secs">{displayTime.secs}</div>
          </div>
          <div className="timer-type val">
            {selectedType}
          </div>
        </div>
      </div>
      <div className="container-mid-bot">
        <button className="btn" onClick={handleClickStart}>{isRunning ? "Stop" : "Start"}</button>
      </div>
    </div>
  )
}

export default Timer