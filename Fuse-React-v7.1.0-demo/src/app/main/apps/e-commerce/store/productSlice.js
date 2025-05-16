import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { useParams } from "react-router-dom";
export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async ({ productId }) => {
    // Use object destructuring
    console.log("getProduct params :>> ", productId);
    if (!productId) throw new Error("Product ID is missing!");
    const response = await axios.get(
      `https://dev.crystovajewels.com/api/v1/product/getSingleProduct/${productId}`
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
    // Append basic product data
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
    formData.append("discount", productData.disRate || 0);
    formData.append(
      "best_selling",
      productData.bestSelling === "1" ? "1" : "0"
    );
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);
    // Handle product sizes
    formData.append(
      "productSize",
      Array.isArray(productData.productSize)
        ? productData.productSize.length > 0
          ? productData.productSize.join(",")
          : "[]"
        : productData.productSize || "[]"
    );
    // Handle variations
    formData.append(
      "hasVariations",
      productData.hasVariations && productData.productVariations?.length > 0
        ? "true"
        : "false"
    );
    if (
      productData.hasVariations &&
      productData.productVariations?.length > 0
    ) {
      formData.append(
        "variations",
        JSON.stringify(productData.productVariations)
      );
    } else {
      formData.append("variations", "[]");
    }
    // Handle images
    if (productData.images && Array.isArray(productData.images)) {
      // Handle new image uploads
      productData.images.forEach((img, index) => {
        if (img.file && !img.isExisting) {
          formData.append(`image`, img.file);
        }
      });
      // Handle existing images paths
      const existingImages = productData.images
        .filter((img) => img.isExisting)
        .map((img) => img.path);
      if (existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }
    }
    console.log("Final Payload:", formData);
    const response = await axios.post(
      "https://dev.crystovajewels.com/api/v1/product/create",
      formData,
      {
        timeout: 30000, // 60 seconds
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      },
      {
        ...product,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
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
    const formData = new FormData();
    // Append basic product data
    formData.append(
      "categoryName",
      Array.isArray(productData.categoryName)
        ? productData.categoryName.map((cat) => cat.categoryName).join(",")
        : productData.categoryName
    );
    formData.append("productName", productData.productName);
    formData.append("productsDescription", productData.productsDescription);
    formData.append("regularPrice", productData.priceTaxIncl || productData.regularPrice?.$numberDecimal);
    formData.append("salePrice", productData.salePriceTaxIncl || productData.salePrice?.$numberDecimal);
    formData.append("discount", productData.disRate || productData.discount?.$numberDecimal || 0);
    
    formData.append("stock", productData.stock);
    formData.append("gender", productData.gender);
    formData.append(
      "best_selling",
      productData.bestSelling === "1" ? "1" : "0"
    );
    formData.append("sku", productData.sku);
    formData.append("quantity", productData.quantity);
    // Handle product sizes
    formData.append(
      "productSize",
      Array.isArray(productData.productSize)
        ? productData.productSize.length > 0
          ? productData.productSize.join(",")
          : "Size is not Available"
        : productData.productSize || "Size is not Available"
    );
    // Handle variations
    formData.append(
      "hasVariations",
      productData.hasVariations && productData.productVariations?.length > 0
        ? "true"
        : "false"
    );
    if (
      productData.hasVariations &&
      productData.productVariations?.length > 0
    ) {
      formData.append(
        "variations",
        JSON.stringify(productData.productVariations)
      );
    } else {
      formData.append("variations", "[]");
    }
    // Handle images
    if (productData.images && Array.isArray(productData.images)) {
      // Handle new image uploads
      productData.images.forEach((img, index) => {
        if (img.file && !img.isExisting) {
          formData.append(`image`, img.file);
        }
      });
      // Handle existing images paths
      const existingImages = productData.images
        .filter((img) => img.isExisting)
        .map((img) => img.path);
      if (existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }
    }
    console.log("Final Payload:", formData);
    const response = await axios.put(
      `https://dev.crystovajewels.com/api/v1/product/update/${productData.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    const data = await response.data;
    console.log('response :>> ', data);
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
      const payload = action.payload;
      console.log("Fetched Product:", payload);
      // Normalize productSize
      if (
        payload?.productSize?.length === 1 &&
        typeof payload.productSize[0] === "string" &&
        payload.productSize[0].includes(",")
      ) {
        payload.productSize = payload.productSize[0]
          .split(",")
          .map((s) => s.trim());
      }
      if (payload?.variations?.length) {
        payload.productVariations =
          payload.variations?.map((variation) => ({
            ...variation,
            regularPrice:
              variation?.regularPrice?.$numberDecimal ??
              variation?.regularPrice ??
              "",
            salePrice:
              variation?.salePrice?.$numberDecimal ??
              variation?.salePrice ??
              "",
            discount:
              variation?.discount?.$numberDecimal ?? variation?.discount ?? "",
          })) ?? [];
      }
      return payload;
    },
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});
export const { newProduct, resetProduct, setSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
