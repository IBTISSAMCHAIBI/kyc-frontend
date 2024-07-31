import { useContext } from 'react';
import AuthContext from './AuthContext'; // Adjust import according to file structure

const useAuth = () => useContext(AuthContext);

export default useAuth;
