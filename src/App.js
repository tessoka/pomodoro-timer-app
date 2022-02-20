import React, { useState, useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Settings from './components/Settings'
import Tasks from './components/Tasks'
// import ColorPicker from './components/ColorPicker'
import { SettingsContext, TaskListContext, ColorsContext } from './utilities/Context'

const Timer = lazy(() => import('./components/Timer'))
const ColorPicker = lazy(() => import('./components/ColorPicker'))



function App() {

  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false)
  const [ currentSettings, setCurrentSettings ] = useState({})
  const [ colorsSettings, setColorsSettings ] = useState({})
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
      localStorage.setItem("colors", `{"color1": "#f1f5fb", "color2": "#5068a9", "color3": "#0f131f", "color4": "#f41361"}`)
    }
    setColorsSettings(JSON.parse(localStorage.getItem("colors")))
    
  }, [])

  return (
    <ColorsContext.Provider value={{ colorsSettings, setColorsSettings }}>
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <ColorPicker />
        </Suspense>
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
    </ColorsContext.Provider>
  );
}

export default App;
