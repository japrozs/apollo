import { useRouter } from "next/router";
import React, { useState } from "react";
import { Spinner } from "../../components/shared/Spinner";
import {
    useAddProductSuggestionsMutation,
    useGetProductQuery,
} from "../../generated/graphql";
import Image from "next/image";
import Renderer from "@apollo-web/renderer";
import { Navbar } from "../../components/ui/Navbar";
import { ReviewComponent } from "../../components/ui/ReviewComponent";
import { Form, Formik } from "formik";
import { InputField } from "../../components/ui/InputField";
import { Button } from "../../components/ui/Button";
import { useApolloClient } from "@apollo/client";
import "react-responsive-modal/styles.css";
import { EditProduct } from "../../components/ui/EditProduct";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = ({}) => {
    const [featureEditing, setFeatureEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const id =
        typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
    const { data, loading } = useGetProductQuery({
        variables: {
            id,
        },
    });
    const [addSuggestions] = useAddProductSuggestionsMutation();
    const client = useApolloClient();
    return (
        <>
            <Navbar />
            {data ? (
                <>
                    <EditProduct
                        open={open}
                        setOpen={setOpen}
                        product={data.getProduct}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <div className={"product_page_container"}>
                            <div className={"product_page_info"}>
                                <Image
                                    src={data.getProduct.imgUrl}
                                    alt={"Product logo "}
                                    width={100}
                                    height={100}
                                />
                                <div
                                    style={{
                                        alignSelf: "center",
                                    }}
                                >
                                    <h1>{data.getProduct.name}</h1>
                                    <p>{data.getProduct.tagLine}</p>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            margin: "7px 0px",
                                        }}
                                        className={"tags_container"}
                                    >
                                        {data.getProduct.tags.map((tag, i) => (
                                            <p className={"tag"} key={i}>
                                                {tag}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        alignSelf: "stretch",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setOpen(true)}
                                >
                                    <p>📝</p>
                                </div>
                            </div>
                            <p
                                style={{
                                    margin: "10px 0px",
                                    color: "var(--gray-500)",
                                }}
                            >
                                Created by{" "}
                                <span style={{ fontWeight: 500 }}>
                                    @{data.getProduct.creator.username}
                                </span>
                            </p>
                            <div className={"product_feature_container"}>
                                <div className={"product_feature_suggestions"}>
                                    <h1>✨ Feature ideas</h1>
                                    <p
                                        style={{
                                            marginLeft: "auto",
                                            marginRight: 0,
                                            cursor: "pointer",
                                            fontSize: "20px",
                                        }}
                                        onClick={() =>
                                            setFeatureEditing(!featureEditing)
                                        }
                                    >
                                        📝
                                    </p>
                                </div>
                                {featureEditing ? (
                                    <Formik
                                        initialValues={{
                                            suggestions:
                                                data.getProduct.suggestions.join(
                                                    ", "
                                                ),
                                        }}
                                        onSubmit={async (values) => {
                                            await addSuggestions({
                                                variables: {
                                                    id: data.getProduct.id,
                                                    suggestions:
                                                        values.suggestions,
                                                },
                                            });
                                            await client.resetStore();
                                            setFeatureEditing(false);
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <InputField
                                                    name="suggestions"
                                                    placeholder="feature 1, feature 2, feature 3"
                                                    label="Suggestions (seperated by commas)"
                                                />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        flexWrap: "wrap",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <Button
                                                        isLoading={isSubmitting}
                                                        style={{
                                                            marginLeft:
                                                                "0px !important",
                                                            border: "1px solid var(--gray-300)",
                                                        }}
                                                        type={"submit"}
                                                    >
                                                        Update suggestions
                                                    </Button>
                                                    <Button
                                                        style={{
                                                            marginLeft: "15px",
                                                            border: "1px solid var(--gray-300)",
                                                            color: "var(--red-500)",
                                                        }}
                                                        onClick={() =>
                                                            setFeatureEditing(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {data.getProduct.suggestions.map(
                                            (suggestion, i) => (
                                                <p
                                                    className={"suggestion"}
                                                    key={i}
                                                >
                                                    🟣 {suggestion}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            <h1 className={"product_page_description_header"}>
                                📄 Description
                            </h1>
                            <div className={"product_page_description"}>
                                <Renderer
                                    markdown={data.getProduct.description}
                                />
                            </div>
                        </div>
                        <div className={"product_page_right"}>
                            <ReviewComponent product={data.getProduct} />
                        </div>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default ProductPage;
