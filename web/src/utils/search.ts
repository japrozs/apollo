import { GetUserProductsQuery } from "../generated/graphql";

export const search = (query: string, data: GetUserProductsQuery) => {
    const arr = data.getUserProducts.filter((p) =>
        p.name.toLowerCase().trim().includes(query.toLowerCase().trim())
    );
    console.log(arr);
    return arr;
};
