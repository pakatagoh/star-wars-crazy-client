import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#ffd700',
  secondary: 'rgb(75, 213, 238)',
  secondaryHover: 'rgb(75, 213, 238, 0.7)',
};

const Theme = props => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
