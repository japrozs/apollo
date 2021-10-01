import React, { useEffect, useState } from "react";
import { GetUserProductsQuery } from "../../../generated/graphql";

interface ProductTagsProps {
    product: GetUserProductsQuery["getUserProducts"][0];
}

export const ProductTags: React.FC<ProductTagsProps> = ({ product }) => {
    console.log(product.tags);
    return (
        <div className={"product_tags_container"}>
            {product.tags.map((tag, idx) => (
                <p key={idx} className="product_tag">
                    {tag}
                </p>
            ))}
        </div>
    );
};
