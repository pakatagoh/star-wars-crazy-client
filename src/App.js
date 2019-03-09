import React, { Component } from 'react';
import Routing from './pages/Routing';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';

class App extends Component {
  render() {
    return (
      <>
        <HeaderView />
        <Routing />
        <FooterView />
      </>
    );
  }
}

export default App;
