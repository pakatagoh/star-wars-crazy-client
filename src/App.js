import React, { useState, useEffect } from 'react';
import Routing from './pages/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const UserContext = React.createContext({});

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundUser = localStorage.getItem('user');

    if (foundUser) {
      const user = JSON.parse(foundUser);
      setUser(user);
    }
    setIsLoading(false);
  }, []);

  const updateUser = data => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      <Header />
      <Routing />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
