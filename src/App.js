import React, { useState, useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Settings from './components/Settings'
import Tasks from './components/Tasks'
import ColorPicker from './components/ColorPicker'
import { SettingsContext, TaskListContext, ColorsContext, FontContext } from './utilities/Context'
import { ReactComponent as ColorLogo } from './svg/color-palette-outline.svg'


const Timer = lazy(() => import('./components/Timer'))



function App() {

  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false)
  const [ isColorPickerOpen, setIsColorPickerOpen ] = useState(false)
  const [ currentSettings, setCurrentSettings ] = useState({})
  const [ colorsSettings, setColorsSettings ] = useState({})
  const [ fontSettings, setFontSettings ] = useState({})
  let [taskList, setTaskList] = useState([])

  const handleClickOnSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  
  }
  const handleClickOnColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen)
  }



// ----- CHECK LOCAL STORE & SET IF FIRST TIME + SET useContexts -----
  useEffect(() => {
    if (localStorage.getItem("settingsTime") === null) {
      localStorage.setItem("settingsTime", `{"workTime": 25, "shortBreakTime": 5, "longBreakTime": 15, "rounds": 3}`)
    }
    setCurrentSettings(JSON.parse(localStorage.getItem("settingsTime")))
    
    if (localStorage.getItem("colors") === null) {
      localStorage.setItem("colors", `{"color1": "#f1f5fb", "color2": "#5068a9", "color3": "#0f131f", "color4": "#f41361"}`)
    }
    setColorsSettings(JSON.parse(localStorage.getItem("colors")))

    if (localStorage.getItem("settingFont") === null) {
      localStorage.setItem("settingFont", `{"font": "Montserrat"}`)
    }
    setFontSettings(JSON.parse(localStorage.getItem("settingFont")))

  }, [])

  
  // ----- APPLY COLORS IN CSS ON CHANGE -----
  useEffect(() => {
    if (colorsSettings.color1 !== undefined) {
      document.body.style.setProperty('--color1', colorsSettings.color1)
      document.body.style.setProperty('--color2', colorsSettings.color2)
      document.body.style.setProperty('--color3', colorsSettings.color3)
      document.body.style.setProperty('--color4', colorsSettings.color4)
      document.body.style.setProperty('--color1-rgb', hexToRgb(colorsSettings.color1))
      document.body.style.setProperty('--color2-rgb', hexToRgb(colorsSettings.color2))
      document.body.style.setProperty('--color3-rgb', hexToRgb(colorsSettings.color3))
      document.body.style.setProperty('--color4-rgb', hexToRgb(colorsSettings.color4))

      document.body.style.setProperty('font-family', fontSettings.font)
    }
  }, [colorsSettings])

  const hexToRgb = (val) => {
    const color = val
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    return `${r}, ${g}, ${b}`
  }
  

  return (
    <FontContext.Provider value={{ fontSettings, setFontSettings }}>
    <ColorsContext.Provider value={{ colorsSettings, setColorsSettings }}>
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <div className="App">
        <div className="colorlogo-bg" onClick={handleClickOnColorPicker}>
          <ColorLogo />
        </div>
        {
          isColorPickerOpen &&
            <ColorPicker />
        }
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
    </FontContext.Provider>
  );
}

export default App;
