import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { parse, addDays } from 'date-fns';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Block from './../../../components/Block/Block';
import Title from './../../../components/Typography/Title';
import Spinner from './../../../components/Spinner/Spinner';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';
import MyDatePicker from './../../../components/DatePicker/MyDatePicker';
import { createEvent } from './../../../services/event/eventService';
import { UserContext } from './../../../App';

import 'react-datepicker/dist/react-datepicker.css';
import FormikSkeleton from './../../../components/Form/FormikSkeleton';

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
    eventStart: parse(Date.now()),
    eventEnd: addDays(Date.now(), 2),
    imageUrl: '',
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      history.push('/login');
    }
  }, [history, isUserLoading, user]);

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
            <FormikSkeleton
              initialValues={initialFormValues}
              schema={eventSchema}
              apiCall={createEvent}
              redirectPath="/events"
              history={history}
            >
              {(isSubmitting, isValid) => {
                return (
                  <Form>
                    <div className="mb-4">
                      <StyledFormikField type="text" name="name" placeholder="Event name" />
                    </div>
                    <div className="mb-4">
                      <ErrorMessage name="name" />
                    </div>
                    <div className="mb-4">
                      <StyledFormikTextArea component="textarea" name="description" placeholder="Describe your event" />
                    </div>
                    <div className="mb-4">
                      <ErrorMessage name="description" />
                    </div>
                    <div className="mb-4">
                      <StyledFormikField name="eventStart" type="text" component={MyDatePicker} />
                    </div>
                    <div className="mb-4">
                      <ErrorMessage name="eventStart" />
                    </div>
                    <div className="mb-4">
                      <StyledFormikField name="eventEnd" type="text" component={MyDatePicker} />
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
                );
              }}
            </FormikSkeleton>
          </Block>
        </>
      )}
    </main>
  );
};

export default EventPageNew;
