import React from 'react';
import { Router } from 'react-router-dom';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Routing from './Routing';

describe('Routing Component', () => {
  test('should route to HomePage Component', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getByTestId } = render(
      <Router history={history}>
        <Routing />
      </Router>
    );

    await wait(() => {
      expect(getByTestId('home-page')).toBeInTheDocument();
    });
  });
});
