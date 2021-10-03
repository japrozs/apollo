import React, { useState } from "react";
import { Spinner } from "../../components/shared/Spinner";
import { useGetUserProductsQuery } from "../../generated/graphql";
import { search } from "../../utils/search";
import { ProductCard } from "./components/ProductCard";

interface MiddleSectionProps {}

export const MiddleSection: React.FC<MiddleSectionProps> = ({}) => {
    const { data, loading } = useGetUserProductsQuery();
    const [searchQuery, setSearchQuery] = useState("");
    console.log(data);
    return (
        <div className={"middle_section_container"} style={{ padding: "10px" }}>
            <h1 className={"middle_section_header"}>🚀 Your Products</h1>
            <input
                placeholder={"Search for a product"}
                className={"middle_input"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {data &&
                searchQuery.length == 0 &&
                data.getUserProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            {loading && <Spinner />}

            {data && data.getUserProducts.length == 0 && (
                <p>
                    You don{"'"}t have any products. Create a new product to get
                    started.
                </p>
            )}

            {data &&
                searchQuery.length != 0 &&
                search(searchQuery, data).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            {data &&
                searchQuery.length != 0 &&
                search(searchQuery, data).length == 0 && (
                    <p>your search yielded no results</p>
                )}
        </div>
    );
};
