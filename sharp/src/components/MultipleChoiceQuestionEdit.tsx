import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Box, FormControlLabel, Checkbox } from '@mui/material';

interface MultipleChoiceQuestionEditProps {
  question: {
    id: string;
    question_text: string;
    options: { id: string; value: string }[];
    answer: string[];
  };
  index: number;
  onStateChange: (index: number, isComplete: boolean) => void;
}

const MultipleChoiceQuestionEdit: React.FC<MultipleChoiceQuestionEditProps> = ({ question, index, onStateChange }) => {
  const { control, watch } = useFormContext();

  // Watch the fields to detect changes
  const question_text = watch(`questions.${index}.question_text`);
  const options = watch(`questions.${index}.options`);
  const answer = watch(`questions.${index}.answer`);

  // Determine if the form is complete
  const isComplete = question_text && options && options.length > 0 && options.every((opt: { value: string }) => !!opt.value);

  // Report to the parent component when the state changes
  useEffect(() => {
    onStateChange(index, isComplete);
  }, [question_text, options, answer, index, isComplete, onStateChange]);

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
            label="Multiple Choice Question"
            fullWidth
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      {question.options.map((option, optionIndex) => (
        <Controller
          key={option.id}
          name={`questions.${index}.options.${optionIndex}.value`}
          control={control}
          defaultValue={option.value}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox checked={!!field.value} {...field} />}
              label={field.value || `Option ${optionIndex + 1}`}
            />
          )}
        />
      ))}
      <Controller
        name={`questions.${index}.answer`}
        control={control}
        defaultValue={question.answer}
        rules={{ required: 'Correct answer is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Correct Answer"
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

export default MultipleChoiceQuestionEdit;
