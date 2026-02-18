import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import materialReducer from '../features/materials/materialSlice'; 
import componentReducer from '../features/components/componentSlice'; 

export const store = configureStore({
  reducer: {
    products: productReducer,
    materials: materialReducer,   
    components: componentReducer, 
  },
});