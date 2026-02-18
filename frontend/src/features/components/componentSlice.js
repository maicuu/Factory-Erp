import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api'; 

export const fetchComponentsByProduct = createAsyncThunk(
  'components/fetchByProduct',
  async (productId) => {
    
    const response = await api.get(`/components/product/${productId}`);
    return response.data;
  }
);

export const addComponent = createAsyncThunk(
  'components/addComponent',
  async (newComponent) => {
    const response = await api.post('/components', newComponent);
    return response.data;
  }
);

export const deleteComponent = createAsyncThunk(
  'components/deleteComponent',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/components/${id}`);
      return id;
    } catch (err) {
      const message = err.response?.data || "Error deleting component";
      return rejectWithValue(message);
    }
  }
);

const componentSlice = createSlice({
  name: 'components',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComponentsByProduct.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addComponent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteComponent.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export default componentSlice.reducer;