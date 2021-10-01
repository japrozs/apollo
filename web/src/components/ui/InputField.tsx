import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div className={"input__container"}>
            <label className={"input__label"} htmlFor={field.name}>
                {label}
            </label>
            <input
                style={{ borderColor: !!error ? "red" : "" }}
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
