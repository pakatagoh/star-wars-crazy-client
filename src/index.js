import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';

const theme = {
  primary: '#ffd700',
  secondary: 'rgb(75, 213, 238)',
};

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    background-color: black;
    color: white;
  }
  
  h1, h2, h3 {
    color: ${({ theme }) => (theme.primary ? theme.primary : 'white')};
  }
  h4, h5 {
    color: ${({ theme }) => (theme.secondary ? theme.secondary : 'white')};
  }`;

ReactDOM.render(
  <BrowserRouter>
    <>
      <GlobalStyles theme={theme} />
      <App />
    </>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
