import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gotech-ecommerce.onrender.com/api' }),
  reducerPath: 'api',
  tagTypes: ['User', 'Products'],
  endpoints: (build) => ({
    // getting user API
    getUser: build.query({
      query: (id) => `user/${id}`,
      transformResponse: (response, meta) => {
        if (meta.response.status === 404) {
          throw new Error('User not found');
        }
        return response;
      },
      providesTags: ['User'],
    }),

    // getting products API
    getProducts: build.query({
      query: () => '/user/products',
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
} = api;
