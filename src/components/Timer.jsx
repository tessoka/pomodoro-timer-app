import React, { useEffect, useState } from 'react'

const Timer = () => {

  const [ isRunning, setIsRunning ] = useState(false)
  const [ workTime, setWorkTime ] = useState(1500)

  const handleClickStart = () => {
    setIsRunning(!isRunning)
    console.log("clicked")
  }

  useEffect(() => {
    console.log("haha")
  }, [])

  return (
    <div className="container-timer">
      <div className="timer-progressbar">
        <div className="timer">
          25:00
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