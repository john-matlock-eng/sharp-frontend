import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

interface FlashCardQuestionProps {
  question: {
    id: number;
    question: string;
    answer: string;
  };
  onAnswer: (answer: string) => void;
}

const FlashCardQuestion: React.FC<FlashCardQuestionProps> = ({ question, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = () => {
    onAnswer(userAnswer);
    setShowAnswer(true);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {question.question}
        </Typography>
        {showAnswer ? (
          <>
            <Typography variant="body1" color="textSecondary">
              {question.answer}
            </Typography>
            <Typography variant="body1" color="primary">
              {userAnswer === question.answer ? 'Correct!' : 'Incorrect.'}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label="Your Answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashCardQuestion;
