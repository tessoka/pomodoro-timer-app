import React from 'react'
import { ReactComponent as SettingsLogo } from '../svg/settings-outline.svg'
import { ReactComponent as RocketLogo } from '../svg/rocket.svg'



const Header = ({handleClickOnSettings}) => {

  return (
    <header>
      <div className="logo-box">
        <RocketLogo />
          <p className="small-the">The</p>
          <p>RocketLab</p>
      </div>
      <div className="logo-settings" onClick={handleClickOnSettings}>
        <SettingsLogo />
      </div>
    </header>
  )
}

export default Header