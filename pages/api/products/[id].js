import Product from "@/models/Product";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method,
        query: { id },
    } = req;

    if (method === "GET") {
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
            res.status(400).json({ message: "Product not found" })
        } catch (err) {
            console.error(err)
        }
    }

    if (method === "DELETE") {
        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(product);
            res.status(400).json({ message: "Product could not be created" })
        } catch (err) {
            console.error(err)
        }
    }
};

export default handler;
