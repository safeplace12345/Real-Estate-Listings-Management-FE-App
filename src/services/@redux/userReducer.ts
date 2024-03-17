import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IFav {
  brokerTitle: string;
  type: string;
  address: string;
}

export interface IUser {
  uid: string;
  name: string;
  email: string;
  token: string;
  favorites?: any[];
}

export const loginAction = createAction<IUser>("user/login");
export const logOutAction = createAction("user/logout");
export const signInAction = createAction<IUser>("user/signIn");
export const getUserAction = createAction<IUser>("user/getUser");
export const addToFavList = createAction<IFav[]>("user/addToFavList");
export const deleteFromFavList = createAction<number>("user/deleteFromFavList");

const initialState = {
  uid: "",
  name: "",
  email: "",
  token: "",
  favorites: [],
} satisfies IUser as IUser;

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginAction, (state, action) => {
      return state = { ...state, ...action.payload }
    })
    .addCase(logOutAction, (state, action) => {
      return initialState
    })
    .addCase(signInAction, (state, action) => {
      return state = { ...state, ...action.payload }
    })
    .addCase(getUserAction, (state, action) => {
      return state = { ...state, ...action.payload }
    })
    .addCase(addToFavList, (state, action) => {
      if(state.favorites) {
        const newState = {...state, favorites: [...action.payload]}
        return newState
      }
      return state
    })
    .addCase(deleteFromFavList, (state, action) => {
      if(state.favorites) {
        const newFavState = state.favorites.filter(
          (_, i) => i !== action.payload);

        return state = {...state, favorites: newFavState}
      }
      return state
    });
});
