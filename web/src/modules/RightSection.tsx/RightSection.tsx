import React from "react";
import { TopProduct } from "./components/TopProduct";
import { UserSection } from "./components/UserSection";

interface RightSectionProps {}

export const RightSection: React.FC<RightSectionProps> = ({}) => {
    return (
        <div className={"right_section_container"}>
            <h1>🤩 Profile</h1>
            <UserSection />
            <h1
                style={{
                    margin: "20px 0px -10px 0px",
                    fontSize: "25px",
                    fontWeight: 600,
                    color: "var(--gray-900)",
                }}
            >
                🎉 Product of the day
            </h1>
            <TopProduct />
        </div>
    );
};
