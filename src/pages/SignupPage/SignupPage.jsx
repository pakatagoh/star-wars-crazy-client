import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signup } from './../../services/auth/authService';
import { UserContext } from './../../App';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  password: Yup.string().required('Password is required'),
});

const SignupPage = props => {
  const { user, setUser } = useContext(UserContext);
  const initialFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  return (
    <main>
      <Formik
        initialValues={initialFormValues}
        validationSchema={signupSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await signup(values);
            if (response.error) {
              actions.setSubmitting(false);
              actions.setStatus({ error: { message: response.error.message } });
              return;
            }

            actions.resetForm();
            actions.setSubmitting(false);
            actions.setStatus('success');
            setUser(response.user);
            return;
          } catch (error) {
            console.error(error);
            actions.setSubmitting(false);
            actions.setStatus({ error: { message: 'Something went wrong, please try again' } });
          }
        }}
        render={props => {
          const { status, isSubmitting, isValid } = props;

          const renderSuccess = () => {
            return <div>Success</div>;
          };

          const renderError = status => {
            return <div>{status.error.message}</div>;
          };
          return (
            <>
              {user.firstName && (
                <div>
                  <h2>Success!</h2>
                  <p>{user.firstName} your account has been created!</p>
                </div>
              )}
              {status && !status.error ? (
                renderSuccess()
              ) : (
                <>
                  <Form>
                    <Field type="email" name="email" placeholder="Email" />

                    <Field type="text" name="firstName" placeholder="First name" />
                    <Field type="text" name="lastName" placeholder="Last name" />
                    <Field type="password" name="password" placeholder="password" />
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
    </main>
  );
};

export default SignupPage;
