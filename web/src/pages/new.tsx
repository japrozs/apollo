import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import { TextAreaField } from "../components/ui/TextAreaField";
import { useCreateProductMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface NewProps {}

const New: React.FC<NewProps> = ({}) => {
    const [createProduct] = useCreateProductMutation();
    const router = useRouter();
    const client = useApolloClient();
    return (
        <div className={"new_product_container"}>
            <h1 className="new_product_header">Create new product</h1>
            <Formik
                initialValues={{ name: "", tagLine: "", description: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await createProduct({
                        variables: {
                            options: values,
                        },
                    });
                    if (res.data.createProduct.errors) {
                        setErrors(toErrorMap(res.data.createProduct.errors));
                    } else if (res.data.createProduct.product) {
                        await client.resetStore();
                        router.push("/app");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            placeholder="Name"
                            label="Name"
                        />
                        <InputField
                            name="tagLine"
                            placeholder="Tag Line"
                            label="Tag Line"
                        />
                        <TextAreaField
                            name="description"
                            placeholder="Description"
                            label="Description"
                        />
                        <Button type="submit" isLoading={isSubmitting}>
                            Create Product
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default New;
