import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method,
        query: { id },
    } = req;

    if (method === "GET") {
        try {
            const footer = await Footer.findById(id);
            res.status(200).json(footer);
            res.status(400).json({ message: "Something went wrong" })
        } catch (err) {
            toast.error(err)
        }
    }

    if (method === "PUT") {
        try {
            const footer = await Footer.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(footer);
            res.status(400).json({ message: "Something went wrong" })
        } catch (err) {
            toast.error(err)
        }
    }
};

export default handler;