/* eslint no-param-reassign: "error" */
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Button, Card, CardContent, Grid,
  TextField, makeStyles} from '@material-ui/core';
  import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { Sport } from 'src/types/sport';

interface EditFormProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const EditForm: FC<EditFormProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const isMountedRef = useIsMountedRef();
  const [sport, setSport] = useState<Sport | null>(null);

  const getSport = useCallback(async () => {
    try {
      const response = await axios.get(`/sports/id/${id}`);
      if (isMountedRef.current) {
        if (response.status === 200) {
          setSport(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getSport();
  }, [getSport]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: sport?.id,
        name: sport?.name ?? ' ',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(20).required('First name is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const response = await axios.post('/sports', values);
          if (isMountedRef.current) {
            if (response.status === 200) {
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar('Sport updated successfully', { variant: 'success' });
            } else {
              enqueueSnackbar('Sport updated failed', { variant: 'error' });
            }
            history.push('/app/sports');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: "Sport update failed" });
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
                    Update sport
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

EditForm.propTypes = {
  className: PropTypes.string,
};

export default EditForm;
