import React from "react";
import { Meta } from "../components/shared/Meta";
import Head from "next/head";
import { LeftSection } from "../modules/LeftSection.tsx/LeftSection";
import { MiddleSection } from "../modules/MiddleSection/MiddleSection";
import { RightSection } from "../modules/RightSection.tsx/RightSection";
import { useIsAuth } from "../hooks/useIsAuth";
import { Navbar } from "../components/ui/Navbar";

interface appProps {}

const App: React.FC<appProps> = ({}) => {
    useIsAuth();
    return (
        <div>
            <Head>
                <title>Apollo. Dashboard</title>
                <Meta title={"Apollo . Dashboard"} />
            </Head>
            <Navbar />
            <div className={"global_wrapper"}>
                <div className="left_section_wrapper">
                    <LeftSection />
                </div>
                <div className="middle_section_wrapper">
                    <MiddleSection />
                </div>
                <div className="right_section_wrapper">
                    <RightSection />
                </div>
            </div>
        </div>
    );
};

export default App;
