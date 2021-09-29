import React from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Button, Card, CardContent,
  Grid, TextField, makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';

interface AddFormProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const AddForm: FC<AddFormProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        name: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(20).required('Sport name is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const data = JSON.stringify({
            name: values.name,
          });

          await axios.put('/sports', data);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Sport added successfully', { variant: 'success' });
          history.push('/app/sports');

        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: 'Something went wrong, error while creating the sport' });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid 
                container 
                spacing={2}
                >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Sport name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid 
                  item
                  md={6}
                  xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{height: '56px'}}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Add sport
                </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

AddForm.propTypes = {
  className: PropTypes.string,
};

export default AddForm;
