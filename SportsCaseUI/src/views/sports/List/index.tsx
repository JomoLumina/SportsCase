import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import axios from 'src/utils/axios';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { Sport } from 'src/types/sport';
import Results from './Results';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const List: FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [sports, setSports] = useState<Sport[]>([]);

  const getSports = useCallback(async () => {
    try {
      const response = await axios.get('https://localhost:44368/sports');
      if (isMountedRef.current) {
        setSports(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSports();
  }, [getSports]);

  return (
    <Page
      className={classes.root}
      title="Sport List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results sports={sports} />
        </Box>
      </Container>
    </Page>
  );
};

export default List;
