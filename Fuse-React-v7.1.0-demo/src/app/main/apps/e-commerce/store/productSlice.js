import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { useParams } from "react-router-dom";


// export const getProduct = createAsyncThunk(
//   "eCommerceApp/product/getProduct",
//   async (params) => {
//     const productId = params?.["*"];
//     console.log("getProduct params :>> ", productId);
//     const response = await axios.get(
//       `https://crystova.cloudbusiness.cloud/api/v1/product/getSingleProduct/${productId}`
//     );
//     const data = await response.data;
//     return data === undefined ? null : data;
//   }
// );

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async ({ productId }) => {  // Use object destructuring
    console.log("getProduct params :>> ", productId);
    if (!productId) throw new Error("Product ID is missing!");

    const response = await axios.get(
      `https://crystova.cloudbusiness.cloud/api/v1/product/getSingleProduct/${productId}`
    );

    return response.data || null;
  }
);


export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.post("/api/e-commerce-app/remove-product", { id });

    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "eCommerceApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const { product } = getState().eCommerceApp;

    const formData = new FormData();
    formData.append(
      "categoryName",
      Array.isArray(productData.categoryName)
        ? productData.categoryName.map((cat) => cat.categoryName).join(",")
        : productData.categoryName
    );
    
    formData.append("productName", productData.productName);
    formData.append("productsDescription", productData.productsDescription);
    formData.append("regularPrice", productData.priceTaxIncl);
    formData.append("salePrice", productData.salePriceTaxIncl);
    formData.append("stock", productData.stock);
    formData.append("gender", productData.gender);
    formData.append("discount", productData.disRate);
    formData.append(
      "productSize",
      Array.isArray(productData.productSize)
        ? productData.productSize.join(",")
        : productData.productSize
    );
    
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);

    // Append each image file
    productData.images?.forEach((img) => {
      formData.append("image", img.file); // Assuming you have img.file as the File object
    });

    const response = await axios.post(
      "https://crystova.cloudbusiness.cloud/api/v1/product/create",
      formData,
      {
        ...product,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = await response.data;

    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "eCommerceApp/product/updateProduct",
  async (productData, { dispatch, getState }) => {
    const { product } = getState().eCommerceApp;

    const updatedProductData = {
      ...product,  // Keep old values
      ...productData, // Override with new values
    };

    const formData = new FormData();
    
    formData.append(
      "categoryName",
      Array.isArray(productData.categoryName)
        ? productData.categoryName.map((cat) => cat.categoryName).join(",")
        : productData.categoryName
    );
    
    formData.append("productName", productData.productName);
    formData.append("productsDescription", productData.productsDescription);
    formData.append("regularPrice", productData.priceTaxIncl);
    formData.append("salePrice", productData.salePriceTaxIncl);
    formData.append("stock", productData.stock);
    formData.append("gender", productData.gender);
    formData.append("discount", productData.disRate);
    formData.append(
      "productSize",
      Array.isArray(productData.productSize)
        ? productData.productSize.join(",")
        : productData.productSize
    );
    
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);

    // Append each image file
    productData.images?.forEach((img) => {
      formData.append("image", img.file); // Assuming you have img.file as the File object
    });

    const response = await axios.put(
      `https://crystova.cloudbusiness.cloud/api/v1/product/update/${productData.id}`, // Dynamic ID in URL
      formData,
      {
        ...product,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = await response.data;

    return data;
  }
);

const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: "",
          handle: "",
          description: "",
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
    setSelectedProduct: (state, action) => action.payload, // Add this reducer

  },
  extraReducers: {
    // [getProduct.fulfilled]: (state, action) => action.payload,
    [getProduct.fulfilled]: (state, action) => {
      console.log("Fetched Product:", action.payload);
      return action.payload;
    },
    
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct ,setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
