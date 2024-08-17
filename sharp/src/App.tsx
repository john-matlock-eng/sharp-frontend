import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './pages/Home';
import Communities from './pages/Communities';
import CommunityDetail from './components/CommunityDetail';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QuizForm from './components/QuizForm';
import Quiz from './components/Quiz';
import { signOut } from 'aws-amplify/auth';

const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff',
    },
  },
});

const Root = styled('div')({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const MainContainer = styled(Container)({
  marginTop: '2rem',
});

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Root>
            <AppBar position="static">
              <Toolbar>
                <Title variant="h6">SHARP</Title>
                <Button color="inherit" href="/">Home</Button>
                <Button color="inherit" href="/communities">Communities</Button>
                <Button color="inherit" onClick={() => signOut}>Sign Out</Button>
              </Toolbar>
            </AppBar>
            <MainContainer>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/communities/:communityId" element={<CommunityDetail />} />
                <Route path="/community/:communityId/create-quiz" element={<CreateOrEditQuiz />} />
                <Route path="/community/:communityId/quiz/:quizId" element={<Quiz />} />
                <Route path="/community/:communityId/edit-quiz/:quizId" element={<CreateOrEditQuiz />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MainContainer>
          </Root>
        </Router>
      </ThemeProvider>
    </Authenticator.Provider>
  );
};

const CreateOrEditQuiz: React.FC = () => {
  const { communityId, quizId } = useParams<{ communityId: string; quizId?: string }>();
  const navigate = useNavigate();
  const handleSubmitSuccess = () => {
    navigate(`/community/${communityId}`);
  };

  return (
    <QuizForm
      communityId={communityId!}
      quizId={quizId}
      onSubmitSuccess={handleSubmitSuccess}
    />
  );
};

export default App;
