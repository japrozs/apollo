import { ProductInput } from "src/schemas/ProductInput";

export const validateProduct = (options: ProductInput) => {
    if (options.name.trim().length == 0) {
        return [
            {
                field: "name",
                message: "Name cannot be empty",
            },
        ];
    }

    if (options.description) {
        if (options.description.trim().length == 0) {
            return [
                {
                    field: "description",
                    message: "Description cannot be empty",
                },
            ];
        }
    }

    if (options.tagLine.length <= 2) {
        return [
            {
                field: "tagLine",
                message: "Tagline must be greater than 2",
            },
        ];
    }

    return null;
};
