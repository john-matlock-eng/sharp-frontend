import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

interface LongFormQuestionEditProps {
  question: {
    id: string;
    question_text: string;
    answer: string;
  };
  index: number;
  onStateChange: (index: number, isComplete: boolean) => void;
}

const LongFormQuestionEdit: React.FC<LongFormQuestionEditProps> = ({ question, index, onStateChange }) => {
  const { control, watch } = useFormContext();

  // Watch for changes in the question text and answer
  const question_text = watch(`questions.${index}.question_text`);
  const answer = watch(`questions.${index}.answer`);

  useEffect(() => {
    // Check if the question is complete
    const isComplete = question_text && answer?.[0];
    onStateChange(index, isComplete);
  }, [question_text, answer, index, onStateChange]);

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
            label="Long Form Question"
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
            multiline
            rows={4}
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
    </Box>
  );
};

export default LongFormQuestionEdit;
