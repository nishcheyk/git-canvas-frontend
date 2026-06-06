import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlanet: null,
  searchUsername: '',
};

/**
 * Redux Toolkit slice managing frontend-only UI state variables
 * (e.g. selected planetary object highlights, current search query).
 */
const universeSlice = createSlice({
  name: 'universe',
  initialState,
  reducers: {
    /**
     * Highlights a specific planet and opens its side HUD inspector.
     */
    setSelectedPlanet: (state, action) => {
      state.selectedPlanet = action.payload;
    },
    /**
     * Clears highlights (closes side panel).
     */
    clearSelectedPlanet: (state) => {
      state.selectedPlanet = null;
    },
    /**
     * Stores the current active username.
     */
    setSearchUsername: (state, action) => {
      state.searchUsername = action.payload;
    },
    /**
     * Resets local UI states on navigating back.
     */
    resetUniverse: (state) => {
      state.selectedPlanet = null;
      state.searchUsername = '';
    },
  },
});

export const {
  setSelectedPlanet,
  clearSelectedPlanet,
  setSearchUsername,
  resetUniverse,
} = universeSlice.actions;

export default universeSlice.reducer;
