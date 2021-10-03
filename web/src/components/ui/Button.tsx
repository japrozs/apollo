import React from "react";
import { Spinner } from "../shared/Spinner";

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
                    <Spinner className={"spinner spinner-in-button"} />
                </button>
            ) : (
                <button className="button" {...props}>
                    {children}
                </button>
            )}
        </>
    );
};
