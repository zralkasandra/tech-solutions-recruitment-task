import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import type {
  TeleComService,
  TeleComPackage,
} from "types/telecomunicationService";
import teleComServices from "data/defaultTeleComServices";
import teleComPackages from "data/defaultTeleComPackages";
import {
  addTeleComServiceToCart,
  removeTeleComServiceFromCart,
  updatePrices,
} from "helpers/teleComServices";

export interface TeleComServiceState {
  teleComServices: TeleComService[];
  teleComPackages: TeleComPackage[];
  chosenTeleComServices: string[];
  error: string;
}

const initialState: TeleComServiceState = {
  teleComServices,
  teleComPackages,
  chosenTeleComServices: [],
  error: "",
};

export const teleComServicesSlice = createSlice({
  name: "teleComService",
  initialState,
  reducers: {
    addTeleComService: (state, action: PayloadAction<TeleComService>) => {
      state.teleComServices.push(action.payload);
    },
    toggleTeleComServiceInCart: (
      state,
      action: PayloadAction<{ teleComService: TeleComService }>
    ) => {
      state.error = "";
      const { teleComService } = action.payload;
      if (state.chosenTeleComServices.includes(teleComService.id)) {
        const { error, selectedServices } = removeTeleComServiceFromCart(
          teleComService,
          state.chosenTeleComServices,
          state.teleComServices
        );
        state.error = error;
        state.chosenTeleComServices = selectedServices;
      } else {
        const { error, selectedServices } = addTeleComServiceToCart(
          teleComService,
          state.chosenTeleComServices,
          state.teleComServices
        );
        state.error = error;
        state.chosenTeleComServices = selectedServices;
      }
    },
    updateTeleComServicePrices: (
      state,
      action: PayloadAction<{
        year: number;
        prices: { id: string; price: number }[];
      }>
    ) => {
      state.teleComServices = updatePrices(
        state.teleComServices,
        action.payload.prices,
        action.payload.year
      );
    },
    updateTeleComPackagePrices: (
      state,
      action: PayloadAction<{
        year: number;
        prices: { id: string; price: number }[];
      }>
    ) => {
      state.teleComPackages = updatePrices(
        state.teleComPackages,
        action.payload.prices,
        action.payload.year
      );
    },
  },
});

export const {
  addTeleComService,
  toggleTeleComServiceInCart,
  updateTeleComPackagePrices,
  updateTeleComServicePrices,
} = teleComServicesSlice.actions;

export const selectTeleComServices = (state: RootState) =>
  state.teleComServices.teleComServices;
export const selectTeleComPackages = (state: RootState) =>
  state.teleComServices.teleComPackages;
export const selectChosenTeleComServices = (state: RootState) =>
  state.teleComServices.chosenTeleComServices;
export const selectError = (state: RootState) => state.teleComServices.error;

export default teleComServicesSlice.reducer;
