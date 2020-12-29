import { useEffect } from 'react';
import { useAuth } from '../../lib/useAuth';

export const SignOut = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut!();
  }, []);
  return <div>Signing Out...</div>;
};
export default SignOut;
