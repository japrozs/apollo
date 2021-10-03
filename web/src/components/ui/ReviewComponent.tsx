import React from "react";
import {
    GetProductQuery,
    useCreateReviewMutation,
    useMeQuery,
} from "../../generated/graphql";
import Image from "next/image";
import { timeSinceShort } from "../../utils/timeSince";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { useApolloClient } from "@apollo/client";

interface ReviewComponentProps {
    product: GetProductQuery["getProduct"];
}

export const ReviewComponent: React.FC<ReviewComponentProps> = ({
    product,
}) => {
    const { data, loading } = useMeQuery();
    const [createReview] = useCreateReviewMutation();
    const client = useApolloClient();
    console.log(product);
    return (
        <div className={"review_box"}>
            <h1>💬 Reviews</h1>
            {data && !loading && (
                <div className={"submit_review_container"}>
                    <h1 style={{ fontSize: "21px" }}>✏️ Submit new review</h1>
                    <Formik
                        initialValues={{ title: "", body: "" }}
                        onSubmit={async (values, { setErrors, setValues }) => {
                            if (
                                values.title.trim().length == 0 ||
                                values.title.trim().length < 5
                            ) {
                                setErrors({
                                    title: "Title should be at least 5 characters long",
                                });
                                return;
                            }
                            if (
                                values.body.trim().length == 0 ||
                                values.body.trim().length < 5
                            ) {
                                setErrors({
                                    body: "Body should be at least 5 characters long",
                                });
                                return;
                            }
                            const res = await createReview({
                                variables: {
                                    ...values,
                                    productId: product.id,
                                },
                            });

                            console.log("res ::", res);
                            setValues({
                                title: "",
                                body: "",
                            });
                            await client.resetStore();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form style={{ margin: "20px 0px 15px 0px" }}>
                                <InputField
                                    name="title"
                                    placeholder="Title"
                                    label="Title"
                                />
                                <InputField
                                    name="body"
                                    placeholder="Body"
                                    label="Body"
                                />
                                <Button
                                    style={{ margin: "0px !important" }}
                                    isLoading={isSubmitting}
                                    type={"submit"}
                                >
                                    Create review
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
            {product.reviews.map((rev) => (
                <div key={rev.id} className={"review_card_container"}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={rev.creator.avatarUrl}
                            alt={"Avatar"}
                            className={"review_card_avatar"}
                            width={30}
                            height={30}
                        />
                        <p className={"review_card_username"}>
                            @{rev.creator.username}
                        </p>
                        <p className={"review_card_date"}>
                            {timeSinceShort(rev.createdAt)}
                        </p>
                    </div>
                    <p
                        style={{
                            fontSize: "19px",
                            fontWeight: 600,
                            marginTop: "7px",
                            color: "var(--gray-900)",
                        }}
                    >
                        {rev.title}
                    </p>
                    <p className={"review_card_body"}>{rev.body}</p>
                </div>
            ))}
        </div>
    );
};
