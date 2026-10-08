import { API } from "../constants/api";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({

        getCategories: build.query({
            query: (params) => ({
                url: API.CATEGORIES,
                params,
            }),
            providesTags: ["Categories"],
        }),

        getCategoriesById: build.query({
            query: (id) => ({
                url: `${API.CATEGORIES}/${id}`,
            }),
            providesTags: ["Categories"],
        }),

        createCategories: build.mutation({
            query: (body) => ({
                url: API,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),

        deleteCategories: build.mutation({
            query: (id) => ({
                url: `${API.CATEGORIES}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),

        updateCategories: build.mutation({
            query: ({ id, body }) => ({
                url: `${API.CATEGORIES}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),

    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoriesByIdQuery,
    useCreateCategoriesMutation,
    useDeleteCategoriesMutation,
    useUpdateCategoriesMutation,
} = categoryApi;