import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gotech-ecommerce.onrender.com/api' }),
  reducerPath: 'api',
  tagTypes: [
    'User',
    'Products',
    'Customers', 
    'Cart', 
    'Profile', 
    'OrderNew', 
    'OrderView', 
    'Transactions', 
    'Geography', 
    'Dashboard', 
    'ClientDashboard', 
    'OverallStats', 
    'Overview', 
    'Daily', 
    'Monthly',
    'ClientMonthly',
    'ClientDaily',
    'ClientBreakdown',
    'Breakdown',
    'GeographyClient',
    'ClientBreakdown',
  ],
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

    // state/api.js
    getTransactions: build.query({
      query: ({ page, limit, sortField, sortOrder }) => 
        `/user/view_transactions?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
      providesTags: ['Transactions'],
    }),

    getGeography: build.query({
      query: () => '/user/geography',
      providesTags: ['Geography'],
    }),

    getGeographyClient: build.query({
      query: () => '/user/geography_c"',
      providesTags: ['GeographyClient'],
    }),

    getDashboard: build.query({
      query: () => '/user/dashboard',
      providesTags: ['Dashboard'],
    }),

    getClientDashboard: build.query({
      query: () => '/user/clientDashboard',
      providesTags: ['ClientDashboard'],
    }),

    getOverallStats: build.query({
      query: () => '/overall_stats',
      providesTags: ['OverallStats'],
    }),

    getOverview: build.query({
      query: () => '/overview',
      providesTags: ['Overview'],
    }),

    getDaily: build.query({
      query: () => '/daily',
      providesTags: ['Daily'],
    }),

    getClientDaily: build.query({
      query: () => '/user/daily',
      providesTags: ['ClientDaily'],
    }),

    getMonthly: build.query({
      query: () => '/monthly',
      providesTags: ['Monthly'],
    }),

    getClientMonthly: build.query({
      query: () => '/user/monthly',
      providesTags: ['ClientMonthly'],
    }),

    getBreakdown: build.query({
      query: () => '/breakdown',
      providesTags: ['Breakdown'],
    }),

    getClientBreakdown: build.query({
      query: () => '/user/breakdown',
      providesTags: ['ClientBreakdown'],
    }),


    addOverallStat: build.mutation({
      query: (newStat) => ({
        url: '/add_stat',
        method: 'POST',
        body: newStat,
      }),
      invalidatesTags: ['OverallStats'],
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
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetDashboardQuery,
  useGetClientDashboardQuery,
  useGetOverallStatsQuery,
  useAddOverallStatMutation,
  useGetOverviewQuery,
  useGetDailyQuery,
  useGetClientDailyQuery,
  useGetMonthlyQuery,
  useGetClientMonthlyQuery,
  useGetBreakdownQuery,
  useGetClientBreakdownQuery,
  useGetGeographyClientQuery,
} = api;
