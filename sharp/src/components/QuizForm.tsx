import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray, FormProvider } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient } from 'react-query';
import { useCreateQuiz, useUpdateQuiz, useQuiz, useDeleteQuiz } from '../services/quizService';
import FlashCardQuestionEdit from './FlashCardQuestionEdit';
import ItemOrderingQuestionEdit from './ItemOrderingQuestionEdit';
import LongFormQuestionEdit from './LongFormQuestionEdit';
import MultipleChoiceQuestionEdit from './MultipleChoiceQuestionEdit';

interface Question {
  question_text: string;
  options?: { id: string; value: string }[];
  answer: string[];
  question_type: string;
  question_id: string;
}

interface FormValues {
  title: string;
  description: string;
  questions: Question[];
}

const QuizForm: React.FC<{ communityId: string; quizId?: string; onSubmitSuccess: () => void }> = ({ communityId, quizId, onSubmitSuccess }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      questions: [],
    },
  });

  const { handleSubmit, control, reset, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const queryClient = useQueryClient();
  const createQuiz = useCreateQuiz();
  const updateQuiz = useUpdateQuiz(communityId, quizId || '');
  const { data: quizData, isLoading } = useQuiz(communityId, quizId || '');
  const [completionStatus, setCompletionStatus] = useState<boolean[]>([]);

  useEffect(() => {
    if (quizId && quizData) {
      reset({
        title: quizData.title,
        description: quizData.description,
        questions: quizData.questions.map((question) => ({
          question_text: question.question_text,
          options: question.options?.map((opt) => ({ id: uuidv4(), value: opt })) || [],
          answer: question.answer,
          question_type: question.question_type,
          question_id: question.question_id,
        })),
      });
    }
  }, [quizId, quizData, reset]);

  const handleFormSubmit = async (data: FormValues) => {
    const quizMetadata = {
      community_id: communityId,
      title: data.title,
      description: data.description,
      quiz_id: quizId || uuidv4(),
    };

    try {
      if (quizId) {
        await updateQuiz.mutateAsync({
          ...quizMetadata,
          questions: data.questions.map((q) => ({
            question_text: q.question_text,
            answer: q.answer,
            options: q.options?.map(opt => opt.value) || [],
            question_id: q.question_id,
            question_type: q.question_type,
          })),
        });
      } else {
        await createQuiz.mutateAsync({
          ...quizMetadata,
          questions: data.questions.map((q) => ({
            question_text: q.question_text,
            answer: q.answer,
            options: q.options?.map(opt => opt.value) || [],
            question_id: q.question_id,
            question_type: q.question_type,
          })),
        });
      }
      queryClient.invalidateQueries(['quizzes', communityId]);
      onSubmitSuccess();
      reset();
    } catch (error) {
      console.error('Error creating or updating quiz', error);
      // Handle error (e.g., show notification to the user)
    }
  };

  const handleAddQuestion = () => {
    append({
      question_type: '',
      question_text: '',
      answer: [],
      options: [],
      question_id: uuidv4(),
    });
    setCompletionStatus([...completionStatus, false]);
  };

  const handleDeleteQuestion = async (index: number, questionId: string) => {
    remove(index);
  };

  const handleStateChange = (index: number, isComplete: boolean) => {
    const updatedStatus = [...completionStatus];
    updatedStatus[index] = isComplete;
    setCompletionStatus(updatedStatus);
  };

  const isAllQuestionsComplete = completionStatus.every(status => status);

  const handleChangeType = (index: number, question_type: string) => {
    const updatedQuestions = [...watch('questions')];
    updatedQuestions[index] = { ...updatedQuestions[index], question_type };
    methods.setValue('questions', updatedQuestions);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h5" style={{ marginBottom: '1rem' }}>
          {quizId ? 'Edit Quiz' : 'Create New Quiz'}
        </Typography>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              error={!!error}
              helperText={error?.message}
              style={{ marginBottom: '1rem' }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              error={!!error}
              helperText={error?.message}
              style={{ marginBottom: '1rem' }}
            />
          )}
        />

        <div style={{ marginBottom: '1rem' }}>
          <Typography variant="h6">Questions</Typography>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              mb={2}
              border={1}
              borderColor="grey.300"
              borderRadius={1}
              p={2}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6">Question {index + 1}</Typography>
              </Box>
              <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
                <Controller
                  name={`questions.${index}.question_type`}
                  control={control}
                  rules={{ required: 'Question type is required' }}
                  render={({ field: typeField }) => (
                    <Select
                      {...typeField}
                      value={typeField.value || ''}
                      onChange={(e) => handleChangeType(index, e.target.value)}
                      label="Question Type"
                    >
                      <MenuItem value=""><em>Select Question Type</em></MenuItem>
                      <MenuItem value="flashcard">Flashcard </MenuItem>
                      <MenuItem value="item_ordering">Item Ordering</MenuItem>
                      <MenuItem value="long_form">Long Form</MenuItem>
                      <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {field.question_type === 'flashcard' && (
                <FlashCardQuestionEdit
                  question={{
                    id: field.id,
                    question_text: field.question_text,
                    answer: (field.answer as string[])[0] || '', // Single answer
                  }}
                  index={index}
                  onStateChange={handleStateChange}
                />
              )}
              {field.question_type === 'item_ordering' && (
                <ItemOrderingQuestionEdit
                  question={{
                    id: field.id,
                    question_text: field.question_text,
                    options: field.options || [],
                    answer: field.answer,
                  }}
                  index={index}
                  onStateChange={handleStateChange}
                />
              )}
              {field.question_type === 'long_form' && (
                <LongFormQuestionEdit
                  question={{
                    id: field.id,
                    question_text: field.question_text,
                    answer: (field.answer as string[])[0] || '', // Single answer
                  }}
                  index={index}
                  onStateChange={handleStateChange}
                />
              )}
              {field.question_type === 'multiple_choice' && (
                <MultipleChoiceQuestionEdit
                  question={{
                    id: field.id,
                    question_text: field.question_text,
                    options: field.options || [],
                    answer: field.answer,
                  }}
                  index={index}
                  onStateChange={handleStateChange}
                />
              )}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <IconButton aria-label="delete" onClick={() => handleDeleteQuestion(index, field.question_id)}>
                  <RemoveCircleOutlineOutlined color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button
            type="button"
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddQuestion}
            disabled={!isAllQuestionsComplete}
          >
            Add Question
          </Button>
        </div>
        <Button type="submit" variant="contained" color="primary">
          {quizId ? 'Save Changes' : 'Create Quiz'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default QuizForm;
