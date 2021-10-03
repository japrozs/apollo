import { Form } from "formik";
import React from "react";
import { Formik } from "formik";
import { InputField } from "../components/ui/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import { Button } from "../components/ui/Button";
import Haikunator from "haikunator";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    const haikunator = new Haikunator({});
    const usernameHaiku = haikunator.haikunate();
    const emailHaiku = haikunator.haikunate() + "@abc.com";

    return (
        <>
            <Head>
                <title>Apollo • Register</title>
            </Head>
            <div className={"login__container"}>
                <h1 className={"login__header"}>Register</h1>
                <Formik
                    initialValues={{
                        email: "",
                        username: "",
                        name: "",
                        password: "",
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await register({
                            variables: { options: values },
                        });
                        if (response.data?.register.errors) {
                            setErrors(
                                toErrorMap(response.data.register.errors)
                            );
                        } else if (response.data?.register.user) {
                            // registration worked
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
                                name="username"
                                placeholder={usernameHaiku}
                                label="Username"
                            />
                            <InputField
                                name="email"
                                placeholder={emailHaiku}
                                label="Email"
                            />
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                            <Button type="submit" isLoading={isSubmitting}>
                                Register
                            </Button>
                            <p
                                style={{
                                    marginTop: 7,
                                    color: "var(--gray-600)",
                                }}
                            >
                                Already have an account?{" "}
                                <NextLink href="/login">
                                    <span
                                        style={{
                                            color: "var(--green-500)",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Login
                                    </span>
                                </NextLink>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Register;
