import React from "react";
import { Spinner } from "../../components/shared/Spinner";
import { useGetUserProductsQuery } from "../../generated/graphql";
import { ProductCard } from "./components/ProductCard";

interface MiddleSectionProps {}

export const MiddleSection: React.FC<MiddleSectionProps> = ({}) => {
    const { data, loading } = useGetUserProductsQuery();
    console.log(data);
    return (
        <div className={"middle_section_container"} style={{ padding: "10px" }}>
            <h1 className={"middle_section_header"}>🚀 Your Products</h1>
            <input
                placeholder={"Search for a product"}
                className={"middle_input"}
            />
            {data ? (
                data.getUserProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};
