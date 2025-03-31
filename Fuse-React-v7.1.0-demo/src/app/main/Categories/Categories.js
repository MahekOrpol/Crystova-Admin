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
import { FaEdit, FaTrash } from "react-icons/fa";

function Categories() {
  const [user, setUser] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getAllWishlist = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/category/get"
    );
    setUser(response.data);
  };

  useEffect(() => {
    getAllWishlist();
  }, []);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const baseURL = "http://crystova.cloudbusiness.cloud";

  const deleteCategories = async () => {
    const res = await axios.delete(
      "http://localhost:3000/api/v1/category/delete/${_id}"
    );
  };
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
                Wdishlist
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
                      <TableCell></TableCell>
                      <TableCell>Category Name</TableCell>
                      <TableCell>createdAt</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {user
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index, array) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "none",
                          },
                        }}
                      > */}
                    {user
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(
                        (row, index) => (
                          console.log("user :>> ", user),
                          (
                            <TableRow key={row.id}>
                              <TableCell>
                                {Array.isArray(row?.categoryImage) ? (
                                  <img
                                    // src={row.productId.categoryImage[0]}
                                    src={`${baseURL}${row.categoryImage[0]}`}
                                    alt="Product"
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={`${baseURL}${row.categoryImage}`}
                                    alt="Product"
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </TableCell>

                              <TableCell>{row?.categoryName}</TableCell>
                              <TableCell>
                                {new Date(row.createdAt)
                                  .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short", // This gives "Jan", "Feb", etc.
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                  .replace(",", " at")}
                              </TableCell>
                              <TableCell>
                                <div
                                  className="flex"
                                  style={{
                                    gap: "1rem",
                                  }}
                                >
                                  <FaEdit size={18} />
                                  <FaTrash
                                    size={18}
                                    onClick={() => deleteCategories(row.id)}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      )}
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

export default Categories;
