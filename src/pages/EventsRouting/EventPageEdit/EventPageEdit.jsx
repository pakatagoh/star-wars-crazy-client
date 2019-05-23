import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { parse } from 'date-fns';
import * as Yup from 'yup';
import Block from '../../../components/Block/Block';
import Title from '../../../components/Typography/Title';
import Spinner from '../../../components/Spinner/Spinner';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';
import { UserContext } from '../../../App';
import { getEvent, updateEvent } from './../../../services/event/eventService';
import MyDatePicker from './../../../components/DatePicker/MyDatePicker';
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

const EventPageEdit = props => {
  const { history } = props;
  const { id } = props.match.params;
  const [initialFormValues, setInitialFormValues] = useState('');
  const [error, setError] = useState('');
  const { user, isLoading: isUserLoading } = useContext(UserContext);

  useEffect(() => {
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
        eventStart: parse(response.eventStart),
        eventEnd: parse(response.eventEnd),
        imageUrl: response.imageUrl,
      });
    };
    if (!isUserLoading && !user) {
      history.push('/login');
    }
    if (!isUserLoading && user) {
      fetchEvent();
    }
  }, [history, id, isUserLoading, user]);

  const apiCall = id => {
    return async values => updateEvent(id, values);
  };

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
              <FormikSkeleton
                initialValues={initialFormValues}
                schema={eventSchema}
                apiCall={apiCall(id)}
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
                        <StyledFormikField name="eventStart" component={MyDatePicker} />
                      </div>
                      <div className="mb-4">
                        <ErrorMessage name="eventStart" />
                      </div>
                      <div className="mb-4">
                        <StyledFormikField name="eventEnd" component={MyDatePicker} />
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
                  );
                }}
              </FormikSkeleton>
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
