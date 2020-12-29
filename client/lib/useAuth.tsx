import React, { useContext, createContext, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSignInMutation, useSignUpMutation, useCurrentUserQuery } from '../generated/graphql';

type AuthProps = {
  user: any;
  error: string;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (email: any, password: any) => Promise<void>;
  signOut: () => void;
};
const AuthContext = createContext<Partial<AuthProps>>({});
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  return useContext(AuthContext);
};
function useProvideAuth() {
  const client = useApolloClient();
  const router = useRouter();
  const [error, setError] = useState('');
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  });
  const user = data && data.currentUser;
  const [singInMutation] = useSignInMutation();
  const [singUpMutation] = useSignUpMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await singInMutation({ variables: { email, password } });
      if (data && data.login.token && data?.login.user) {
        sessionStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const signUp = async (email, password) => {
    try {
      const { data } = await singUpMutation({ variables: { email, password } });
      if (data && data.register.token && data?.register.user) {
        sessionStorage.setItem('token', data.register.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const signOut = () => {
    sessionStorage.removeItem('token');
    client.resetStore().then(() => {
      router.push('/');
    });
  };
  return {
    user,
    error,
    signIn,
    signUp,
    signOut,
  };
}
