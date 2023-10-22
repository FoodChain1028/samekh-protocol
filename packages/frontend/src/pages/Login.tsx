import React, { useState, useRef } from 'react'
import Banner from './Banner'
import { User } from '../contexts/User'
import { Container, TextField, Button, Typography } from '@mui/material'

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
    <>
      <Banner />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Index"
          variant="outlined"
          onChange={(e) => setIndex(parseInt(e.target.value))}
          style={{ marginBottom: '16px', width: '100%' }}
        />
        <TextField
          type="password"
          label="Secret"
          variant="outlined"
          onChange={(e) => setSecret(parseInt(e.target.value))}
          style={{ marginBottom: '16px', width: '100%' }}
        />
        <Button variant="contained" color="primary" onClick={handleExecute}>
          Log In and Transfer
        </Button>
      </Container>
    </>
  )
}

export default Login
