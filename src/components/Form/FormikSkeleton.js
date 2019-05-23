import React from 'react';
import { Formik } from 'formik';

const FormikSkeleton = props => {
  const { initialValues, schema, apiCall, redirectPath, successAction, history, children } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        try {
          const response = await apiCall(values);
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
          if (successAction) {
            successAction(response.data);
          }
          history.push(redirectPath);
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
            {children(isSubmitting, isValid)}
            {status && status.error && renderError(status)}
          </>
        );
      }}
    />
  );
};

export default FormikSkeleton;
