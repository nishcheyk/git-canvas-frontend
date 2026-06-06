import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RTK Query API slice for async network operations interfacing with the FastAPI backend.
 * Provides caching, automatic retries, and request synchronization.
 */
export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  }),
  tagTypes: ['Universe'],
  endpoints: (builder) => ({
    /**
     * Queries the FastAPI backend to fetch user profile, stats, and mapped planets.
     * @param {string} username - GitHub username to query.
     */
    getUniverseByUsername: builder.query({
      query: (username) => `/api/github/${username}`,
      providesTags: (result, error, username) => [{ type: 'Universe', id: username }],
    }),
  }),
});

// Export auto-generated hooks for components
export const { useGetUniverseByUsernameQuery } = githubApi;
