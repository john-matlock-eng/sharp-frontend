import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

interface LongFormQuestionProps {
  question: {
    id: number;
    question: string;
    answer: string;
  };
  onAnswer: (answer: string) => void;
}

const LongFormQuestion: React.FC<LongFormQuestionProps> = ({ question, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = () => {
    onAnswer(userAnswer);
    setShowAnswer(true);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {question.question}
      </Typography>
      <TextField
        label="Your Answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
      {showAnswer && (
        <Typography variant="body1" color="textSecondary">
          {question.answer}
        </Typography>
      )}
    </div>
  );
};

export default LongFormQuestion;
