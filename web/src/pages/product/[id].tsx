import { useRouter } from "next/router";
import React from "react";
import { Spinner } from "../../components/shared/Spinner";
import { useGetProductQuery } from "../../generated/graphql";
import Image from "next/image";
import Renderer from "@apollo/renderer";
import { Navbar } from "../../components/ui/Navbar";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = ({}) => {
    const router = useRouter();
    const id =
        typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
    const { data, loading } = useGetProductQuery({
        variables: {
            id,
        },
    });
    return (
        <>
            <Navbar />
            {data ? (
                <div className={"product_page_container"}>
                    <div className={"product_page_info"}>
                        <Image
                            src={data.getProduct.imgUrl}
                            alt={"Product logo "}
                            width={100}
                            height={100}
                        />
                        <div>
                            <h1>{data.getProduct.name}</h1>
                            <p>{data.getProduct.tagLine}</p>
                        </div>
                    </div>
                    <p style={{ marginTop: 5, color: "var(--gray-500)" }}>
                        Created by @{data.getProduct.creator.username}
                    </p>
                    <h1 className={"product_page_description_header"}>
                        Description
                    </h1>
                    <div className={"product_page_description"}>
                        <Renderer markdown={data.getProduct.description} />
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default ProductPage;
