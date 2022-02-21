import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import { ColorsContext } from '../utilities/Context'

const ColorPicker = () => {

  const { colorsSettings } = useContext(ColorsContext)

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


  return (
    <div id="cp" className="container-colorpicker">
      <div className="cp-header">
        <p>ColorPicker</p>
      </div>
      <div className="cp-colors">

        <Form.Control
          type="color"
          id="primaryColor-1"
          defaultValue={`${c1}`}
          onChange={(e) => handleColorChange1(e)}
          />

          <input type="color" value={`${c2}`} onChange={(e) => handleColorChange2(e)} />
          <input type="color" value={`${c3}`} onChange={(e) => handleColorChange3(e)} />
          <input type="color" value={`${c4}`} onChange={(e) => handleColorChange4(e)} />
  
      </div>
    </div>
  )
}

export default ColorPicker