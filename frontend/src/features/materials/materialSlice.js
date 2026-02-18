import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; 

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
  
  const response = await api.get('/materials'); 
  return response.data;
});

export const addMaterial = createAsyncThunk('materials/addMaterial', async (newMaterial) => {
  const response = await api.post('/materials', newMaterial);
  return response.data;
});

export const deleteMaterial = createAsyncThunk(
  'materials/deleteMaterial', 
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/materials/${id}`);
      return id;
    } catch (err) {
      const message = err.response?.data || "Error deleting material";
      return rejectWithValue(message);
    }
  }
);

const materialSlice = createSlice({
  name: 'materials',
  initialState: {
    list: [],
    status: 'idle',
    searchTerm: ''
  },
  reducers: {
    setSearchMaterialTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.list = state.list.filter((m) => m.id !== action.payload);
      });
  },
});

export const { setSearchMaterialTerm } = materialSlice.actions;
export default materialSlice.reducer;