import React, { useState, useEffect } from 'react';
import Theme from './theme/Theme';
import Routing from './pages/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const UserContext = React.createContext({});

const App = () => {
  const [user, setUser] = useState<null | {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    score: number | null;
    events: { [key: string]: number }[];
  }>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundUser = localStorage.getItem('user');

    if (foundUser) {
      const user = JSON.parse(foundUser);
      setUser(user);
    }
    setIsLoading(false);
  }, []);

  const updateUser = (data: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    score: number | null;
    events: { [key: string]: number }[];
  }) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  return (
    <Theme>
      <UserContext.Provider value={{ user, updateUser, isLoading }}>
        <Header />
        <Routing />
        <Footer />
      </UserContext.Provider>
    </Theme>
  );
};

export default App;
