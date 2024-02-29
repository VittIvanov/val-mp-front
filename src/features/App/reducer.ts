import { createSlice, Dispatch, isAction } from "@reduxjs/toolkit"

import { T_AppThunk, T_Reducer } from 'store/types'
import { I_AppStore } from './types'

const initialState: I_AppStore = {
  isLogged: true,
  isAppLoading: false,
}

export const isLoggedReducer: T_Reducer<I_AppStore, boolean> = (state, action) => {
  state.isLogged = action.payload
}

export const isAppLoadingReducer: T_Reducer<I_AppStore, boolean> = (state, action) => {
  state.isAppLoading = action.payload
}

const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    isLogged: isLoggedReducer,
    isAppLoading: isAppLoadingReducer,
  },
})

const {
  isLogged: setIsLoggedAction,
  isAppLoading: setIsAppLodingAction,
} = appSlice.actions

export const setIsLogged = (isLogged: boolean): T_AppThunk => (dispatch: Dispatch) => {
  dispatch(setIsLoggedAction(isLogged))
}


export const setIsAppLoding = (isLogged: boolean): T_AppThunk => (dispatch: Dispatch) => {
  dispatch(setIsAppLodingAction(isLogged))
}

export default appSlice.reducer
