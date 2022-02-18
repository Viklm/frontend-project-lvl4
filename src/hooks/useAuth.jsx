import { useContext } from 'react';
import { AuthContext } from '../contexts/authContexts.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
