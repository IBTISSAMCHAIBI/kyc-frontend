
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Define children prop type
};

export default ProtectedRoute;
