import React from 'react';
import { Typography } from '@mui/material';
import FlashCardQuestion from './FlashCardQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import LongFormQuestion from './LongFormQuestion';
import ItemOrderingQuestion from './ItemOrderingQuestion';

interface QuestionBase {
  id: number;
  question: string;
  answer: any;
}

interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple_choice';
  options: string[];
  answer: string;
}

interface FlashCardQuestion extends QuestionBase {
  type: 'flashcard';
  answer: string;
}

interface LongFormQuestion extends QuestionBase {
  type: 'long_form';
  answer: string;
}

interface ItemOrderingQuestion extends QuestionBase {
  type: 'item_ordering';
  options: string[];
  answer: string[];
}

type QuestionType = MultipleChoiceQuestion | FlashCardQuestion | LongFormQuestion | ItemOrderingQuestion;

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: any) => void;
  answer: any;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, answer }) => {
  switch (question.type) {
    case 'multiple_choice':
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} selectedAnswer={answer} />;
    case 'flashcard':
      return <FlashCardQuestion question={question} onAnswer={onAnswer} />;
    case 'long_form':
      return <LongFormQuestion question={question} onAnswer={onAnswer} />;
    case 'item_ordering':
      return <ItemOrderingQuestion question={question} onAnswer={onAnswer} />;
    default:
      return <Typography variant="body1">Unknown question type</Typography>;
  }
};

export default Question;
