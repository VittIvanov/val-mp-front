import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsIds, getProductsDetails, filterProductsByPrice } from './api'; // Подключаем нужные функции из API
import { ProductsState } from './types'; // Импортируем типы состояния
import { I_ProductsDetails } from '../types'; // Импортируем типы продуктов

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Создаем асинхронные санки для получения и фильтрации продуктов
export const fetchProductsIds = createAsyncThunk<string[], { offset: number; limit: number }>(
  'products/fetchProductsIds',
  async ({ offset, limit }) => {
    const response = await getProductsIds(offset, limit); // Вызываем соответствующую функцию из API
    return response.result; // Возвращаем результат
  }
);

export const fetchProductDetails = createAsyncThunk<I_ProductsDetails[], string[]>(
  'products/fetchProductDetails',
  async (ids) => {
    const response = await getProductsDetails(ids); // Вызываем соответствующую функцию из API
    return response.result; // Возвращаем результат
  }
);

export const filterProducts = createAsyncThunk<string[], number>(
  'products/filterProducts',
  async (price) => {
    const response = await filterProductsByPrice(price); // Вызываем соответствующую функцию из API
    return response.result; // Возвращаем результат
  }
);

// Создаем срез состояния и редукторы для обработки событий
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = []; // Очищаем список продуктов
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsIds.pending, (state) => {
        state.loading = true; // Устанавливаем состояние загрузки
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(fetchProductsIds.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.products = []; // Обновляем список продуктов (в вашем случае пустой, но это может измениться)
      })
      .addCase(fetchProductsIds.rejected, (state, action) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.error = action.error.message || 'Failed to fetch product ids'; // Устанавливаем сообщение об ошибке
      })
      .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<I_ProductsDetails[]>) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.products = action.payload; // Обновляем список продуктов
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.error = action.error.message || 'Failed to fetch product details'; // Устанавливаем сообщение об ошибке
      })
      .addCase(filterProducts.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.products = []; // Обновляем список продуктов (в вашем случае пустой, но это может измениться)
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.loading = false; // Сбрасываем состояние загрузки
        state.error = action.error.message || 'Failed to filter products'; // Устанавливаем сообщение об ошибке
      });
  },
});

export const { clearProducts } = productsSlice.actions; // Экспортируем экшены

export default productsSlice.reducer; // Экспортируем редюсер
