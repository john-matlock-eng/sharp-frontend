import React from 'react';
import {
  List,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Community } from '../services/communityService';
import { ExitToApp } from '@mui/icons-material';

interface CommunityListProps {
  communities: Community[];
  isLoading: boolean;
  error: Error | null;
  onLeaveCommunity: (communityId: string) => void;
}

const CommunityList: React.FC<CommunityListProps> = ({ communities, isLoading, error, onLeaveCommunity }) => {
  const navigate = useNavigate();

  const handleCardClick = (communityId: string) => {
    navigate(`/communities/${communityId}`);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading communities: {error.message}</Typography>;

  return (
    <List sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
      {communities.map((community, index) => (
        <Card key={index} sx={{ mb: 2, '&:hover': { boxShadow: 6 } }}>
          <Box onClick={() => handleCardClick(community.community_id)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={9}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {community.community_name}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Description:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {community.description || 'No description available'}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Members:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {community.members && community.members.length > 0 ? community.members.length : 'No members'}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Keywords:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        {community.keywords && community.keywords.length > 0 ? community.keywords.join(', ') : 'No keywords'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3} container justifyContent="flex-end" alignItems="center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      onLeaveCommunity(community.community_id);
                    }}
                    color="secondary"
                    variant="contained"
                    startIcon={<ExitToApp />}
                    sx={{ mt: 1 }}
                  >
                    Leave
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Card>
      ))}
    </List>
  );
};

export default CommunityList;
