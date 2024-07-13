import React from 'react';
import { Typography, Button, ButtonGroup } from '@mui/material';

interface MultipleChoiceQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {question.question}
      </Typography>
      <ButtonGroup orientation="vertical">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer === option ? 'contained' : 'outlined'}
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Typography variant="body1" color="primary">
        {selectedAnswer === question.answer ? 'Correct!' : 'Incorrect.'}
      </Typography>
    </div>
  );
};

export default MultipleChoiceQuestion;
