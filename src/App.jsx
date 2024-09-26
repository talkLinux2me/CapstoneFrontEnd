import React, { useState } from 'react';
import AppRoutes from './components/Routes';

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegister = (userData) => {
    setRegisteredUsers(prevUsers => [...prevUsers, userData]);
  };

  return (
    <div>
      <AppRoutes 
        registeredUsers={registeredUsers} 
        onRegister={handleRegister} 
      />

    </div>
  );
};

export default App;
