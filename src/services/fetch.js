import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FetchApi = createApi({
  reducerPath: "FetchApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://raw.githubusercontent.com/openfootball/football.json/master/2020-21",
  }),
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/en.1.json",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllPostQuery } = FetchApi;
