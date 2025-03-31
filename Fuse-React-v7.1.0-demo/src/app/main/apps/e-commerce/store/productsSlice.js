import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
  const response = await axios.get('http://localhost:3000/api/v1/product/get');
  return response.data;
});

export const removeProducts = createAsyncThunk(
  'eCommerceApp/products/removeProducts',
  async (productIds, { dispatch, getState }) => {
    if (Array.isArray(productIds)) {
      // Multi delete API call with JSON body
      await axios.delete('http://localhost:3000/api/v1/product/multi-delete', {
        data: { ids: productIds }
      });
    } else {
      // Single delete API call
      await axios.delete(`http://localhost:3000/api/v1/product/delete/${productIds}`);
    }
    return productIds;
  }
);



const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: 'eCommerceApp/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (value) => ({ payload: value || '' }),
    },    
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
