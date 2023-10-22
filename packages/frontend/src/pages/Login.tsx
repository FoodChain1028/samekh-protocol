import React, { useState, useRef } from 'react'
import Banner from './Banner'
import { User } from '../contexts/User'

const Login: React.FC = () => {
  const [index, setIndex] = useState<number>(0)
  const [secret, setSecret] = useState<number>(0)

  // Function to handle the login and transfer action
  const handleExecute = async () => {
    const userId = {
      secret: secret,
      index: index,
    }
    const user = new User(userId)
    const res = await user.execute()
    console.log(res)
  }
  return (
    <div className="page-container">
      <Banner />
      <h2 className="page-header">Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Index"
          className="input-field"
          value={index}
          onChange={(e) => setIndex(parseInt(e.target.value))}
        />
        <input
          type="password"
          placeholder="Secret"
          className="input-field"
          value={secret}
          onChange={(e) => setSecret(parseInt(e.target.value))}
        />
        <button className="login-button page-button" onClick={handleExecute}>
          Log In and Transfer{' '}
        </button>
      </div>
    </div>
  )
}

export default Login
