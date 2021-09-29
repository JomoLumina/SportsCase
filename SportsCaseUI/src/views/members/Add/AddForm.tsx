import React, { useState, useEffect, useCallback, } from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box, Button, Card, CardContent, Grid,
  TextField, makeStyles, Select, useTheme,
  FormControl, InputLabel, MenuItem, OutlinedInput
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { DEFAULT_IMAGE_URL } from 'src/constants';
import type { Sport } from 'src/types/sport';
import axios from 'src/utils/axios';

interface AddFormProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
  gridContainer:{
    display: 'flex'
  },
  gridItem:{
    textAlign: "center"
  },
  avatar:{
    border: "6px solid #ccc",
    borderRadius: '50%',
    justifyContent: 'center'
  },
  nameInput: {
    alignSelf: 'flex-end',
    margin: '12px 4px',
  },
  formControl: {
    width: '100%'
  },
  inputLabel: {
    top: '-4.5px',
    left: '15px',
  },
  sportSelect: {
    alignSelf: 'flex-start',
    margin: '12px 4px'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(sport, sports, theme) {
  return {
    fontWeight:
      sports.indexOf(sport) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddForm: FC<AddFormProps> = ({
  className,
  ...rest
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const isMountedRef = useIsMountedRef();
  const [sports, setSports] = useState<Sport[] | null>([]);
  const [selectedSports, setSelectedSports] = React.useState([]);

  const getSports = useCallback(async () => {
    try {
      const response = await axios.get(`/sports`);
      if (isMountedRef.current) {
        if (response.status === 200) {
          setSports(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSports();
  }, [getSports]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSports(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Formik
      initialValues={{
        name: '',
        image: DEFAULT_IMAGE_URL,
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
          const data = JSON.stringify({
            name: values.name,
            image: values.image,
            sports: selectedSports
          });

          await axios.put(`/members`, data);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Member added successfully', { variant: 'success' });
          history.push('/app/members');

        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: 'Something went wrong, error while creating the member' });
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
                  className={classes.gridItem}
                >
                  <img
                    alt={"Amsterdam Sports Inc."}
                    src={values.image}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid
                  container
                  className={classes.gridContainer}
                  md={6}
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                    className={classes.nameInput}
                  >
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Name"
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
                    xs={12}
                    className={classes.sportSelect}
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel id="sports-label" className={classes.inputLabel}>Sports</InputLabel>
                      <Select
                        labelId="sports-label"
                        id="sports-select"
                        multiple
                        required
                        fullWidth
                        value={selectedSports}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Sports" />}
                        MenuProps={MenuProps}
                      >
                        {sports.map((sport) => (
                          <MenuItem
                            key={sport.id}
                            value={sport.id}
                            style={getStyles(sport.id, selectedSports, theme)}
                          >
                            {sport.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ height: '56px' }}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Add member
                </Button>
              </Box>
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
