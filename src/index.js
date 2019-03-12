import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#ffd700',
  secondary: 'rgb(75, 213, 238)',
  secondaryHover: 'rgb(75, 213, 238, 0.7)',
};

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
