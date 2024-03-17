import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IListing {
  brokerTitle: string;
  type: string;
  price: number;
  beds: number;
  bath: number;
  propertySqft: number;
  address: string;
  state: string;
  mainAddress: string;
  administrativeAreaLevel2: string;
  locality: string;
  subLocality: string;
  streetName: string;
  longName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export const editListing = createAction<any>("user/editListing");
export const setListings = createAction<any[]>("user/setListings");

const initialState = [] satisfies IListing[] as IListing[];

export const listingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(editListing, (state, action) => {
      const { brokerTitle, address, type, updates } = action.payload;
      const editedListingIndex = state.findIndex(
        (listing) =>
          listing.address === address &&
          listing.type === type &&
          listing.brokerTitle === brokerTitle
      );
      const newState = state;
      newState[editedListingIndex] = {...updates};

      return newState
    })
    .addCase(setListings, (state, action) => {
      return (state = [...state, ...action.payload]);
    });
});
