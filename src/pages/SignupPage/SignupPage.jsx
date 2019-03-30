import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from './../../services/auth/authService';
import { UserContext } from './../../App';
import Block from '../../components/Block/Block';
import Title from '../../components/Typography/Title';
import ButtonCrawl from '../../components/Buttons/ButtonCrawl';
import { Link } from 'react-router-dom';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  password: Yup.string().required('Password is required'),
});

const SignupPage = props => {
  const { history } = props;
  const { user, setUser } = useContext(UserContext);
  const initialFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    imageUrl: '',
  };

  return (
    <main>
      <Block container spacer={2}>
        {!user ? <Title>Sign up for some Star Wars fun</Title> : <Title>You are already logged in</Title>}
      </Block>
      <Block container spacer={2}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={signupSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await signup(values);
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
              actions.setStatus('success');
              setUser(response.data);
              localStorage.setItem('user', JSON.stringify(response.data));
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
                    <Form>
                      <Field type="text" name="firstName" placeholder="First name" />
                      <ErrorMessage name="firstName" />
                      <Field type="text" name="lastName" placeholder="Last name" />
                      <ErrorMessage name="lastName" />
                      <Field type="text" name="imageUrl" placeholder="Image Url" />
                      <ErrorMessage name="imageUrl" />
                      <Field type="email" name="email" placeholder="Email" />
                      <ErrorMessage name="email" />
                      <Field type="password" name="password" placeholder="password" />
                      <ErrorMessage name="password" />
                      <button type="submit" disabled={!isValid || isSubmitting}>
                        Register
                      </button>
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
          <Title as="h4">Already have an account?</Title>
          <Link to="/login">
            <ButtonCrawl>Login</ButtonCrawl>
          </Link>
        </Block>
      )}
    </main>
  );
};

export default SignupPage;
