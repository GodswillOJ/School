import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Custom base query to handle non-JSON responses
const customFetchBaseQuery = async (args, api, extraOptions) => {
  const rawResponse = await fetchBaseQuery(args, api, extraOptions);

  // Check if the response is JSON
  const contentType = rawResponse.meta.response.headers.get('Content-Type');
  let response;
  if (contentType && contentType.includes('application/json')) {
    response = await rawResponse.data.json();
  } else {
    response = await rawResponse.data.text(); // Handle non-JSON response as text
  }

  // Check for HTTP errors
  if (!rawResponse.meta.response.ok) {
    throw new Error(response || 'Something went wrong');
  }

  return { data: response, meta: rawResponse.meta };
};

export const api = createApi({
  baseQuery: customFetchBaseQuery({ baseUrl: 'https://gotech-ecommerce.onrender.com/api' }),
  reducerPath: 'api',
  tagTypes: ['User'],
  endpoints: (build) => ({
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
  }),
});

export const { useGetUserQuery } = api;
