import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

import { I_Favorites } from "./types"

const initialState: I_Favorites = []

const addToFavoritesAction = createAction<number>('FAVORITES/add')
const removeFromFavoritesAction = createAction<number>('FAVORITES/remove')

const favoritesReducer = createReducer(initialState, (builder) => {
  //Add to favoites
  builder.addCase(
    addToFavoritesAction,
    (state: any, action: PayloadAction<number>) => {
      return Array.from(new Set([...state, action.payload]))
    }
  )

  // Remove from favorites
  builder.addCase(
    removeFromFavoritesAction,
    (state: any, action: PayloadAction<number>) => {
      return state.filter((favoiteId: number) => favoiteId !== action.payload)
    }
  )
})

export const addToFavorites = (favoriteId: number): PayloadAction<number> => {
  return addToFavoritesAction(favoriteId);
}

export const removeFromFavorites = (favoriteId: number): PayloadAction<number> => {
  return removeFromFavoritesAction(favoriteId);
}

// export const addToFavorites = (favoriteId: number) => {
//   return addToFavoritesAction(favoriteId);
// };

// export const removeFromFavorites = (favoriteId: number) => {
//   return removeFromFavoritesAction(favoriteId);
// };

export default favoritesReducer
