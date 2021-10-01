import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

import remarkGfm from "remark-gfm";

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
                    code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        console.log("className ::", className);
                        console.log("props ::", props);
                        return !inline && match ? (
                            //@ts-ignore
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={dark}
                                language={match[1]}
                                PreTag="div"
                                className={"apollo-code-block"}
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </>
    );
};

export default Index;
