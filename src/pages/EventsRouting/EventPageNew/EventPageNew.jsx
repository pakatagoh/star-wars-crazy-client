import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Block from './../../../components/Block/Block';
import Title from './../../../components/Typography/Title';
import Spinner from './../../../components/Spinner/Spinner';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';
import { createEvent } from './../../../services/event/eventService';
import { UserContext } from './../../../App';

const StyledFormikField = styled(Field)`
  & {
    width: 100%;
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

const StyledFormikTextArea = styled(Field)`
  & {
    width: 100%;
    height: 150px;
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

const eventSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required'),
  description: Yup.string().required('Event description is required'),
  eventStart: Yup.date().required('Event start date and time is required'),
  eventEnd: Yup.date().required('Event end date and time is required'),
  imageUrl: Yup.string().url(),
});

const EventPageNew = props => {
  const { history } = props;
  const { user, isLoading: isUserLoading } = useContext(UserContext);

  const initialFormValues = {
    name: '',
    description: '',
    eventStart: '',
    eventEnd: '',
    imageUrl: '',
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      history.push('/login');
    }
  }, [isUserLoading]);

  return (
    <main>
      {isUserLoading ? (
        <Block container spacer={2}>
          <Spinner />
        </Block>
      ) : (
        <>
          <Block container spacer={2}>
            <Title>New Event</Title>
          </Block>
          <Block container spacer={2}>
            <Formik
              initialValues={initialFormValues}
              validationSchema={eventSchema}
              onSubmit={async (values, actions) => {
                try {
                  const response = await createEvent(values);
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
                  history.push('/events');
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
                    <Form>
                      <div className="mb-4">
                        <StyledFormikField type="text" name="name" placeholder="Event name" />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="name" />
                      </div>
                      <div className="mb-4">
                        <StyledFormikTextArea
                          component="textarea"
                          name="description"
                          placeholder="Describe your event"
                        />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="description" />
                      </div>
                      <div className="mb-4">
                        <StyledFormikField type="text" name="eventStart" placeholder="Start date and time" />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="eventStart" />
                      </div>
                      <div className="mb-4">
                        <StyledFormikField type="text" name="eventEnd" placeholder="End date and time" />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="eventEnd" />
                      </div>
                      <div className="mb-4">
                        <StyledFormikField type="text" name="imageUrl" placeholder="Event image url" />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="imageUrl" />
                      </div>
                      <ButtonYellow type="submit" disabled={!isValid || isSubmitting}>
                        Create
                      </ButtonYellow>
                    </Form>
                    {status && status.error && renderError(status)}
                  </>
                );
              }}
            />
          </Block>
        </>
      )}
    </main>
  );
};

export default EventPageNew;
