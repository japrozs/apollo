import React from "react";

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
    isLoading,
    children,
    ...props
}) => {
    return (
        <>
            {isLoading ? (
                <button className="button" {...props}>
                    Loading
                </button>
            ) : (
                <button className="button" {...props}>
                    {children}
                </button>
            )}
        </>
    );
};
