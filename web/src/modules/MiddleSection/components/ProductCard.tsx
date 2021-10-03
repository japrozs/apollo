import React from "react";
import Image from "next/image";
import { GetUserProductsQuery } from "../../../generated/graphql";
import { PRODUCT_IMAGE_HEIGHT, PRODUCT_IMAGE_WIDTH } from "../../../constants";
import { getReviewPreviewList } from "../../../utils/getReviewPreviewList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { timeSinceShort } from "../../../utils/timeSince";
import { ProductTags } from "./ProductTags";
import { useRouter } from "next/router";

interface ProductCardProps {
    product: GetUserProductsQuery["getUserProducts"][0];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    return (
        <div className={"productcard__container"}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "0px !important",
                    padding: "0px !important",
                }}
            >
                <Image
                    src={product.imgUrl}
                    alt={"Product Image"}
                    width={PRODUCT_IMAGE_WIDTH}
                    height={PRODUCT_IMAGE_HEIGHT}
                    className={"product__image"}
                    onClick={() => {
                        router.push(`/product/${product.id}`);
                    }}
                />
                <h1
                    className={"product__name truncate"}
                    onClick={() => {
                        router.push(`/product/${product.id}`);
                    }}
                >
                    {product.name}
                </h1>
                <MoreVertIcon
                    style={{
                        alignSelf: "center",
                        marginLeft: "auto",
                        marginRight: 0,
                        fontSize: 25,
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        alert("feature to be added");
                    }}
                />
            </div>
            <p
                className={"product__tagLine"}
                onClick={() => {
                    router.push(`/product/${product.id}`);
                }}
            >
                {product.tagLine}
            </p>
            <div
                className="product__info"
                onClick={() => {
                    router.push(`/product/${product.id}`);
                }}
            >
                {getReviewPreviewList(product.reviews).map((rev) => (
                    <>
                        <Image
                            className={"product__info__img"}
                            key={rev.id}
                            src={rev.creator.avatarUrl}
                            width={30}
                            height={30}
                            alt={"Avatar"}
                        />
                        <div style={{ marginRight: 3 }}></div>
                    </>
                ))}
                {getReviewPreviewList(product.reviews).length == 0 ? (
                    <p>{product.reviews.length} 💬</p>
                ) : (
                    <p style={{ marginLeft: 10 }}>
                        {product.reviews.length} 💬
                    </p>
                )}
                <div
                    className={"product_tags_container"}
                    onClick={() => {
                        router.push(`/product/${product.id}`);
                    }}
                >
                    <ProductTags product={product} />
                </div>
            </div>
        </div>
    );
};
