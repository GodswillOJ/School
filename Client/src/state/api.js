import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'https://gotech-ecommerce.onrender.com/api',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
  validateStatus: (response, result) => {
    return response.status >= 200 && response.status < 300;
  },
});

export const api = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await customFetchBaseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 404) {
      result.error.message = 'User not found';
    } else if (result.error && result.error.status >= 500) {
      result.error.message = 'Server error. Please try again later.';
    }
    return result;
  },
  reducerPath: 'api',
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = api;
