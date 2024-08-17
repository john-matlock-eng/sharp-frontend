import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = process.env.REACT_APP_QUIZ_API_ENDPOINT;

export interface Question {
  question_text: string;
  options: string[];
  answer: string[];
  question_id: string;
  question_type: string;
}

export interface CreateQuestionData {
  community_id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  answer: string[];
  question_type: string;
  question_id: string;
}

export const getAuthenticatedAxiosInstance = async () => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken?.toString();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetch all questions for a specific quiz
export const useQuestions = (communityId: string, quizId: string) => {
  return useQuery<Question[], Error>(['questions', communityId, quizId], async () => {
    const axiosInstance = await getAuthenticatedAxiosInstance();
    const { data } = await axiosInstance.get(`/community/${communityId}/quizzes/${quizId}/questions`);
    return data.questions;
  });
};

// Fetch a specific question
export const useQuestion = (communityId: string, quizId: string, questionId: string) => {
  return useQuery<Question, Error>(['question', communityId, quizId, questionId], async () => {
    const axiosInstance = await getAuthenticatedAxiosInstance();
    const { data } = await axiosInstance.get(`/community/${communityId}/quizzes/${quizId}/questions/${questionId}`);
    return data;
  });
};

// Create a new question
export const useCreateQuestion = (communityId: string, quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questionData: CreateQuestionData) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.post(`/community/${communityId}/quizzes/${quizId}/questions`, questionData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['questions', communityId, quizId]);
      },
    }
  );
};

// Update an existing question
export const useUpdateQuestion = (communityId: string, quizId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async ({ questionId, ...questionData }: Partial<CreateQuestionData> & { questionId: string }) => {
        questionData.quiz_id = quizId;
        questionData.community_id = communityId;
        const axiosInstance = await getAuthenticatedAxiosInstance();
        const { data } = await axiosInstance.put(`/community/${communityId}/quizzes/${quizId}/questions/${questionId}`, questionData);
        return data;
      },
      {
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries(['question', communityId, quizId, variables.questionId]);
          queryClient.invalidateQueries(['questions', communityId, quizId]);
        },
      }
    );
  };

// Delete a question
export const useDeleteQuestion = (communityId: string, quizId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (questionId: string) => {
        const axiosInstance = await getAuthenticatedAxiosInstance();
        const { data } = await axiosInstance.delete(`/community/${communityId}/quizzes/${quizId}/questions/${questionId}`);
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['questions', communityId, quizId]);
        },
      }
    );
  };
  