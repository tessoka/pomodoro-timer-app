import React, { useEffect, useState, useContext } from 'react'
import { SettingsContext } from '../utilities/Context'
import AlarmTone from '../mp3/never.mp3'


const Timer = () => {

  const { currentSettings, setCurrentSettings } = useContext(SettingsContext)

  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeLeft, setTimeLeft ] = useState(currentSettings.workTime * 60)
  const [ selectedTime, setSelectedTime ] = useState(currentSettings.workTime * 60)
  const [ displayTime, setDisplayTime ] = useState({})
  const [ selectedType, setSelectedType ] = useState("Focus")
  const [ typeClicked, setTypeClicked ] = useState(true)
  const [ refreshDisplayTime, setRefreshDisplayTime ] = useState(false)
  const r = document.querySelector('#pb')
  const [ progressValue, setProgressValue ] = useState(936)

  
  const calculateDisplayTime = () => {
    let mins = Math.floor(timeLeft / 60).toString()
    let secs = Math.floor(timeLeft - (mins * 60)).toString()
    if (mins < 10) mins = "0" + mins.toString()
    if (secs < 10) secs = "0" + secs.toString()
    // console.log(displayTime)
    setRefreshDisplayTime(!refreshDisplayTime)
    setDisplayTime({mins, secs})
    document.title = mins + ":" + secs + " - " + selectedType
  }

  const handleClickType = (value) => {
    setSelectedType(value)
    setTypeClicked(!typeClicked)
    setProgressValue(936)
    r.style.setProperty('--progress', 936)

    if (value === "Focus") {
      setTimeLeft(currentSettings.workTime * 60)
      setSelectedTime(currentSettings.workTime * 60)
    }
    if (value === "Short Break") {
      setTimeLeft(currentSettings.shortBreakTime * 60 * 0.25)
      setSelectedTime(currentSettings.shortBreakTime * 60 * 0.25)
    }
    if (value === "Long Break") {
      setTimeLeft(currentSettings.longBreakTime * 60)
      setSelectedTime(currentSettings.longBreakTime * 60)
    }
    if (isRunning) setIsRunning(false)
  }

  const handleClickStart = () => {
    if (!isRunning) setTimeLeft(timeLeft * 1.00000000001)
    setIsRunning(!isRunning)
    calculateDisplayTime()
  }
  
  
  useEffect(() => {

    console.log("timeLeft")
    console.log(timeLeft)
    console.log("progressValue")
    console.log(progressValue)
    if (isRunning && timeLeft > 0) {
      // let progressVal = (936 - (936 / selectedTime * (selectedTime - timeLeft)))
      setProgressValue((936 - (936 / selectedTime * (selectedTime - timeLeft + 1))))
      r.style.setProperty('--progress', progressValue)

      calculateDisplayTime()
      setTimeout(() => {
        setTimeLeft(timeLeft-1)
      }, 1000)
    } else {
      console.log("end of count down")
      setIsRunning(false)
      if (timeLeft <= 0) {
        new Audio(AlarmTone).play()
        if (selectedType !== "Focus") {
          handleClickType("Focus")
        }
        if (selectedType === "Focus") {
          handleClickType("Short Break")
        }
      }
    }
  }, [timeLeft])



  useEffect(() => {
    calculateDisplayTime()
  }, [typeClicked])

  return (
    <div className="container-mid">
      <div className="container-mid-top">
        <button disabled={isRunning} onClick={(e) => handleClickType(e.target.innerText)}>Focus</button>
        <button disabled={isRunning} onClick={(e) => handleClickType(e.target.innerText)}>Short Break</button>
        <button disabled={isRunning} onClick={(e) => handleClickType(e.target.innerText)}>Long Break</button>
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

          <div className="progress-bar">
            <svg>
              <circle id="pb" cx="155" cy="155" r="149" strokeLinecap="round"/>
            </svg>
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