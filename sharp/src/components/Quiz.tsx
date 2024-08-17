import React, { useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Question from './Question';
import QuizNavigation from './QuizNavigation';
import { useQuiz } from '../services/quizService';
import { QuestionType } from './Question';

const Quiz: React.FC = () => {
  const { communityId, quizId } = useParams<{ communityId: string; quizId: string }>();
  const { data: quizData, isLoading, error } = useQuiz(communityId!, quizId!);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | string[])[]>([]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading quiz</Typography>;

  if (!quizData || !quizData.questions) {
    return <Typography>No questions available for this quiz.</Typography>;
  }

  const questions: QuestionType[] = quizData.questions.map((q) => {
    const commonFields = {
      id: q.question_id,
      question: q.question_text,
      answer: Array.isArray(q.answer) ? q.answer : [q.answer],
    };

    switch (q.question_type) {
      case 'multiple_choice':
        return {
          ...commonFields,
          type: 'multiple_choice',
          options: q.options || [],
        } as QuestionType;
      case 'flashcard':
        return {
          ...commonFields,
          type: 'flashcard',
        } as QuestionType;
      case 'long_form':
        return {
          ...commonFields,
          type: 'long_form',
        } as QuestionType;
      case 'item_ordering':
        return {
          ...commonFields,
          type: 'item_ordering',
          options: q.options || [],
        } as QuestionType;
      default:
        throw new Error(`Unsupported question type: ${q.question_type}`);
    }
  });

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = Array.isArray(answer) ? answer : [answer];
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

  const currentAnswer = answers[currentQuestionIndex];
  const formattedAnswer = Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {quizData.title || 'Quiz'}
      </Typography>
      {questions.length > 0 ? (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            answer={formattedAnswer}
          />
          <QuizNavigation
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
          />
        </>
      ) : (
        <Typography>No questions available for this quiz.</Typography>
      )}
    </Container>
  );
};

export default Quiz;
