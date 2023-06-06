import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [ "User","transactions","anasayfa","profits"],
    endpoints: (build) => ({
        getUser:build.query({
            query: (id) => `general/user/${id}`,
            providesTags:["User"]
        }),
        getTransactions: build.query({
            query: ({ page, sort, search }) => ({
              url: "client/alimsatimgecmisim",
              method: "GET",
              params: { page, sort, search },
            }),
            providesTags: ["transactions"],
          }),
          getOhlc: build.query({
            query: () => ({
              url: "management/anasayfa",
              method: "GET",
             
            
            }),
            providesTags: ["anasayfa"],
          }),
          getProfits: build.query({
            query: () => ({
              url: "general/profits",
              method: "GET",
            
            }),
            providesTags: ["profits"],
          }),
          getArticles: build.query({
            query: (search) => ({
              url: "general/news",
              method: "GET",
            }),
            providesTags: ["articles"],
          }),
        
    })
})


export const{useGetUserQuery,useGetTransactionsQuery,useGetOhlcQuery,useGetProfitsQuery,useGetArticlesQuery}=api;