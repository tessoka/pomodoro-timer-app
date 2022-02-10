import React, { useEffect, useState } from 'react'

const Timer = () => {

  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeLeft, setTimeLeft ] = useState(130)
  const [ displayTime, setDisplayTime ] = useState({})

  const handleClickStart = () => {
    if (!isRunning) setTimeLeft(timeLeft - 1)
    setIsRunning(!isRunning)
    console.log("clicked")
  }

  const calculateDisplayTime = () => {
    let mins = Math.floor(timeLeft / 60)
    let secs = timeLeft - (mins * 60)
    if (mins < 10) mins = "0" + mins.toString()
    if (secs < 10) secs = "0" + secs.toString()
    console.log(displayTime)
    setDisplayTime({mins, secs})
  }

  useEffect(() => {
    calculateDisplayTime()
    if (isRunning && timeLeft !== 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft-1)
      }, 1000)
    } else {
      console.log("end of count down")
      setIsRunning(false)
    }


  }, [timeLeft])

  return (
    <div className="container-timer">
      <div className="timer-progressbar">
        <div className="timer">
          <div className="timer-mins">{displayTime.mins}</div>
          <div className="timer-colon">&#58;</div>
          <div className="timer-secs">{displayTime.secs}</div>
        </div>
        <div className="timer-type">
          Work
        </div>
      </div>
      <button className="btn" onClick={handleClickStart}>{isRunning ? "Stop" : "Start"}</button>
    </div>
  )
}

export default Timer