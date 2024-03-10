import { combineReducers } from "@reduxjs/toolkit"

import app from 'features/App/reducer'
import userData from 'features/UserData/reducer'
import favorites from 'features/Favorites/reducer'
import productPageReducer from "../pages/api/productsSlice" // Изменено на productPageReducer

export default combineReducers({
  app,
  userData,
  favorites,
  productPage: productPageReducer // Здесь используется имя переменной, содержащей редюсер из слайса
})
