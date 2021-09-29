import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import axios from 'src/utils/axios';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { Member } from 'src/types/member';
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
  const [members, setMembers] = useState<Member[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);

  const getMembers = useCallback(async () => {
    try {
      const response = await axios.get('/members');
      if (isMountedRef.current) {
        if(response.status === 200){
          setMembers(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  const getSports = useCallback(async () => {
    try {
      const response = await axios.get('/sports');
      if (isMountedRef.current) {
        setSports(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSports();
    getMembers();
  }, [getSports, getMembers]);

  return (
    <Page
      className={classes.root}
      title="Member List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results members={members} sports={sports} />
        </Box>
      </Container>
    </Page>
  );
};

export default List;
