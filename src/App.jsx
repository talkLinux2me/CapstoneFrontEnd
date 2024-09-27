import React, { useState } from 'react';
import AppRoutes from './components/Routes';


const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegister = (userData) => {
    setRegisteredUsers(prevUsers => [...prevUsers, userData]);
  };

  return (
  
      <AppRoutes 
        registeredUsers={registeredUsers} 
        onRegister={handleRegister} 
      />
  
  );
};

export default App;
