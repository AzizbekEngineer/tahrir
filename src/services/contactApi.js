import { API } from "../constants/api";
import { api } from "./index";

export const contactApi = api.injectEndpoints({
    endpoints: (build) => ({
        createContact: build.mutation({
            query: (body) => ({
                url: API.CONTACT,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Contact"],
        })
    }),
});

export const {
    useCreateContactMutation,
} = contactApi;