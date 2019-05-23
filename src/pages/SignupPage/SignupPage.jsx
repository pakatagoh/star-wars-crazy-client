import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { signup } from './../../services/auth/authService';
import Block from '../../components/Block/Block';
import Title from '../../components/Typography/Title';
import ButtonCrawl from '../../components/Buttons/ButtonCrawl';
import ButtonYellow from './../../components/Buttons/ButtonYellow';
import { UserContext } from './../../App';
import FormikSkeleton from '../../components/Form/FormikSkeleton';

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

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  password: Yup.string().required('Password is required'),
});

const SignupPage = props => {
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
      <Block container spacer={2}>
        {!user ? <Title>Sign up for some Star Wars fun</Title> : <Title>You are already logged in</Title>}
      </Block>
      <Block container spacer={2}>
        <FormikSkeleton
          initialValues={initialFormValues}
          schema={signupSchema}
          apiCall={signup}
          redirectPath="/"
          successAction={updateUser}
          history={history}
        >
          {(isSubmitting, isValid) => {
            return (
              <>
                {!user && (
                  <Form>
                    <div className="mb-2">
                      <StyledFormikField type="text" name="firstName" placeholder="First name" />
                    </div>
                    <div className="mb-2">
                      <ErrorMessage name="firstName" />
                    </div>
                    <div className="mb-2">
                      <StyledFormikField type="text" name="lastName" placeholder="Last name" />
                    </div>
                    <div className="mb-2">
                      <ErrorMessage name="lastName" />
                    </div>
                    <div className="mb-2">
                      <StyledFormikField type="text" name="imageUrl" placeholder="Image Url" />
                    </div>
                    <div className="mb-2">
                      <ErrorMessage name="imageUrl" />
                    </div>
                    <div className="mb-2">
                      <StyledFormikField type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="mb-2">
                      <ErrorMessage name="email" />
                    </div>
                    <div className="mb-2">
                      <StyledFormikField type="password" name="password" placeholder="password" />
                    </div>
                    <div className="mb-4">
                      <ErrorMessage name="password" />
                    </div>
                    <ButtonYellow type="submit" disabled={!isValid || isSubmitting}>
                      Register
                    </ButtonYellow>
                  </Form>
                )}
              </>
            );
          }}
        </FormikSkeleton>
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
