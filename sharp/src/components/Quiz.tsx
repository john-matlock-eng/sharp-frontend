import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Question from './Question';
import QuizNavigation from './QuizNavigation';

interface MultipleChoiceQuestion {
  id: number;
  type: 'multiple_choice';
  question: string;
  options: string[];
  answer: string;
}

interface FlashCardQuestion {
  id: number;
  type: 'flashcard';
  question: string;
  answer: string;
}

interface LongFormQuestion {
  id: number;
  type: 'long_form';
  question: string;
  answer: string;
}

interface ItemOrderingQuestion {
  id: number;
  type: 'item_ordering';
  question: string;
  options: string[];
  answer: string[];
}

type QuestionType = MultipleChoiceQuestion | FlashCardQuestion | LongFormQuestion | ItemOrderingQuestion;

const questions: QuestionType[] = [
  {
    id: 1,
    type: 'multiple_choice',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris'
  },
  {
    id: 2,
    type: 'flashcard',
    question: 'Define "Encapsulation" in Object-Oriented Programming.',
    answer: 'Encapsulation is the bundling of data with the methods that operate on that data.'
  },
  {
    id: 3,
    type: 'long_form',
    question: 'Explain the concept of "Polymorphism" in OOP.',
    answer: 'Polymorphism is the ability of different objects to respond to the same function call in different ways.'
  },
  {
    id: 4,
    type: 'item_ordering',
    question: 'Order the steps of the software development lifecycle.',
    options: ['Design', 'Testing', 'Implementation', 'Requirement Analysis'],
    answer: ['Requirement Analysis', 'Design', 'Implementation', 'Testing']
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | string[])[]>([]);

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Quiz
      </Typography>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        answer={answers[currentQuestionIndex]}
      />
      <QuizNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
      />
    </Container>
  );
};

export default Quiz;
