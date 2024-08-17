import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = process.env.REACT_APP_COMMUNITY_API_ENDPOINT;

export interface Community {
  community_name: string;
  description: string;
  owner_ids: string[];
  members: string[];
  keywords: string[];
  community_id: string;
}

export interface CreateCommunityData {
  community_name: string;
  description: string;
  members: string[];
  keywords: string[];
  community_id: string;
}

const getAuthenticatedAxiosInstance = async () => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken?.toString();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const useCommunities = () => {
  return useQuery<Community[], Error>('communities', async () => {
    const axiosInstance = await getAuthenticatedAxiosInstance();
    const { data } = await axiosInstance.get('/communities/');
    return data.communities;
  });
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (communityData: CreateCommunityData) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.post('/communities/', communityData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('communities');
      },
    }
  );
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (communityId: number) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.post(`/communities/${communityId}/members`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('communities');
      },
    }
  );
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (communityId: string) => {
      const axiosInstance = await getAuthenticatedAxiosInstance();
      const { data } = await axiosInstance.delete(`/communities/${communityId}/members`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('communities');
      },
    }
  );
};

export const getCommunityById = async (communityId: string): Promise<Community> => {
  const axiosInstance = await getAuthenticatedAxiosInstance();
  const { data } = await axiosInstance.get(`/communities/${communityId}`);
  return data;
};

