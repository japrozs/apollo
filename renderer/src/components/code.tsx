import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

import { CodeComponent } from "react-markdown/lib/ast-to-react";

export const code: keyof JSX.IntrinsicElements | CodeComponent = ({
    inline,
    className,
    children,
    ...props
}) => {
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
};
