import React, { useContext } from 'react';
import { Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Title from '../../components/Typography/Title';
import ButtonCrawl from '../../components/Buttons/ButtonCrawl';
import Block from '../../components/Block/Block';
import ButtonYellow from './../../components/Buttons/ButtonYellow';
import { login } from './../../services/auth/authService';
import { UserContext } from './../../App';
import FormikSkeleton from './../../components/Form/FormikSkeleton';
import InputField from './../../components/Field/InputField';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const FIELDS = [
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

const LoginPage = props => {
  const { history } = props;
  const { user, updateUser } = useContext(UserContext);
  const initialFormValues = FIELDS.reduce((accum, currentVal) => {
    const key = currentVal.name;
    accum[key] = '';
    return accum;
  }, {});

  return (
    <main>
      {user ? (
        <Block container spacer={2}>
          <Title>You are already logged in</Title>
        </Block>
      ) : (
        <>
          <Block container spacer={1}>
            <Title>Login</Title>
          </Block>
          <Block container spacer={2}>
            <FormikSkeleton
              initialValues={initialFormValues}
              schema={loginSchema}
              apiCall={login}
              redirectPath="/"
              successAction={updateUser}
              history={history}
            >
              {(isSubmitting, isValid) => {
                return (
                  <Form>
                    {FIELDS.map(field => (
                      <InputField
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        margin={2}
                        maxWidth={300}
                      />
                    ))}
                    <ButtonYellow type="submit" disabled={!isValid || isSubmitting}>
                      Login
                    </ButtonYellow>
                  </Form>
                );
              }}
            </FormikSkeleton>
          </Block>
          <Block container spacer={2}>
            <Title as="h5">Don't have an account?</Title>
            <Link to="/signup">
              <ButtonCrawl>Signup</ButtonCrawl>
            </Link>
          </Block>
        </>
      )}
    </main>
  );
};

export default LoginPage;
