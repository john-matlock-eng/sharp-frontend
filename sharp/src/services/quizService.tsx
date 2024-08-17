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

export interface Quiz {
  quiz_id: string;
  community_id: string;
  title: string;
  description: string;
  questions: Question[];
  created_at: number;
  owner_ids: string[];
}

export interface CreateQuizData {
  community_id: string;
  title: string;
  description: string;
  questions: Question[];
  quiz_id: string;
}

export const getAuthenticatedAxiosInstance = async () => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken?.toString();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetch all quizzes for a specific community
export const useQuizzes = (communityId: string) => {
  return useQuery<Quiz[], Error>(['quizzes', communityId], async () => {
    const axiosInstance = await getAuthenticatedAxiosInstance();
    const { data } = await axiosInstance.get(`/community/${communityId}/quizzes/`);
    return data.quizzes;
  });
};

// Fetch a specific quiz
export const useQuiz = (communityId: string, quizId: string) => {
  return useQuery<Quiz, Error>(['quiz', communityId, quizId], async () => {
    const axiosInstance = await getAuthenticatedAxiosInstance();
    const { data } = await axiosInstance.get(`/community/${communityId}/quizzes/${quizId}`);

    return {
      quiz_id: data.metadata.quiz_id,
      community_id: data.metadata.community_id,
      title: data.metadata.title,
      description: data.metadata.description,
      created_at: data.metadata.created_at,
      questions: data.questions,
      owner_ids: data.metadata.owner_ids,
    };
  });
};

// Create a new quiz
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (quizData: CreateQuizData) => {
      const communityId = quizData.community_id;
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.post(`/community/${communityId}/quizzes/`, quizData);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['quizzes', variables.community_id]);
      },
    }
  );
};

// Update an existing quiz
export const useUpdateQuiz = (communityId: string, quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (quizData: Partial<CreateQuizData>) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.put(`/quizzes/${communityId}/${quizId}`, quizData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['quiz', communityId, quizId]);
        queryClient.invalidateQueries(['quizzes', communityId]);
      },
    }
  );
};

// Delete a quiz
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ communityId, quizId }: { communityId: string; quizId: string }) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.delete(`/community/${communityId}/quizzes/${quizId}`);
      return data;
    },
    {
      onSuccess: (_, { communityId }) => {
        queryClient.invalidateQueries(['quizzes', communityId]);
      },
    }
  );
};
