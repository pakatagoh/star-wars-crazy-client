import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Routing from './Routing';

/**
 *
 * @description see Header.test.js for description
 * @returns
 */
function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Routing Component', () => {
  test('should route to HomePage Component', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getByTestId } = render(
      <Router history={history}>
        <Routing />
      </Router>
    );

    expect(getByTestId('home-page')).toBeInTheDocument();
  });
});
