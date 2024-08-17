import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

interface FlashCardQuestionEditProps {
  question: {
    id: string;
    question_text: string;
    answer: string;
  };
  index: number;
  onStateChange: (index: number, isComplete: boolean) => void;
}

const FlashCardQuestionEdit: React.FC<FlashCardQuestionEditProps> = ({ question, index, onStateChange }) => {
  const { control, watch } = useFormContext();

  // Watch the fields to detect changes
  const question_text = watch(`questions.${index}.question_text`);
  const answer = watch(`questions.${index}.answer`);

  // Determine if the form is complete
  const isComplete = question_text && answer?.[0];

  // Report to the parent component when the state changes
  useEffect(() => {
    onStateChange(index, isComplete);
  }, [index, isComplete, onStateChange]);

  return (
    <Box mb={2}>
      <Controller
        name={`questions.${index}.question_text`}
        control={control}
        defaultValue={question.question_text}
        rules={{ required: 'Question text is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Flashcard Question"
            fullWidth
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      <Controller
        name={`questions.${index}.answer[0]`}
        control={control}
        defaultValue={question.answer}
        rules={{ required: 'Answer is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Answer"
            fullWidth
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
    </Box>
  );
};

export default FlashCardQuestionEdit;
