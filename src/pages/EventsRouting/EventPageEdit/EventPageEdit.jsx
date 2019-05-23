import React, { useContext, useEffect, useState } from 'react';
import { parse } from 'date-fns';
import * as Yup from 'yup';
import Block from '../../../components/Block/Block';
import Title from '../../../components/Typography/Title';
import Spinner from '../../../components/Spinner/Spinner';
import { UserContext } from '../../../App';
import { getEvent, updateEvent } from './../../../services/event/eventService';
import FormikSkeleton from './../../../components/Form/FormikSkeleton';
import EventForm from './../EventForm/EventForm';

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

  if (error) {
    return (
      <Block container spacer={2}>
        <Title as="h2">{error}</Title>
      </Block>
    );
  }

  return (
    <main>
      <Block container spacer={2}>
        <Title>Edit Event</Title>
      </Block>
      {isUserLoading ? (
        <Block container spacer={2}>
          <Spinner />
        </Block>
      ) : (
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
                return <EventForm isSubmitting={isSubmitting} isValid={isValid} buttonText="Save" />;
              }}
            </FormikSkeleton>
          ) : (
            <Spinner />
          )}
        </Block>
      )}
    </main>
  );
};

export default EventPageEdit;
