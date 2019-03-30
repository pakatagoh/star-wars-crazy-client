import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Title from '../../components/Typography/Title';
import ButtonCrawl from '../../components/Buttons/ButtonCrawl';
import Block from '../../components/Block/Block';
import ButtonYellow from './../../components/Buttons/ButtonYellow';
import { login } from './../../services/auth/authService';
import { UserContext } from './../../App';

const StyledFormikField = styled(Field)`
  & {
    width: 100%;
    max-width: 300px;
    padding: 10px 5px;
    border: none;
    border-bottom: 1px solid white;
    background: none;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = props => {
  const { history } = props;
  const { user, updateUser } = useContext(UserContext);
  const initialFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    imageUrl: '',
  };

  return (
    <main>
      {user && (
        <Block container spacer={2}>
          <Title>You are already logged in</Title>
        </Block>
      )}
      <Block container spacer={2}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await login(values);
              if (response.error && response.error.name === 'SequelizeValidationError') {
                const { errors } = response.error;
                actions.setSubmitting(false);
                errors.forEach(error => {
                  actions.setSubmitting(false);
                  actions.setFieldError(error.path, error.message);
                });
                return;
              }
              if (response.error) {
                console.error(response.error);
                actions.setSubmitting(false);
                actions.setStatus({
                  error: { message: response.error.message || 'Something went wrong, please try again' },
                });
                return;
              }

              actions.resetForm();
              actions.setSubmitting(false);
              updateUser(response.data);
              history.push('/');
              return;
            } catch (error) {
              console.error(error);
              actions.setSubmitting(false);
              actions.setStatus({ error: { message: 'Something went wrong, please try again' } });
            }
          }}
          render={props => {
            const { status, isSubmitting, isValid } = props;

            const renderError = status => {
              return <div>{status.error.message}</div>;
            };
            return (
              <>
                {!user && (
                  <>
                    <Title>Login</Title>
                    <Form>
                      <div className="mb-2">
                        <StyledFormikField type="email" name="email" placeholder="Email" />
                      </div>
                      <div className="mb-2">
                        <ErrorMessage name="email" />
                      </div>
                      <div className="mb-2">
                        <StyledFormikField type="password" name="password" placeholder="Password" />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="password" />
                      </div>
                      <ButtonYellow type="submit" disabled={!isValid || isSubmitting}>
                        Login
                      </ButtonYellow>
                    </Form>
                  </>
                )}
                {status && status.error && renderError(status)}
              </>
            );
          }}
        />
      </Block>
      {!user && (
        <Block container spacer={2}>
          <Title as="h5">Don't have an account?</Title>
          <Link to="/signup">
            <ButtonCrawl>Signup</ButtonCrawl>
          </Link>
        </Block>
      )}
    </main>
  );
};

export default LoginPage;
