import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import { saveProduct, removeProduct, updateProduct } from "../store/productSlice";
import { useEffect, useState } from "react";

function ProductHeader() {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images") || [];
  const name = watch("name");
  const theme = useTheme();
  const navigate = useNavigate();

  const { productId } = useParams(); // ✅ Get productId from URL
  const isEditMode = productId !== "new";

  // useEffect(() => {
  //   const editMode = localStorage.getItem("isEditMode") === "true";
  //   setIsEditMode(editMode);
  // }, []);

  function handleSaveProduct() {
  dispatch(saveProduct(getValues()))
    .unwrap()
    .then(() => {
      navigate("/apps/e-commerce/products");
    })
    .catch((error) => {
      console.error("Failed to save product", error);
    });
}
//   function handleUpdateProduct() {
//   dispatch(updateProduct(getValues()))
//     .unwrap()
//     .then(() => {
//       navigate("/apps/e-commerce/products");
//     })
//     .catch((error) => {
//       console.error("Failed to save product", error);
//     });
// }
function handleUpdateProduct() {
  const values = getValues();
  console.log("Product values before update:", values); // 👈 Add this line

  dispatch(updateProduct(values))
    .unwrap()
    .then(() => {
      navigate("/apps/e-commerce/products");
    })
    .catch((error) => {
      console.error("Failed to save product", error);
    });
}


  // const handleSaveProduct = async (productData) => {
  //   try {
  //     const result = await dispatch(saveProduct(productData)).unwrap();

  //     // Show success toast
  //     toast.success("Product created successfully!");

  //     // Redirect to product listing
  //     navigate("/apps/e-commerce/products");
  //   } catch (error) {
  //     // Show error toast
  //     toast.error("Failed to create product. Please try again!");
  //     console.error("Save Product Error:", error);
  //   }
  // };

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate("/apps/e-commerce/products");
    });
  }

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/products"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Products</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId }).url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {name || "New Product"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                Product Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveProduct}
          startIcon={<Icon className="hidden sm:flex">delete</Icon>}
        >
          Remove
        </Button>
       
        {!isEditMode ? (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleSaveProduct}
          >
            Save
          </Button>
        ) : (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleUpdateProduct}
          >
            Update
          </Button>
        )}
      </motion.div>
    </div>
  );
}

export default ProductHeader;
