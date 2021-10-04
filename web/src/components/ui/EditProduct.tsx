import React, { useState, ChangeEvent, createRef } from "react";
import { Modal } from "react-responsive-modal";
import {
    GetProductQuery,
    useUpdateProductMutation,
} from "../../generated/graphql";
import Image from "next/image";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { toErrorMap } from "../../utils/toErrorMap";
import { useApolloClient } from "@apollo/client";
import Axios from "axios";

interface EditProductProps {
    open: boolean;
    setOpen: any;
    product: GetProductQuery["getProduct"];
}

export const EditProduct: React.FC<EditProductProps> = ({
    open,
    setOpen,
    product,
}) => {
    const [updateProduct] = useUpdateProductMutation();
    const client = useApolloClient();
    const fileInputRef = createRef<HTMLInputElement>();

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", product.id.toString());

        const transport = Axios.create({
            withCredentials: true,
        });

        try {
            await transport.post("http://localhost:4000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            await client.resetStore();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            center
            styles={{ modal: { borderRadius: "3px", minWidth: "500px" } }}
        >
            <h1 style={{ marginBottom: "15px" }}>Edit Product</h1>
            <div className={"modal_container"}>
                <input
                    type="file"
                    hidden={true}
                    ref={fileInputRef}
                    onChange={uploadImage}
                />
                <Image
                    onClick={openFileInput}
                    src={product.imgUrl}
                    alt={"Product logo "}
                    className={"img"}
                    width={100}
                    height={100}
                />
                <Formik
                    initialValues={{
                        name: product.name,
                        tagLine: product.tagLine,
                        tags: product.tags.join(", "),
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const res = await updateProduct({
                            variables: {
                                id: product.id,
                                ...values,
                            },
                        });
                        if (res.data.updateProduct.errors) {
                            return setErrors(
                                toErrorMap(res.data.updateProduct.errors)
                            );
                        }
                        await client.resetStore();
                        setOpen(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ margin: "0px 10px 0px 30px" }}>
                            <InputField
                                name="name"
                                placeholder="Name"
                                label="Name"
                                style={{ width: "300px" }}
                            />
                            <InputField
                                name="tagLine"
                                placeholder="Tag Line"
                                label="Tag Line"
                            />
                            <InputField
                                name="tags"
                                placeholder=" a, b, c, d"
                                label="Tags"
                            />
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                style={{
                                    marginLeft: "0px !important",
                                    border: "1px solid var(--gray-300)",
                                }}
                            >
                                Update Product
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
