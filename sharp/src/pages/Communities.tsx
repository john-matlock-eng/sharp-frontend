import React from 'react';
import { Container, Typography } from '@mui/material';
import CreateCommunityForm from '../components/CreateCommunityForm';
import CommunityList from '../components/CommunityList';

const Communities: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Communities
      </Typography>
      <CreateCommunityForm />
      <CommunityList />
    </Container>
  );
};

export default Communities;
