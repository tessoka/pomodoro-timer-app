import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import { ColorsContext } from '../utilities/Context'

const ColorPicker = () => {

  const { colorsSettings, setColorsSettings } = useContext(ColorsContext)

  const [ c1, setC1 ] = useState(colorsSettings.color1)
  const [ c2, setC2 ] = useState(colorsSettings.color2)
  const [ c3, setC3 ] = useState(colorsSettings.color3)
  const [ c4, setC4 ] = useState(colorsSettings.color4)

  const r = document.getElementById('root')


  const handleColorChange1 = (e) => {
    // console.log(e.target.value)
    localStorage.setItem("colors", `{"color1": "${e.target.value}", "color2": "#5068a9", "color3": "#0f131f", "color4": "#f41361"}`)
    // setColorsSettings(JSON.parse(localStorage.getItem("colors")))
    r.style.setProperty('--color1', e.target.value)
    setC1(e.target.value)
  }


  useEffect(() => {
    console.log("selected color:")
    console.log(c1)
  }, [])

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

          <input type="color" />
  
      </div>
    </div>
  )
}

export default ColorPicker