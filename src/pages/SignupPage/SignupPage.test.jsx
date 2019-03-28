import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import App from '../../App';
import * as authServices from './../../services/auth/authService';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Signup Page before submission', () => {
  const renderWithFields = () => {
    const renderedAppPage = renderWithRouter(<App />);

    const signupNav = renderedAppPage.getByText(/sign up/i);

    fireEvent.click(signupNav);

    return {
      ...renderedAppPage,
    };
  };
  test('should display signup form', () => {
    const { getByText, getByPlaceholderText } = renderWithFields();

    const submitButton = getByText(/register/i);
    const emailInput = getByPlaceholderText(/email/i);
    const firstNameInput = getByPlaceholderText(/first name/i);
    const passwordInput = getByPlaceholderText(/password/i);

    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('should display disabled submit button on initial render', () => {
    const { getByText } = renderWithFields();

    const submitButton = getByText(/register/i);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('disabled');
  });

  test('should enable button when all fields are valid', () => {
    const { getByText, getByPlaceholderText } = renderWithFields();

    const submitButton = getByText(/register/i);
    const emailInput = getByPlaceholderText(/email/i);
    const firstNameInput = getByPlaceholderText(/first name/i);
    const passwordInput = getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'pakatagohlh@gmail.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'pakata' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});

describe('Signup form after filling up required fields', () => {
  const renderWithFields = () => {
    const renderedAppPage = renderWithRouter(<App />);

    const signupNav = renderedAppPage.getByText(/sign up/i);

    fireEvent.click(signupNav);

    const emailInput = renderedAppPage.getByPlaceholderText(/email/i);
    const firstNameInput = renderedAppPage.getByPlaceholderText(/first name/i);
    const passwordInput = renderedAppPage.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'pakatagohlh@gmail.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'pakata' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    return {
      ...renderedAppPage,
    };
  };

  beforeEach(() => {
    jest.spyOn(authServices, 'signup');
  });

  afterEach(() => {
    authServices.signup.mockRestore();
  });

  test('should show home page if submission was successful', async () => {
    authServices.signup.mockResolvedValueOnce({
      user: {
        firstName: 'pakata',
        lastName: 'goh',
        email: 'pakatagoh@gmail.com',
      },
    });
    const { getByText } = renderWithFields();

    const submitButton = getByText(/register/i);

    fireEvent.click(submitButton);
    const quizHeader = await waitForElement(() => getByText(/quiz/i));

    expect(quizHeader).toBeInTheDocument();
  });

  test('should show Error when submission failed', async () => {
    authServices.signup.mockRejectedValueOnce(new Error('Something went wrong'));

    const { getByText } = renderWithFields();

    const submitButton = getByText(/register/i);

    fireEvent.click(submitButton);

    const errorText = await waitForElement(() => getByText(/something/i));
    expect(errorText).toBeInTheDocument();
  });
});
