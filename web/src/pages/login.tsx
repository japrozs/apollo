import React from "react";
import { Meta } from "../components/shared/Meta";
import Head from "next/head";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { InputField } from "../components/ui/InputField";
import { Button } from "../components/ui/Button";
import NextLink from "next/link";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const client = useApolloClient();
    const [login] = useLoginMutation();
    return (
        <>
            <Head>
                <title>Login &bull; Apollo</title>
                <Meta title={"Login"} />
            </Head>
            <div className={"login__container"}>
                <h1 className={"login__header"}>Login</h1>
                <Formik
                    initialValues={{ usernameOrEmail: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login({ variables: values });
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (response.data?.login.user) {
                            if (typeof router.query.next === "string") {
                                router.push(router.query.next);
                            } else {
                                // worked
                                await client.resetStore();
                                router.push("/");
                            }
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="usernameOrEmail"
                                placeholder="Username or Email"
                                label="Username or Email"
                            />
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                            <Flex>
                                <NextLink href="/forgot-password">
                                    <Link
                                        mt={2}
                                        ml={"auto"}
                                        fontWeight="medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Button type="submit" isLoading={isSubmitting}>
                                Login
                            </Button>
                            <p
                                style={{
                                    marginTop: 7,
                                    color: "var(--gray-600)",
                                }}
                            >
                                Don{"'"}t have an account?{" "}
                                <NextLink href="/register">
                                    <span
                                        style={{
                                            color: "var(--green-500)",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Create one
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

export default Login;
