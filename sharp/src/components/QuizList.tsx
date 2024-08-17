import React from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress, IconButton } from '@mui/material';
import { useQuizzes, useDeleteQuiz } from '../services/quizService';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface QuizListProps {
  communityId: string;
}

const QuizList: React.FC<QuizListProps> = ({ communityId }) => {
  const navigate = useNavigate();
  const { data: quizzes, isLoading, error } = useQuizzes(communityId);
  const { user } = useAuthenticator(context => [context.user]);

  // Invoke useDeleteQuiz hook
  const deleteQuiz = useDeleteQuiz();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading quizzes</Typography>;

  if (!quizzes || quizzes.length === 0) {
    return <Typography>No quizzes available for this community.</Typography>;
  }

  const handleQuizClick = (quizId: string) => {
    navigate(`/community/${communityId}/quiz/${quizId}`);
  };

  const handleEditClick = (quizId: string) => {
    navigate(`/community/${communityId}/edit-quiz/${quizId}`);
  };

  const handleDeleteClick = async (quizId: string) => {
    try {
      await deleteQuiz.mutateAsync({ communityId, quizId });
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Failed to delete quiz', error);
    }
  };

  return (
    <List>
      {quizzes.map((quiz) => (
        <ListItem key={quiz.quiz_id} button onClick={() => handleQuizClick(quiz.quiz_id)}>
          <ListItemText primary={quiz.title} secondary={quiz.description} />
          {quiz.owner_ids && quiz.owner_ids.includes(user.userId) && (
            <>
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleEditClick(quiz.quiz_id);
              }}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(quiz.quiz_id);
              }}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default QuizList;
