/**
 * @jest-environment jsdom
 */
/* global jest, describe, it, expect */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import ProductionDashboard from './ProductionDashboard';
import productReducer from '../features/products/productSlice';
import materialReducer from '../features/materials/materialSlice';

jest.mock('axios');

const store = configureStore({
  reducer: {
    products: productReducer,
    materials: materialReducer
  }
});

describe('ProductionDashboard Component', () => {
  it('should render the logic of optimized profit correctly', async () => {
    
    axios.get.mockImplementation((url) => {
      if (url.includes('/availability')) {
        return Promise.resolve({ 
          data: [{ productId: 1, productName: 'Test Product', maxPossible: 10 }] 
        });
      }
      if (url.includes('/optimized-suggestion')) {
        return Promise.resolve({ 
          data: { 
            items: [{ productName: 'Test Product', quantity: 10, margin: 25.5 }],
            totalPotentialValue: 1500.0,
            totalPotentialProfit: 1500.0 
          } 
        });
      }
      return Promise.reject(new Error('not found'));
    });

    render(
      <Provider store={store}>
        <ProductionDashboard />
      </Provider>
    );

    // 1. Verifica o loading inicial
    expect(screen.getByText(/Sincronizando/i)).toBeInTheDocument();

    // 2. Espera a UI principal carregar
    await waitFor(() => {
      expect(screen.getByText(/Inteligência de Negócio/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // 3. Verifica se o produto apareceu 
    await waitFor(() => {
      const productNames = screen.getAllByText(/Test Product/i);
      expect(productNames.length).toBeGreaterThan(0);
    });

    // 4. Verifica a quantidade (10) que vem do mock
    
    const quantityElements = screen.getAllByText(/10/);
    expect(quantityElements.length).toBeGreaterThan(0);
    
    // 5. Verifica se a margem (25.5) apareceu
    expect(screen.getByText(/25.5/)).toBeInTheDocument();
  });
});