import React from 'react';
import { Form } from 'formik';
import InputField from './../../../components/Field/InputField';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';
import MyDatePicker from './../../../components/DatePicker/MyDatePicker';

const EventForm = props => {
  const { isValid, isSubmitting, buttonText } = props;
  return (
    <Form>
      <InputField type="text" name="name" placeholder="Event Name" margin={4} />
      <InputField name="description" placeholder="Describe your event" component="textarea" margin={4} />
      <InputField name="eventStart" margin={4} component={MyDatePicker} />
      <InputField name="eventEnd" margin={4} component={MyDatePicker} />
      <InputField type="text" name="imageUrl" placeholder="Event Image Url" margin={4} />
      <ButtonYellow type="submit" disabled={!isValid || isSubmitting}>
        {buttonText}
      </ButtonYellow>
    </Form>
  );
};

export default EventForm;
