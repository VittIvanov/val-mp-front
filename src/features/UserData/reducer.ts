
import { createAction, createReducer } from "@reduxjs/toolkit"
import { T_AppThunk } from "../../store/types"
import { I_UserData } from "./types"

const initialState: I_UserData = {
  id: null,
  login: null,
  email: null,
  phone: null,
  nameFirst: null,
  nameLast: null,
  namePatronymic: null,
  diaplayName: null,
  birthdate: null,
  gender: null,
}

const setUserdataAction = createAction<I_UserData>('USER_DATA/set')

const userDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    setUserdataAction,
    (_, action) => action.payload
  )
})

export const setUserData = (userData: I_UserData): T_AppThunk => (dispatch) => {
  dispatch(setUserdataAction(userData))
}

export default userDataReducer
