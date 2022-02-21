import React, { useState, useContext } from 'react'
import { ColorsContext } from '../utilities/Context'


const ColorPicker = () => {

  const { colorsSettings, setColorsSettings } = useContext(ColorsContext)

  const [ c1, setC1 ] = useState(colorsSettings.color1)
  const [ c2, setC2 ] = useState(colorsSettings.color2)
  const [ c3, setC3 ] = useState(colorsSettings.color3)
  const [ c4, setC4 ] = useState(colorsSettings.color4)



  const hexToRgb = (e) => {
    const color = e.target.value
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    return `${r}, ${g}, ${b}`
  }


  const handleColorChange1 = (e) => {
    const rgb = hexToRgb(e)
    localStorage.setItem("colors", `{"color1": "${e.target.value}", "color2": "${c2}", "color3": "${c3}", "color4": "${c4}"}`)
    document.body.style.setProperty('--color1', e.target.value)
    document.body.style.setProperty('--color1-rgb', rgb)
    setC1(e.target.value)
  }

  const handleColorChange2 = (e) => {
    const rgb = hexToRgb(e)
    localStorage.setItem("colors", `{"color1": "${c1}", "color2": "${e.target.value}", "color3": "${c3}", "color4": "${c4}"}`)
    document.body.style.setProperty('--color2', e.target.value)
    document.body.style.setProperty('--color2-rgb', rgb)
    setC2(e.target.value)
  }

  const handleColorChange3 = (e) => {
    const rgb = hexToRgb(e)
    localStorage.setItem("colors", `{"color1": "${c1}", "color2": "${c2}", "color3": "${e.target.value}", "color4": "${c4}"}`)
    document.body.style.setProperty('--color3', e.target.value)
    document.body.style.setProperty('--color3-rgb', rgb)
    setC3(e.target.value)
  }

  const handleColorChange4 = (e) => {
    const rgb = hexToRgb(e)
    localStorage.setItem("colors", `{"color1": "${c1}", "color2": "${c2}", "color3": "${c3}", "color4": "${e.target.value}"}`)
    document.body.style.setProperty('--color4', e.target.value)
    document.body.style.setProperty('--color4-rgb', rgb)
    setC4(e.target.value)
  }

  const handleClickOnResetColors = () => {
    localStorage.setItem("colors", `{"color1": "#f1f5fb", "color2": "#5068a9", "color3": "#0f131f", "color4": "#f41361"}`)
    setColorsSettings(JSON.parse(localStorage.getItem("colors")))
    setC1(colorsSettings.color1)
    setC2(colorsSettings.color2)
    setC3(colorsSettings.color3)
    setC4(colorsSettings.color4)
  }

  const handleSelectedFont = (e) => {
    localStorage.setItem("settingFont", `{"font": "${e.target.innerText}"}`)
    document.body.style.setProperty("font-family", e.target.innerText)
  }


  return (
    <div id="cp" className="container-colorpicker">
      <div className="cp-header">
        <p>ColorPicker</p>
      </div>
      <div className="cp-box">
        <div className="cp-colors">
            <input type="color" value={`${c1}`} onChange={(e) => handleColorChange1(e)} />
            <input type="color" value={`${c2}`} onChange={(e) => handleColorChange2(e)} />
            <input type="color" value={`${c3}`} onChange={(e) => handleColorChange3(e)} />
            <input type="color" value={`${c4}`} onChange={(e) => handleColorChange4(e)} />
        </div>
        <button className="btn btn-wide" onClick={handleClickOnResetColors}>Reset Colors</button>
        <div className="dropdown-fonts">
          <button className="btn btn-wide">Select Font</button>
          <div className="dropdown-content">
            <div className="dropdown-element" onClick={(e) => handleSelectedFont(e)}>Montserrat</div>
            <div className="dropdown-element" onClick={(e) => handleSelectedFont(e)}>Red Hat Mono</div>
            <div className="dropdown-element" onClick={(e) => handleSelectedFont(e)}>Roboto Mono</div>
            <div className="dropdown-element" onClick={(e) => handleSelectedFont(e)}>Space Grotesk</div>
            <div className="dropdown-element" onClick={(e) => handleSelectedFont(e)}>Ubuntu Mono</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker