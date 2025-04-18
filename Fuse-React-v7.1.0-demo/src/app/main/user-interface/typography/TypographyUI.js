import FuseHighlight from "@fuse/core/FuseHighlight";
import FusePageSimple from "@fuse/core/FusePageSimple";
import {
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { setProductsSearchText } from "app/main/apps/e-commerce/store/productsSlice";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TypographyUI() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const mainTheme = useSelector(selectMainTheme);
  const [searchText, setSearchText] = useState('');

  const getUser = async () => {
    const response = await axios.get(
      "http://147.93.104.196:3000/api/v1/register/get"
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

  const filteredData = user.filter(
    (row) =>
      row.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchText.toLowerCase())
  );
  
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
                Customer Interface
              </Typography>
            </div>
            <Typography
              variant="h6"
              className="text-18 sm:text-24 font-semibold"
            >
              Customer
            </Typography>
          </div>

          <div className="flex flex-1 items-center justify-center px-12">
            <ThemeProvider theme={mainTheme}>
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
              >
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={(e) => setSearchText(e.target.value)}

                />
              </Paper>
            </ThemeProvider>
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
                    <TableCell>Contact</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ceated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
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
          </Card>
        </div>
      }
    />
  );
}

export default TypographyUI;
