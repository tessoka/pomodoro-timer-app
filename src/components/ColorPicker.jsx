import React, { useState, useEffect } from 'react'

const ColorPicker = () => {

  const [ colorSettings, setColorSettings ] = useState(JSON.parse(localStorage.getItem("colors")))

  const [ c1, setC1 ] = useState(colorSettings.color1)
  const [ c2, setC2 ] = useState(colorSettings.color2)
  const [ c3, setC3 ] = useState(colorSettings.color3)
  const [ c4, setC4 ] = useState(colorSettings.color4)

  const [ selectedColor, setSelectedColor ] = useState([])



  const cp = document.querySelector('#cp')

  const handleClickOnColor = (e) => {
    console.log(e.target.style.backgroundColor)
    if (e.target.style.backgroundColor === "rgb(241, 245, 251)" || e.target.style.backgroundColor === "rgb(244, 19, 97)") {
      cp.style.setProperty("color", "rgb(15, 19, 31)")
      cp.style.setProperty("border-color", "rgb(15, 19, 31)")
    } else {
      cp.style.setProperty("color", "rgb(241, 245, 251)")
      cp.style.setProperty("border-color", "rgb(244, 19, 97)")
    }

    console.log("c1")
    console.log(c1)

    let temp = e.target.style.backgroundColor.replace("rgb", "").replaceAll(" ", "").slice(1, e.target.style.backgroundColor.replace("rgb", "").replaceAll(" ", "").length-1).split(",")
    setSelectedColor({red: parseInt(temp[0]), green: parseInt(temp[1]), blue: parseInt(temp[2])})
    cp.style.setProperty("background-color", e.target.style.backgroundColor)
  }


  const handleSetRed = (e) => {
    console.log(e.target.value)
    setSelectedColor({red: parseInt(e.target.value), green: selectedColor.green, blue: selectedColor.blue})
  }

  const handleSetGreen = (e) => {
    console.log(e.target.value)
  }

  const handleSetBlue = (e) => {
    console.log(e.target.value)
  }

  useEffect(() => {
    console.log("selected color:")
    console.log(selectedColor)
  }, [selectedColor])

  return (
    <div id="cp" className="container-colorpicker">
      <div className="cp-header">
        <p>ColorPicker</p>
      </div>
      <div className="cp-colors">
        <p style={{backgroundColor: `${c1}`}} onClick={(e) => handleClickOnColor(e)}></p>
        <p style={{backgroundColor: `${c2}`}} onClick={(e) => handleClickOnColor(e)}></p>
        <p style={{backgroundColor: `${c3}`}} onClick={(e) => handleClickOnColor(e)}></p>
        <p style={{backgroundColor: `${c4}`}} onClick={(e) => handleClickOnColor(e)}></p>
      </div>
      <div className="cp-sliders">
        <p>Red</p><input type="range" min="0" max="255" value={selectedColor.red} onMouseMove={(e) => handleSetRed(e)}/>
        <p>Green</p><input type="range" min="0" max="255" value={selectedColor.green}  onMouseMove={(e) => handleSetGreen(e)}/>
        <p>Blue</p><input type="range" min="0" max="255" value={selectedColor.blue}  onMouseMove={(e) => handleSetBlue(e)}/>
      </div>
    </div>
  )
}

export default ColorPicker