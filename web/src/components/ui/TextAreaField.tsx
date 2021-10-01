import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type TextAreaFieldProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    name: string;
    label: string;
    textarea?: boolean;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div className={"input__container"}>
            <label className={"input__label"} htmlFor={field.name}>
                {label}
            </label>
            <textarea
                style={{
                    borderColor: !!error ? "red" : "",
                    maxWidth: "659px",
                }}
                className={"input"}
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error ? <span className={"input__error"}>{error}</span> : null}
        </div>
    );
};
