import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './services/githubApi';
import universeReducer from './slices/universeSlice';

/**
 * Global Redux Toolkit Store configured with RTK query API middleware.
 */
export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    universe: universeReducer,
  },
  // Add API caching and lifecycle middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
