import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'formik';
import * as Yup from 'yup';
import { signup } from './../../services/auth/authService';
import Block from '../../components/Block/Block';
import Title from '../../components/Typography/Title';
import ButtonCrawl from '../../components/Buttons/ButtonCrawl';
import ButtonYellow from './../../components/Buttons/ButtonYellow';
import { UserContext } from './../../App';
import FormikSkeleton from '../../components/Form/FormikSkeleton';
import InputField from './../../components/Field/InputField';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  password: Yup.string().required('Password is required'),
});

const FIELDS = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: 'imageUrl',
    placeholder: 'Image Url',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

const SignupPage = props => {
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
            <Title>Sign up for some Star Wars fun</Title>
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
                      Register
                    </ButtonYellow>
                  </Form>
                );
              }}
            </FormikSkeleton>
          </Block>
          <Block container spacer={2}>
            <Title as="h4">Already have an account?</Title>
            <Link to="/login">
              <ButtonCrawl>Login</ButtonCrawl>
            </Link>
          </Block>
        </>
      )}
    </main>
  );
};

export default SignupPage;
