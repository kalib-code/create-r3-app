import { AxiosInstance } from "axios";
import { stringify } from "query-string";
import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";



export const nextDataProvider = (apiUrl: string, httpClient: AxiosInstance = axiosInstance): DataProvider => ({
    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;
        const { data } = await axiosInstance.post(url, variables);
        return { data };
    },
    getList: async ({ resource, pagination, filters, sorters }) => {
        const url = `${apiUrl}/${resource}`;

        const {
            current = 1,
            pageSize = 10,
            mode = "server",
        } = pagination ?? {};

        const queryFilters = generateFilter(filters);

        const query: {
            _page?: number;
            _limit?: number;
            _sort?: string;
            _order?: string;
        } = {};

        if (mode === "server") {
            query._page = current;
            query._limit = pageSize;
        }

        const generatedSort = generateSort(sorters);
        if (generatedSort) {
            const { _sort, _order } = generatedSort;
            query._sort = _sort.join(",");
            query._order = _order.join(",");
        }

        const { data, headers } = await httpClient.get(
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );



        const total = +headers["x-total-count"];

        return {
            data,
            total: total || data.length,
        };
    },
    update: async ({ resource, id, variables, meta }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, variables);

        return {
            data,
        };
    },
    deleteOne: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url, {
            data: variables,
        });

        return {
            data,
        };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;
        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },
    getApiUrl: () => apiUrl,
    getMany: async ({ resource, ids }) => {
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

        return {
            data,
        };
    },
    createMany: ({ resource, variables, meta }) => Promise.resolve({} as any),
    deleteMany: ({ resource, ids, variables, meta }) => Promise.resolve({} as any),
    updateMany: ({ resource, ids, variables, meta }) => Promise.resolve({} as any)
});
