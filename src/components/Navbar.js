import React from 'react'

import logo from '../assets/images/logo.png'
import logoBuilt from '../assets/images/logo-built.png'

export default function Navbar() {
  return (
    <div className='navbar'>
        <img className='logo' src={logo} alt="" />
        <h1>AI Pulse Check</h1>
        <img src={logoBuilt} alt="" className='logoBuilt' />
    </div>
  )
}
