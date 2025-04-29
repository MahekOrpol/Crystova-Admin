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
  Button,
  Card,
  CardContent,
  Icon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Collapse,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import "./index.css";

const baseURL = "https://dev.crystovajewels.com";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [subcategories, setSubcategories] = useState({}); // key: categoryId, value: subcategories[]

  const [openSubModal, setOpenSubModal] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [previewSubImage, setPreviewSubImage] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleOpenSubModal = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setSubcategoryName("");
    setSubcategoryImage(null);
    setPreviewSubImage(null);
    setOpenSubModal(true);
  };

  const handleCloseSubModal = () => setOpenSubModal(false);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/category/get`);
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/category/getsub/${categoryId}`
      );
      setSubcategories((prev) => ({ ...prev, [categoryId]: response.data }));
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    }
  };

  const handleOpen = (category = null) => {
    if (category) {
      setEditMode(true);
      setSelectedCategory(category);
      setCategoryName(category.categoryName);
      setPreviewImage(`${baseURL}${category.categoryImage}`);
    } else {
      setEditMode(false);
      setSelectedCategory(null);
      setCategoryName("");
      setPreviewImage(null);
      setCategoryImage(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;

    const formData = new FormData();
    formData.append("categoryName", categoryName.trim());

    if (categoryImage) {
      formData.append("categoryImage", categoryImage);
    } else if (editMode && selectedCategory?.categoryImage) {
      formData.append("existingImage", selectedCategory.categoryImage);
    }

    try {
      if (editMode && selectedCategory) {
        await axios.put(
          `${baseURL}/api/v1/category/update/${selectedCategory.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`${baseURL}/api/v1/category/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      handleClose();
      getAllCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const deleteCategories = async (id) => {
    await axios.delete(`${baseURL}/api/v1/category/delete/${id}`);
    getAllCategories();
  };

  const handleSubcategoryImageChange = (e) => {
    const file = e.target.files[0];
    setSubcategoryImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSubImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSubcategory = async () => {
    if (!subcategoryName.trim() || !currentCategoryId) return;

    const formData = new FormData();
    formData.append("subCategoryName", subcategoryName.trim());
    if (subcategoryImage) {
      formData.append("subcategoryImage", subcategoryImage);
    }

    try {
      await axios.post(
        `http://localhost:3000/api/v1/category/create/${currentCategoryId}/subcategory`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      getSubcategories(currentCategoryId); // refresh
      handleCloseSubModal();
    } catch (error) {
      console.error("Failed to save subcategory:", error);
    }
  };

  const toggleSubcategory = (categoryId) => {
    setExpandedRows((prev) => {
      const isCurrentlyExpanded = !!prev[categoryId];

      if (!isCurrentlyExpanded) {
        getSubcategories(categoryId);
      }

      // Reset all expansions, then expand only the selected one (or none if it was already open)
      return isCurrentlyExpanded ? {} : { [categoryId]: true };
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                <Typography color="textSecondary">Admin Interface</Typography>
              </div>
              <Typography
                variant="h6"
                className="text-18 sm:text-24 font-semibold"
              >
                Categories
              </Typography>
            </div>
            <Button
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
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Category Name</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((category) => (
                          <>
                            <TableRow key={category.id}>
                              <TableCell
                                onClick={() => toggleSubcategory(category.id)}
                                style={{ cursor: "pointer" }}
                              >
                                {expandedRows[category.id] ? (
                                  <IoIosArrowDown />
                                ) : (
                                  <IoIosArrowForward />
                                )}
                                &nbsp;
                                <img
                                  src={`${baseURL}${category.categoryImage}`}
                                  alt={category.categoryName}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                  }}
                                />
                              </TableCell>
                              <TableCell>{category.categoryName}</TableCell>
                              <TableCell>
                                {new Date(category.createdAt)
                                  .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                  .replace(",", " at")}
                              </TableCell>
                              <TableCell>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                  <FaEdit
                                    size={18}
                                    onClick={() => handleOpen(row)}
                                    className="ioscsdc"
                                  />
                                  <FaTrash
                                    size={18}
                                    onClick={() => deleteCategories(row.id)}
                                    className="ioscsdc"
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow key={category.id}
  onClick={() => {
    toggleSubcategory(category.id);
    setCurrentCategoryId(category.id); // Ensure the current category ID is set
  }}>
                              <TableCell
                                colSpan={4}
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                              >
                                <Collapse
                                  in={expandedRows[category.id]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <div className="p-16 bg-gray-50 rounded">
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                    >
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          handleOpenSubModal(category._id)
                                        }
                                      >
                                        +
                                      </Button>
                                    </Typography>
                                    {subcategories[category.id]?.length ? (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Image</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Created At</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {subcategories[category.id].map((sub) => (
        <TableRow key={sub.id}>
          <TableCell>
            {sub.subcategoryImage ? (
              <img
                src={`${baseURL}${sub.subcategoryImage}`}
                alt={sub.subCategoryName}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
            ) : (
              "No image"
            )}
          </TableCell>
          <TableCell>{sub.subCategoryName}</TableCell>
          <TableCell>
            {new Date(sub.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }).replace(",", " at")}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
) : (
  <Typography variant="body2" color="textSecondary">
    No subcategories found.
  </Typography>
)}

                                  </div>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={categories.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </div>
        }
      />

      <Dialog open={open} onClose={handleClose} className="mui_add_cate_dialo">
        <DialogTitle>
          {editMode ? "Edit Category" : "Add New Category"}
        </DialogTitle>
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
              src={
                previewImage || `${baseURL}${selectedCategory?.categoryImage}`
              }
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                objectFit: "cover",
              }}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSaveCategory}
            variant="contained"
            color="primary"
          >
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSubModal} onClose={handleCloseSubModal}>
        <DialogTitle>Add Subcategory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subcategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
          {previewSubImage && (
            <img
              src={previewSubImage}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                objectFit: "cover",
              }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleSubcategoryImageChange}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseSubModal}>Cancel</Button>
          <Button
            onClick={handleSaveSubcategory}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Categories;
