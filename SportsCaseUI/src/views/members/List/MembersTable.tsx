import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar, Box, IconButton, Link, SvgIcon, Table,
  TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { Edit as EditIcon } from 'react-feather';
import type { Member } from 'src/types/member';
import type { Sport } from 'src/types/sport';

interface MembersTableProps {
  paginatedMembers: Member[];
  sports: Sport[]
}

const MembersTable: FC<MembersTableProps> = ({
  paginatedMembers, sports
}) => (
  <Box>
    <PerfectScrollbar>
      <Box minWidth={400}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Id
              </TableCell>
              <TableCell align="center">
                Avatar
              </TableCell>
              <TableCell align="center">
                Name
              </TableCell>
              <TableCell align="center">
                Sports
              </TableCell>
              <TableCell align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembers.map((member) => (
              <TableRow
                hover
                key={member.id}
              >
                <TableCell align="center">
                  {member.id}
                </TableCell>
                <TableCell align="center">
                  <Avatar alt={`${member.name}`} src={member.image} style={{ margin: 'auto' }} />
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
                      to={`/app/members/${member.id}`}
                      variant="h6"
                    >
                      {member.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {member.sports.map((ms, i, _sports) =>{
                     return sports.map(s => {
                       if(s.id === ms){
                        if(_sports.length === i + 1){
                          return `${s.name}`
                         }else{
                          return `${s.name}, `
                         }
                       }else{
                         return null;
                       }
                     })
                  })}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={RouterLink}
                    to={`/app/members/${member.id}`}
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

MembersTable.propTypes = {
  paginatedMembers: PropTypes.array.isRequired,
  sports: PropTypes.array.isRequired,
};
export default MembersTable;
