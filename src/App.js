import React, { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Header from './components/Header'
import Settings from './components/Settings'
import { SettingsContext } from './utilities/Context'




function App() {

  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false)
  const [ currentSettings, setCurrentSettings ] = useState({})

  const handleClickOnSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  useEffect(() => {
    if (localStorage.getItem("settings") === null) {
      localStorage.setItem("settings", `{"workTime": 25, "shortBreakTime": 5, "longBreakTime": 15, "rounds": 3}`)
    }
    setCurrentSettings(JSON.parse(localStorage.getItem("settings")))
    console.log(JSON.parse(localStorage.getItem("settings")))
  }, [])

  return (
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
      <div className="App">
        <Header handleClickOnSettings={handleClickOnSettings}/>
        <main>
          
          <div className="container-middle">
            {
              isSettingsOpen ?
              <Settings />
              :
              <Timer />
            }
          </div>

          <div className="container-tasks">

          </div>

        </main>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
