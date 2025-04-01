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
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './index.css';

function Categories() {
  const [user, setUser] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [previewImage, setPreviewImage] = useState(null);

  const getAllWishlist = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/category/get"
    );
    setUser(response.data);
  };

  useEffect(() => {
    getAllWishlist();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const [open, setOpen] = useState(false);
const [categoryName, setCategoryName] = useState("");

const handleOpen = (category = null) => {
  console.log("Clicked Category:", category); // Debugging
  if (category) {
    setEditMode(true);
    setSelectedCategory(category);
    setCategoryName(category.categoryName);
    setPreviewImage(`${baseURL}${category.categoryImage}`);
  } else {
    setEditMode(false);
    setSelectedCategory(null);
    setCategoryName("");
    setPreviewImage(null); // Ensure no old preview image
    setCategoryImage(null); // Ensure no old image file
  }
  setOpen(true);
};


const handleClose = () => setOpen(false);
const [editMode, setEditMode] = useState(false); // To track if editing or adding
const [selectedCategory, setSelectedCategory] = useState(null); // Store category being edited

const handleAddCategory = async () => {
  if (!categoryName.trim() || !categoryImage) return;

  const formData = new FormData();
  formData.append("categoryName", categoryName.trim());
  formData.append("categoryImage", categoryImage);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/category/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Category Created:", response.data);
    handleClose();
    getAllWishlist(); // Refresh category list after adding
  } catch (error) {
    console.error("Failed to create category:", error);
  }
};

const handleSaveCategory = async () => {
  if (!categoryName.trim()) return;

  const formData = new FormData();
  formData.append("categoryName", categoryName.trim());

  // Append the image only if a new one is selected
  if (categoryImage) {
    formData.append("categoryImage", categoryImage);
  } else if (editMode && selectedCategory?.categoryImage) {
    formData.append("existingImage", selectedCategory.categoryImage);
  }

  try {
    if (editMode && selectedCategory) {
      // Update existing category
      await axios.put(
        `http://localhost:3000/api/v1/category/update/${selectedCategory.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      // Create new category
      await axios.post(
        "http://localhost:3000/api/v1/category/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    handleClose();
    getAllWishlist(); // Refresh category list
  } catch (error) {
    console.error("Failed to save category:", error);
  }
};


  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const baseURL = "http://localhost:3000";

  const deleteCategories = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/category/delete/${id}`);
    getAllWishlist(); // Refresh list after deletion
  };
  
  return (
    <>
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
                Categories
              </Typography>
            </div>
            <Button
          className="whitespace-nowrap"
          variant="contained"
          color="secondary"
          onClick={() => handleOpen()}  
        >
          <span className="hidden sm:flex">Add New Category</span>
          <span className="flex sm:hidden">New</span>
        </Button>
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
                                   
                                    <FaEdit size={18} onClick={() => handleOpen(row)}  className='ioscsdc' />
                                  <FaTrash
                                    size={18}
                                    onClick={() => deleteCategories(row.id)} 
                                    className='ioscsdc'
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
      <Dialog open={open} onClose={handleClose} className='mui_add_cate_dialo'>
      <DialogTitle>{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          type="text"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
{(editMode && selectedCategory?.categoryImage) || previewImage ? (
  <img
    src={previewImage || `${baseURL}${selectedCategory?.categoryImage}`}
    alt="Category Preview"
    style={{ width: "100px", height: "100px", marginTop: "10px", objectFit: "cover" }}
  />
) : null}


    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ marginTop: "10px" }}
    />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSaveCategory } color="primary" variant="contained">  {editMode ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default Categories;
