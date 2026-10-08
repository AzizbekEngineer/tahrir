import { API } from "../constants/api";
import { api } from "./api";

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: (params) => ({
                url: API.PRODUCTS,
                params,
            }),
            providesTags: ["Product"],
        }),

        getProductById: build.query({
            query: (id) => ({
                url: `${API.PRODUCTS}/${id}`,
            }),
            providesTags: ["Product"],
        }),

        SearchProducts: build.query({
            query: (params) => ({
                url: `${API.PRODUCTS}/search`,
                method: "GET",
                params,
            }),
            invalidatesTags: ["Product"],
        }),

        SearchAllProducts: build.query({
            query: (params) => ({
                url: `${API.PRODUCTS}/part/search`,
                method: "GET",
                params,
            }),
            invalidatesTags: ["Product"],
        }),

        createProduct: build.mutation({
            query: (body) => ({
                url: API.PRODUCTS,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Product"],
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url: `${API.PRODUCTS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),

        updateProduct: build.mutation({
            query: ({ id, body }) => ({
                url: `${API.PRODUCTS}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Product"],
        }),

    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useSearchProductsQuery,
    useSearchAllProductsQuery,
} = productApi;