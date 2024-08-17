import React from 'react';
import { Typography, Button, ButtonGroup } from '@mui/material';

interface MultipleChoiceQuestionProps {
  question: {
    id: string;
    question: string;
    options: string[];
    answer: string[];
  };
  onAnswer: (answer: string[]) => void;
  selectedAnswer: string[];
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  selectedAnswer,
}) => {
  // Helper function to toggle an option
  const toggleOption = (option: string) => {
    if (selectedAnswer.includes(option)) {
      // Deselect the option
      onAnswer(selectedAnswer.filter((ans) => ans !== option));
    } else {
      // Select the option
      onAnswer([...selectedAnswer, option]);
    }
  };

  // Function to check if the selected answers match the correct answers
  const isCorrect = () => {
    return (
      selectedAnswer.length === question.answer.length &&
      selectedAnswer.every((ans) => question.answer.includes(ans))
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {question.question}
      </Typography>
      <ButtonGroup orientation="vertical">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer.includes(option) ? 'contained' : 'outlined'}
            onClick={() => toggleOption(option)}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Typography variant="body1" color="primary">
        {isCorrect() ? 'Correct!' : selectedAnswer.length > 0 ? 'Incorrect.' : ''}
      </Typography>
    </div>
  );
};

export default MultipleChoiceQuestion;
