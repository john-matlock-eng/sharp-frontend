import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Typography, CircularProgress, Box, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs } from '@mui/material';
import { useQuery } from 'react-query';
import { getCommunityById } from '../services/communityService';
import QuizIcon from '@mui/icons-material/Quiz';
import Badge from './common/Badge';
import PeopleIcon from '@mui/icons-material/People';
import QuizList from './QuizList';

const CommunityDetail: React.FC = () => {
  const { communityId } = useParams<{ communityId?: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const { data, isLoading, error } = useQuery(
    ['community', communityId],
    () => getCommunityById(communityId!),
    {
      enabled: !!communityId,
    }
  );

  if (!communityId) {
    return <Navigate to="/" />;
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading community</Typography>;

  const community = data;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateQuiz = () => {
    navigate(`/community/${communityId}/create-quiz`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {community?.community_name ?? ''}
        <Badge
          label={`${community?.members?.length || 'No members'}`}
          color="green"
          IconComponent={PeopleIcon}
          tooltip={`Members: ${community?.members?.length || 'No members'}`}
        />
        {community?.keywords && community.keywords.length > 0 ? (
          community.keywords.slice(0, 5).map((keyword, index) => (
            <Badge key={index} label={keyword} color="orange" tooltip={`Keyword: ${keyword}`} />
          ))
        ) : (
          <Typography variant="body2">No keywords</Typography>
        )}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {community?.description || 'No description available'}
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Quizzes" />
        <Tab label="Knowledge Sources" />
      </Tabs>

      <Box mt={2}>
        {tabValue === 0 && <QuizList communityId={communityId!} />}
        {tabValue === 1 && <Typography>Knowledge Sources feature coming soon!</Typography>}
      </Box>

      <SpeedDial
        ariaLabel="Add Actions"
        icon={<SpeedDialIcon />}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <SpeedDialAction
          icon={<QuizIcon />}
          tooltipTitle="Create Quiz"
          onClick={handleCreateQuiz}
        />
      </SpeedDial>
    </Box>
  );
};

export default CommunityDetail;
