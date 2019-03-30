import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Block from './../../../components/Block/Block';
import Title from './../../../components/Typography/Title';
import { createEvent } from './../../../services/event/eventService';
import { UserContext } from './../../../App';
import Spinner from './../../../components/Spinner/Spinner';

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

  if (!isUserLoading && !user) {
    history.push('/login');
  }

  const initialFormValues = {
    name: '',
    description: '',
    eventStart: '',
    eventEnd: '',
    imageUrl: '',
  };

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
                      <Field type="text" name="name" placeholder="Event name" />
                      <ErrorMessage name="name" />
                      <Field component="textarea" name="description" placeholder="Describe your event" />
                      <ErrorMessage name="description" />
                      <Field type="text" name="eventStart" placeholder="Start date and time" />
                      <ErrorMessage name="eventStart" />
                      <Field type="text" name="eventEnd" placeholder="End date and time" />
                      <ErrorMessage name="eventEnd" />
                      <Field type="text" name="imageUrl" placeholder="Event image url" />
                      <ErrorMessage name="imageUrl" />
                      <button type="submit" disabled={!isValid || isSubmitting}>
                        Create
                      </button>
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
