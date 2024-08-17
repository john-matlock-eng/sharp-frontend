import React from 'react';
import { Typography } from '@mui/material';
import FlashCardQuestion from './FlashCardQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import LongFormQuestion from './LongFormQuestion';
import ItemOrderingQuestion from './ItemOrderingQuestion';

interface QuestionBase {
  id: string;
  question: string;
  answer: string[]; // Always an array of strings
}

interface MultipleChoiceQuestionType extends QuestionBase {
  type: 'multiple_choice';
  options: string[];
}

interface FlashCardQuestionType extends QuestionBase {
  type: 'flashcard';
}

interface LongFormQuestionType extends QuestionBase {
  type: 'long_form';
}

interface ItemOrderingQuestionType extends QuestionBase {
  type: 'item_ordering';
  options: string[];
}

export type QuestionType =
  | MultipleChoiceQuestionType
  | FlashCardQuestionType
  | LongFormQuestionType
  | ItemOrderingQuestionType;

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string[]) => void;
  answer: string[];
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, answer }) => {
  console.log('Rendering Question Component', question);

  switch (question.type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          selectedAnswer={answer}
        />
      );
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
