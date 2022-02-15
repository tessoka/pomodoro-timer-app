import React from 'react'
import { SettingsLogo, RocketLogo } from '../svg/svg-d-texts.js'



const Header = ({handleClickOnSettings}) => {

  return (
    <header>
      <div className="logo-box">
        <svg viewBox="0 0 512 512"><path d={RocketLogo} /></svg>
        <p>
          <p className="small-the">The</p>
          RocketLab
        </p>
      </div>
      <div className="logo-settings" onClick={handleClickOnSettings}>
        <svg viewBox="0 0 512 512"><path d={SettingsLogo} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
      </div>
    </header>
  )
}

export default Header