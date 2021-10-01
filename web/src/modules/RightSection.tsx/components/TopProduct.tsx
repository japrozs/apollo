import React, { useState } from "react";
import Image from "next/image";
import { useTopProductQuery } from "../../../generated/graphql";
import { PRODUCT_IMAGE_HEIGHT, PRODUCT_IMAGE_WIDTH } from "../../../constants";
import { Spinner } from "../../../components/shared/Spinner";
import { getReviewPreviewList } from "../../../utils/getReviewPreviewList";
import { ProductTags } from "../../MiddleSection/components/ProductTags";
import { useRouter } from "next/router";

interface TopProductProps {}

export const TopProduct: React.FC<TopProductProps> = ({}) => {
    const { data, loading } = useTopProductQuery();
    const router = useRouter();
    return (
        <div
            className={"top_product_container"}
            onClick={() => {
                router.push(`/product/${data.topProduct.id}`);
            }}
        >
            {data ? (
                <>
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
                            src={data.topProduct.imgUrl}
                            alt={"Product Image"}
                            width={PRODUCT_IMAGE_WIDTH}
                            height={PRODUCT_IMAGE_HEIGHT}
                            className={"product__image"}
                        />
                        <h1 className={"product__name"}>
                            {data.topProduct.name}
                        </h1>
                    </div>
                    <p className={"product__tagLine"}>
                        {data.topProduct.tagLine}
                    </p>
                    <div className="product__info">
                        {getReviewPreviewList(data.topProduct.reviews).map(
                            (rev) => (
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
                            )
                        )}
                        {getReviewPreviewList(data.topProduct.reviews).length ==
                        0 ? (
                            <p>{data.topProduct.reviews.length} 💬</p>
                        ) : (
                            <p style={{ marginLeft: 10 }}>
                                {data.topProduct.reviews.length} 💬
                            </p>
                        )}
                    </div>
                    <ProductTags product={data.topProduct} />
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
