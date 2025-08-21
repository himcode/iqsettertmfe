import { useSelector } from 'react-redux';

// Usage: const { user, accessToken } = useAuth();
const useAuth = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  return { user, accessToken };
};

export default useAuth;
