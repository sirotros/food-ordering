import * as Yup from "yup";

export const profileSchema = Yup.object({
    img: Yup.string().required("Image is required"),
    title: Yup.string().required("Phone Number is required.").min(10, "Phone number must be at least 10 characters."),
    desc: Yup.string().required("Email is required.").email("Email is invalid."),
    category: Yup.string().required("Category is required"),
    prices: Yup.string().required("Job is required."),
    extraOptions: Yup.string().required("Bio is required."),
});
