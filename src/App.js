import React, { Component } from 'react';
import Routing from './pages/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routing />
        <Footer />
      </>
    );
  }
}

export default App;
