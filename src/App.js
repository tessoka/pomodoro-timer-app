import React, { useState, useEffect, Suspense, lazy } from 'react'
// import Timer from './components/Timer'
import Header from './components/Header'
import Settings from './components/Settings'
import Tasks from './components/Tasks'
import ColorPicker from './components/ColorPicker'
import { SettingsContext, TaskListContext } from './utilities/Context'

const Timer = lazy(() => import('./components/Timer'))



function App() {

  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false)
  const [ currentSettings, setCurrentSettings ] = useState({})
  let [taskList, setTaskList] = useState([])

  const handleClickOnSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  useEffect(() => {
    if (localStorage.getItem("settings") === null) {
      localStorage.setItem("settings", `{"workTime": 25, "shortBreakTime": 5, "longBreakTime": 15, "rounds": 3}`)
    }
    setCurrentSettings(JSON.parse(localStorage.getItem("settings")))
    
    if (localStorage.getItem("colors") === null) {
      localStorage.setItem("colors", `{"color1": "rgb(241, 245, 251)", "color2": "rgb(80, 104, 169)", "color3": "rgb(15, 19, 31)", "color4": "rgb(244, 19, 97)"}`)
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <div className="App">
        {<ColorPicker />}
        <Header handleClickOnSettings={handleClickOnSettings}/>
        <main>
          
          <div className="container-middle">
            {
              isSettingsOpen ?
              <Settings />
              :
              <Suspense fallback={<div>Loading...</div>}>
                <Timer />
              </Suspense>
            }
          </div>

          <div className="container-tasks">
            <Tasks />
          </div>

        </main>
      </div>
    </TaskListContext.Provider>
    </SettingsContext.Provider>
  );
}

export default App;
