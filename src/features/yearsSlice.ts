import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface YearsState {
  years: number[];
  activeYear: number;
}

const initialState: YearsState = {
  years: [2023, 2024, 2025],
  activeYear: 2023,
};

export const yearsSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    addYear: (state, action: PayloadAction<number>) => {
      const years = state.years;
      years.push(action.payload);
      state.years = years.sort((a, b) => a - b);
    },
    chooseYear: (state, action: PayloadAction<number>) => {
      state.activeYear = action.payload;
    },
  },
});

export const { addYear, chooseYear } = yearsSlice.actions;

export const selectYears = (state: RootState) => state.years.years;
export const selectActiveYear = (state: RootState) => state.years.activeYear;

export default yearsSlice.reducer;
