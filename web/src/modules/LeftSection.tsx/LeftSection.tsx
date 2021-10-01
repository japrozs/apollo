import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { NotifCard } from "./components/NotifCard";

interface LeftSectionProps {}

export const LeftSection: React.FC<LeftSectionProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <div className={"left_section_wrapper"}>
            <h1>🔔 Notifications</h1>
            {data &&
                data.me.notifications.map((notif) => (
                    <NotifCard key={notif.id} notif={notif} />
                ))}
        </div>
    );
};
