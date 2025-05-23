import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk('eCommerceApp/order/getOrder', async ({orderId}) => {
if(!orderId) throw new Error('Order Id is missing!');
  
  const response = await axios.get(`https://dev.crystovajewels.com/api/v1/order/get-single/${orderId}`);

  return response.data || null;

});

export const saveOrder = createAsyncThunk('eCommerceApp/order/saveOrder', async (order) => {
  const response = await axios.post('/api/e-commerce-app/order/save', order);
  const data = await response.data;

  return data;
});

const orderSlice = createSlice({
  name: 'eCommerceApp/order',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
