import React from "react";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import { code } from "./components/code";

// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import rehypeHighlight from "rehype-highlight";

interface indexProps {
    markdown: string;
}

const Index: React.FC<indexProps> = ({ markdown }) => {
    return (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    blockquote({ node, className, children, ...props }) {
                        return <blockquote>{children}</blockquote>;
                    },
                    code,
                }}
            >
                {markdown}
            </ReactMarkdown>
        </>
    );
};

export default Index;
