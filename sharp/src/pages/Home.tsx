import React from 'react';
import { Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to SHARP
      </Typography>
      <Typography>
        Find or create a knowledge space and test your knowledge!
      </Typography>
    </Container>
  );
};

export default Home;
