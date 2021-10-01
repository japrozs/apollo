import React from "react";
import Image from "next/image";
import { useMeQuery } from "../../../generated/graphql";
import { Spinner } from "../../../components/shared/Spinner";

interface UserSectionProps {}

export const UserSection: React.FC<UserSectionProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <div className={"user_section_wrapper"}>
            {data ? (
                <>
                    <div className={"user_section_top"}>
                        <Image
                            src={data.me.avatarUrl}
                            alt={"Avatar"}
                            width={75}
                            height={75}
                            className={"user_avatar"}
                        />
                        <div className={"user_avatar_right"}>
                            <p className="user_name">{data.me.name}</p>
                            <p className="user_username">@{data.me.username}</p>
                            <p className="user_email">{data.me.email}</p>
                        </div>
                    </div>
                    <p className={"user_email"} style={{ marginTop: "11px" }}>
                        {data.me.bio}
                    </p>
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
