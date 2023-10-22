// src/components/Banner.tsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Banner: React.FC = () => {
  const [isListVisible, setListVisible] = useState(false)

  const toggleListVisibility = () => {
    setListVisible(!isListVisible)
  }

  return (
    <div className="banner">
      <button className="list-toggle-button" onClick={toggleListVisibility}>
        ☰
      </button>
      <h1>𐤎 Samekh Protocol</h1>
      {isListVisible && (
        <div className="list-popup">
          <ul>
            <li>
              <Link to="/" onClick={toggleListVisibility}>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={toggleListVisibility}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleListVisibility}>
                Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Banner
