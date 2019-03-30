import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Block from '../../../components/Block/Block';
import Title from '../../../components/Typography/Title';
import Spinner from '../../../components/Spinner/Spinner';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';
import { UserContext } from '../../../App';
import { getEvent, updateEvent } from './../../../services/event/eventService';

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

const EventPageEdit = props => {
  const { history } = props;
  const { id } = props.match.params;
  const [initialFormValues, setInitialFormValues] = useState('');
  const [error, setError] = useState('');
  const { user, isLoading: isUserLoading } = useContext(UserContext);

  const fetchEvent = async () => {
    const response = await getEvent(id);
    if (response.error) {
      console.error(response.error);
      setError(response.error.message);
      return;
    }
    setInitialFormValues({
      name: response.name,
      description: response.description,
      eventStart: response.eventStart,
      eventEnd: response.eventEnd,
      imageUrl: response.imageUrl,
    });
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      history.push('/login');
    }
    if (!isUserLoading && user) {
      fetchEvent();
    }
  }, [isUserLoading]);

  return (
    <main>
      {isUserLoading ? (
        <Block container spacer={2}>
          <Spinner />
        </Block>
      ) : error ? (
        <Block container spacer={2}>
          <Title as="h2">{error}</Title>
        </Block>
      ) : (
        <>
          <Block container spacer={2}>
            <Title>Edit Event</Title>
          </Block>
          <Block container spacer={2}>
            {initialFormValues ? (
              <Formik
                isInitialValid={true}
                initialValues={initialFormValues}
                validationSchema={eventSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await updateEvent(id, values);
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
                          Save
                        </ButtonYellow>
                      </Form>
                      {status && status.error && renderError(status)}
                    </>
                  );
                }}
              />
            ) : (
              <Spinner />
            )}
          </Block>
        </>
      )}
    </main>
  );
};

export default EventPageEdit;
