import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  nextQuestion: () => void;
  prevQuestion: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  nextQuestion,
  prevQuestion,
}) => {
  return (
    <ButtonGroup>
      <Button
        onClick={prevQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </Button>
      <Button
        onClick={nextQuestion}
        disabled={currentQuestionIndex === totalQuestions - 1}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default QuizNavigation;
