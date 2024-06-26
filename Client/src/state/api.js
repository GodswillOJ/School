import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gotech-ecommerce.onrender.com/api' }),
  reducerPath: 'api',
  tagTypes: ['User', 'Products', 'Customers', 'Cart', 'Profile', 'OrderNew', 'OrderView'],
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

    // getting customers API
    getCustomers: build.query({
      query: () => '/user/customers',
      providesTags: ['Customers'],
    }),

    // Transactions
    // Carts
    getCart: build.query({
      query: () => '/user/cart',
      providesTags: ['Cart'],
    }),

    // Profile
    getProfile: build.query({
      query: () => '/user/profile',
      providesTags: ['Profile'],
    }),

    // Order product
    getOrderNew: build.query({
      query: () => '/user/order_new',
      providesTags: ['OrderNew'],
    }),

    getOrderView: build.query({
      query: (userID) => `/user/view_order/${userID}`,
      providesTags: ['OrderView'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetCartQuery,
  useGetProfileQuery,
  useGetOrderNewQuery,
  useGetOrderViewQuery,
} = api;
