import React, { useContext, useEffect } from 'react';
import { parse, addDays } from 'date-fns';
import { Form } from 'formik';
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
import InputField from './../../../components/Field/InputField';

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
                    <InputField type="text" name="name" placeholder="Event Name" margin={4} />
                    <InputField name="description" placeholder="Describe your event" component="textarea" margin={4} />
                    <InputField name="eventStart" margin={4} component={MyDatePicker} />
                    <InputField name="eventEnd" margin={4} component={MyDatePicker} />
                    <InputField type="text" name="imageUrl" placeholder="Event Image Url" margin={4} />
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
