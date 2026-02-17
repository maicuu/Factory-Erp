import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post('/api/products', newProduct);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`/api/products/${id}`);
  return id;
});


const productSlice = createSlice({
  name: 'products',
  initialState: { 
    list: [], 
    status: 'idle', 
    searchTerm: '' 
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((product) => product.id !== action.payload);
      });
  },
});


export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;