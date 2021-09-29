import React, {  useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  InputAdornment,
  SvgIcon,
  TablePagination,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  Search as SearchIcon,
} from 'react-feather';
import type { Theme } from 'src/theme';
import type { Member } from 'src/types/member';
import type { Sport } from 'src/types/sport';
import MembersTable from './MembersTable';

interface ResultsProps {
  className?: string;
  members: Member[];
  sports: Sport[];
}

const applyQuery = (members: Member[], query: string): Member[] => members?.filter((client) => {
  let matches = true;

  if (query) {
    let containsQuery = false;

    if (client['name']?.toLowerCase().includes(query.toLowerCase())) {
      containsQuery = true;
    }

    if (!containsQuery) {
      matches = false;
    }
  }

  return matches;
});

const applyPagination = (members: Member[], page: number,
  limit: number): Member[] => members.slice(page * limit, page * limit + limit);

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  bulkOperations: {
    position: 'relative',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const Results: FC<ResultsProps> = ({
  className,
  members,
  sports,
  ...rest
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 16));
  };

  const filteredMembers = applyQuery(members, query);
  const paginatedMembers = applyPagination(filteredMembers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search member"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
      </Box>
      <MembersTable paginatedMembers={paginatedMembers} sports={sports} />
      <TablePagination
        component="div"
        count={filteredMembers.length}
        onChangePage={(event, newPage) => handlePageChange(newPage)}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  members: PropTypes.array.isRequired,
  sports: PropTypes.array.isRequired,
};

export default Results;
