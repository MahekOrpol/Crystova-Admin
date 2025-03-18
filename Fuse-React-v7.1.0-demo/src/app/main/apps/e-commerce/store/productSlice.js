import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { useParams } from "react-router-dom";

// export const getProduct = createAsyncThunk(
//   "eCommerceApp/product/getProduct",
//   async (params) => {
//     const response = await axios.get("http://localhost:3000/api/v1/product/getSingleProduct", { params });
//     const data = await response.data;

//     return data === undefined ? null : data;
//   }
// );


// export const getProduct = createAsyncThunk(
//   "eCommerceApp/product/getProduct",
//   async (params) => {
//     console.log('getProduct params :>> ', params);
//     const productId = params?.productId || params?.['*'];
//     const response = await axios.get(`http://localhost:3000/api/v1/product/getSingleProduct/${productId}`);
//     const data = await response.data;
//     return data === undefined ? null : data;
//   }
// );

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (params) => {
    const productId =params?.['*'];
    console.log('getProduct params :>> ', productId);
    const response = await axios.get(`http://localhost:3000/api/v1/product/getSingleProduct/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

// export const getProduct = createAsyncThunk(
//   "eCommerceApp/product/getProduct",
//   async (params) => {
//     console.log('data :>> ', params);
//     // const response = await axios.get(`http://localhost:3000/api/v1/product/getSingleProduct/${params.productId}`);
//     const response = await axios.get("http://localhost:3000/api/v1/product/getSingleProduct", {
//       params: { productId: params }
//     });
    
//     const data = await response.data;
//     return data === undefined ? null : data;
//   }
// );

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

    const apiData = {
      categoryName: Array.isArray(productData.categoryName)
        ? productData.categoryName.join(",")
        : productData.categoryName,
      productName: productData.productName,
      productsDescription: productData.productsDescription,
      regularPrice: productData.priceTaxIncl,
      salePrice: productData.taxRate,
      stock: productData.stock,
      discount: productData.disRate,
      productSize: Array.isArray(productData.productSize)
      ? productData.productSize.join(",")
      : productData.productSize,
      sku: productData.sku,
      quantity: productData.quantity,
      // image: productData.images,
      // featuredImageId: productData.featuredImageId, // ✅ Optional, based on backend

      // image: productData.image?.[0]?.url || "", // Pick first uploaded image or handle array
    };
    const response = await axios.post(
      "http://localhost:3000/api/v1/product/create",
      apiData,
      {
        ...product,
        ...productData,
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
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
