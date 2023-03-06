import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";
import { toast } from "react-toastify";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method,
        query: { id },
    } = req;

    if (method === "GET") {
        try {
            const category = await Category.findById(id);
            res.status(200).json(category);
            res.status(400).json({ message: "Wrong Credentials" })
        } catch (err) {
            toast.error(err)

        }
    }
    if (method === "PUT") {
        try {
            const categories = await Category.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(categories);
            res.status(400).json({ message: "Something Went Wrong. Please Try Again" });

        } catch (err) {
            toast.error(err)
        }
    }
    if (method === "DELETE") {
        try {
            const category = await Category.findByIdAndDelete(id);
            res.status(200).json(category);
            res.status(400).json({ message: "Something Went Wrong. Please Try Again" });

        } catch (err) {
            toast.error(err)
        }
    }
};

export default handler;
