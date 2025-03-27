import FuseHighlight from "@fuse/core/FuseHighlight";
import FusePageSimple from "@fuse/core/FusePageSimple";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";

function IconsUI() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getUser = async () => {
    const response = await axios.get(
      "https://crystova.cloudbusiness.cloud/api/v1/admin/get"
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  
  return (
    <FusePageSimple
      header={
        <div className="flex flex-1 items-center justify-between p-12 md:p-24">
          <div className="flex flex-col">
            <div className="flex items-center mb-16">
              <Icon className="text-18" color="action">
                home
              </Icon>
              <Icon className="text-16" color="action">
                chevron_right
              </Icon>
              <Typography color="textSecondary" className="font-medium">
                Admin Interface
              </Typography>
            </div>
            <Typography
              variant="h6"
              className="text-18 sm:text-24 font-semibold"
            >
              Admin 
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="p-24">
          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>NO.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ceated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.displayName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                       <TableCell>
                         {new Date(row.createdAt).toLocaleString('en-GB', {
                           day: '2-digit',
                           month: 'short', // This gives "Jan", "Feb", etc.
                           hour: 'numeric',
                           minute: '2-digit',
                           hour12: true,
                         }).replace(',', ' at')}
                       </TableCell>
                       
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <TablePagination
            className="shrink-0 border-t-1"
            component="div"
            count={user.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }
    />
  );
}

export default IconsUI;
