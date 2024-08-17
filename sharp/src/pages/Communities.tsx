import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CommunityList from '../components/CommunityList';
import CreateCommunityForm from '../components/CreateCommunityForm';
import { useCommunities, useCreateCommunity, useLeaveCommunity } from '../services/communityService';

const Communities: React.FC = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { data: communities, isLoading, error } = useCommunities();
  const createCommunity = useCreateCommunity();
  const leaveCommunity = useLeaveCommunity();

  const handleCreateCommunity = () => {
    setIsCreateFormOpen(false);
  };

  const handleLeaveCommunity = (communityId: string) => {
    leaveCommunity.mutate(communityId);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Communities
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsCreateFormOpen(true)}
        style={{ marginBottom: '1rem' }}
      >
        Create New Community
      </Button>
      
      <CommunityList 
        communities={communities || []} 
        isLoading={isLoading} 
        error={error}
        onLeaveCommunity={handleLeaveCommunity}
      />

      <Dialog open={isCreateFormOpen} onClose={() => setIsCreateFormOpen(false)}>
        <DialogTitle>Create New Community</DialogTitle>
        <DialogContent>
          <CreateCommunityForm onSubmit={handleCreateCommunity} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Communities;
