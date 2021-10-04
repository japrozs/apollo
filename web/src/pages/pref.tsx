import React, { createRef, ChangeEvent } from "react";
import { Spinner } from "../components/shared/Spinner";
import { Navbar } from "../components/ui/Navbar";
import Image from "next/image";
import { useMeQuery, useUpdateProfileMutation } from "../generated/graphql";
import { Form, Formik } from "formik";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import { useApolloClient } from "@apollo/client";
import Axios from "axios";
import { toErrorMap } from "../utils/toErrorMap";

interface PrefProps {}

const Pref: React.FC<PrefProps> = ({}) => {
    const { data, loading } = useMeQuery();
    const client = useApolloClient();
    const fileInputRef = createRef<HTMLInputElement>();
    const [updateProfile] = useUpdateProfileMutation();

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", data.me.id.toString());

        const transport = Axios.create({
            withCredentials: true,
        });

        try {
            await transport.post(
                "http://localhost:4000/upload-profile",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            await client.resetStore();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            {data && !loading && (
                <div className={"pref_page"} style={{ padding: "2vh 3vw" }}>
                    <h1 style={{ marginBottom: "3vh" }}>😐 Your Information</h1>
                    <div className={"pref_container"}>
                        <div>
                            <input
                                type="file"
                                hidden={true}
                                ref={fileInputRef}
                                onChange={uploadImage}
                            />
                            <Image
                                alt={"Avatar Image"}
                                width={200}
                                className={"avatar_img"}
                                height={200}
                                src={data.me.avatarUrl}
                                onClick={openFileInput}
                            />
                            <div style={{ marginTop: "12px" }}></div>
                            <p className={"profile_info"}>
                                <span>😃</span> {data.me.name}
                            </p>
                            <p className={"profile_info"}>
                                <span>💬 </span>
                                {data.me.username}
                            </p>
                            <p className={"profile_info"}>
                                <span>✉️</span> {data.me.email}
                            </p>
                            <p className={"profile_info"}>
                                <span>🤖</span>
                                {data.me.bio}
                            </p>
                        </div>
                        <Formik
                            initialValues={{
                                name: data.me.name,
                                email: data.me.email,
                                bio: data.me.bio,
                                username: data.me.username,
                            }}
                            onSubmit={async (values, { setErrors }) => {
                                const res = await updateProfile({
                                    variables: {
                                        ...values,
                                    },
                                });
                                if (res.data.updateProfile.errors) {
                                    return setErrors(
                                        toErrorMap(
                                            res.data.updateProfile.errors
                                        )
                                    );
                                }
                                await client.resetStore();
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className={"edit_profile_form"}>
                                    <InputField
                                        name="name"
                                        placeholder="Name"
                                        label="Name"
                                        style={{ width: "350px" }}
                                    />
                                    <InputField
                                        name="email"
                                        placeholder="Email"
                                        label="Email"
                                        style={{ width: "350px" }}
                                    />
                                    <InputField
                                        name="username"
                                        placeholder="Username"
                                        label="Username"
                                        style={{ width: "350px" }}
                                    />
                                    <InputField
                                        name="bio"
                                        placeholder="Bio"
                                        label="Bio"
                                        style={{ width: "350px" }}
                                    />
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        style={{
                                            border: "1px solid var(--gray-300)",
                                        }}
                                    >
                                        Update Profile
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
            {loading && <Spinner />}
        </>
    );
};

export default Pref;
