import * as Yup from "yup";

export const categorySchema = Yup.object({
    title: Yup.string()
        .required("Title is required.")
        .min(3, "Title must be at least 3 characters."),
    size: Yup.string()
        .required("Size is required.")
        .min(1, "Must contain at least 1 size")
        .max(3, "Must contain at most 3 size"),
});
