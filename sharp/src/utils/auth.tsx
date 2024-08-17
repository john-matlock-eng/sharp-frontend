import { jwtVerify } from 'jose';
import { fetchAuthSession } from 'aws-amplify/auth';

  export const getUserIdFromToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      const token = session?.tokens?.idToken?.toString();
      if (!token) {
        return null;
      }
      
      // Instead of verifying the token locally, we'll just decode it
      // This is less secure but doesn't require the secret key
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub as string;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };