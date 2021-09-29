import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, IconButton, Link, SvgIcon, Table,
  TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { Edit as EditIcon } from 'react-feather';
import type { Sport } from 'src/types/sport';

interface SportsTableProps {
  paginatedSports: Sport[];
}

const SportsTable: FC<SportsTableProps> = ({
  paginatedSports,
}) => (
  <Box>
    <PerfectScrollbar>
      <Box minWidth={400}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell align="center">
                Name
              </TableCell>
              <TableCell align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSports.map((sport) => (
              <TableRow
                hover
                key={sport.id}
              >
                <TableCell align="center">
                  {sport.id}
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to={`/app/sports/${sport.id}`}
                      variant="h6"
                    >
                      {sport.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={RouterLink}
                    to={`/app/sports/${sport.id}`}
                  >
                    <SvgIcon fontSize="small">
                      <EditIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Box>
);

SportsTable.propTypes = {
  paginatedSports: PropTypes.array.isRequired,
};
export default SportsTable;
