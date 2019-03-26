import React, { useState } from 'react';
import Routing from './pages/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const UserContext = React.createContext({});

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Routing />
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
