import React from "react";
import Image from "next/image";
import { MeQuery } from "../../../generated/graphql";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NextLink from "next/link";

interface NotifCardProps {
    notif: MeQuery["me"]["notifications"][0];
}

export const NotifCard: React.FC<NotifCardProps> = ({ notif }) => {
    return (
        <NextLink href={notif.link} passHref={true}>
            <div className={"notif_card_container"}>
                <NotificationsIcon color={"action"} />
                <p className={"notif_body truncate"}>{notif.body}</p>
            </div>
        </NextLink>
    );
};
