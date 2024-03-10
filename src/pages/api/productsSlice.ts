import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { I_ProductsDetails } from "../types"
import { T_RootState } from "../../store/types"

// Определяем типы для фильтров
interface FilterType {
}

// Интерфейс состояния страницы продуктов
interface ProductPageState {
  products: I_ProductsDetails[]
  currentPage: number
  filters: FilterType
}

const initialState: ProductPageState = {
  products: [],
  currentPage: 1,
  filters: {},
};

const productPageSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<I_ProductsDetails[]>) {
      state.products = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  }
});

export const { setProducts, setCurrentPage } = productPageSlice.actions

export const selectProductPage = (state: T_RootState) => state.productPage

export default productPageSlice.reducer;
