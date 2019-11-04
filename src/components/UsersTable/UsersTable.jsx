import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserInfoDialog from "./UserInfoDialog";
import { MAX_PAGE_COUNT } from "../../constants";

export default function UsersTable(props) {
  return (
    <Paper>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Info</TableCell>
            <TableCell>Picture</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <UserInfoDialog data={row} />
              </TableCell>
              <TableCell component="th" scope="row">
                <img src={row.picture.thumbnail} alt={""} />
              </TableCell>
              <TableCell>{row.name.first}</TableCell>
              <TableCell>{row.name.last}</TableCell>
              <TableCell>{row.login.username}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.loading && <p>Loading ...</p>}
      {props.page === MAX_PAGE_COUNT && <p>End of user catalog</p>}
    </Paper>
  );
}
