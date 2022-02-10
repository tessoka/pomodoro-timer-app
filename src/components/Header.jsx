import React, { useState } from 'react'
import {SettingsLogo} from '../svg/svg-d-texts.js'

const Header = () => {

  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false)


  const handleClickOnSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
    console.log("settings clicked")
  }

  return (
    <header>
      <div>The RocketLab</div>
      <div className="logo-settings" onClick={handleClickOnSettings}>
        <svg viewBox="0 0 512 512"><path d={SettingsLogo} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
      </div>
    </header>
  )
}

export default Header