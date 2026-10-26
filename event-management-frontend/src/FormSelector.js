// Import necessary dependencies
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Login from './Login'; // Import Login component
import RegisterForm from './Register';

// Functional component
const FormSelector = () => {
    const [setLoggedIn] = useState(false);

  // Get the current pathname using useLocation hook
  const location = useLocation();
  const { pathname } = location;

  // Conditional rendering based on pathname
  return (
    <div>
      {pathname === '/register' && <RegisterForm />}
      <Login setLoggedIn={setLoggedIn} />
    </div>
  );
};

// Export the component
export default FormSelector;
