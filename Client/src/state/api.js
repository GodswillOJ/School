import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:'https://gotech-ecommerce.onrender.com/api' }),
  reducerPath: 'api',
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ['User']
    })
  })
})

export const {
  useGetUserQuery,
} = api;



