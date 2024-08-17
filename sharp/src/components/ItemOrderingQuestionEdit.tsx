import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TextField, Box, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  id: string;
  value: string;
}

interface FormValues {
  questions: {
    options: Option[];
    question_text: string;
  }[];
}

interface ItemOrderingQuestionEditProps {
  question: {
    id: string;
    question_text: string;
    options: Option[];
    answer: string[];
  };
  index: number;
  onStateChange: (index: number, isComplete: boolean) => void;
}

const ItemOrderingQuestionEdit: React.FC<ItemOrderingQuestionEditProps> = ({ question, index, onStateChange }) => {
  const { control, watch } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options` as const,
  });

  // Watch for changes in the question text and options to determine completion
  const question_text = watch(`questions.${index}.question_text`);
  const options = watch(`questions.${index}.options`);

  useEffect(() => {
    // Check if the question is complete
    const isComplete = !!(question_text && options && options.length > 0 && options.every((opt: Option) => !!opt.value));
    onStateChange(index, isComplete);
  }, [question_text, options, index, onStateChange]);

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
            label="Item Ordering Question"
            fullWidth
            error={!!error}
            helperText={error?.message}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      {fields.map((option, optionIndex) => (
        <Box key={option.id} display="flex" alignItems="center" mb={2}>
          <Controller
            name={`questions.${index}.options.${optionIndex}.value`}
            control={control}
            defaultValue={option.value}
            rules={{ required: 'Option is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`Option ${optionIndex + 1}`}
                fullWidth
                error={!!error}
                helperText={error?.message}
                style={{ marginRight: '1rem' }}
              />
            )}
          />
          <IconButton onClick={() => remove(optionIndex)}>
            <RemoveCircleOutlineIcon color="error" />
          </IconButton>
        </Box>
      ))}
      <Button
        type="button"
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => append({ id: uuidv4(), value: '' } as Option)}
      >
        Add Option
      </Button>
    </Box>
  );
};

export default ItemOrderingQuestionEdit;
