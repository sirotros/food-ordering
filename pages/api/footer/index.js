import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const footer = await Footer.find();
            res.status(200).json(footer);
            res.status(400).json({ message: "Something went wrong" })
        } catch (err) {
            toast.error(err)
        }
    }

    if (method === "POST") {
        try {
            const newFooter = await Footer.create(req.body);
            res.status(201).json(newFooter);
            res.status(400).json({ message: "Something went wrong" })
        } catch (err) {
            toast.error(err)
        }
    }
};

export default handler;