import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import { User, UserId } from '../contexts/User';
import { Container, Button, Typography, Box } from '@mui/material';

const SignUp: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [dataRender, setDataRender] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSignUp = async () => {
    const random = Math.floor(Math.random() * 10000000000);
    const userId = { secret: random, index: 0 } as UserId;
    const newUser = new User(userId);
    const index = await newUser.signUp();
    newUser.setIndex(index);
    setUser(newUser);
    setSuccess(true);
  };

  useEffect(() => {
    if (success) {
      setDataRender(true);
      setSuccess(false);
    }
  }, [success]);

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
          This is Sign Up Page!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please sign up with your own secret.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          sx={{ marginBottom: '16px' }}
        >
          Sign Up
        </Button>
        {dataRender && (
          <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
            <Typography>This is your secret and index:</Typography>
            <Typography>Secret: {user?.userId.secret.toString()}</Typography>
            <Typography>Index: {user?.userId.index.toString()}</Typography>
          </Box>
        )}
        <Typography variant="body2">
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            I already have an account, go Log In
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default SignUp;
