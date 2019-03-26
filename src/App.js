import React, { useState, useEffect } from 'react';
import Routing from './pages/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const UserContext = React.createContext({});

const App = () => {
  const [user, setUser] = useState({});

  // useEffect(() => {}, []);
  // TODO: UseEffect to get user from DB if there is a cookie on each render
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Routing />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
