import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

interface LongFormQuestionProps {
  question: {
    id: string;
    question: string;
    answer: string[];
  };
  onAnswer: (answer: string[]) => void;
}

const LongFormQuestion: React.FC<LongFormQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = () => {
    onAnswer([userAnswer]); // Pass the answer as an array
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
          Correct Answer: {question.answer.join(', ')} {/* Display the correct answer */}
        </Typography>
      )}
    </div>
  );
};

export default LongFormQuestion;
