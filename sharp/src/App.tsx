import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Communities from './pages/Communities';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              SHARP
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/communities">
              Communities
            </Button>
            <Button color="inherit" component={Link} to="/quiz">
              Quiz
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
