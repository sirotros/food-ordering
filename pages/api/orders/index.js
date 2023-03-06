import Order from "@/models/Order";
import dbConnect from "@/util/dbConnect";
import { toast } from "react-toastify";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
            res.status(400).json({ message: "Order not found" })
        } catch (err) {
            toast.error(err)
        }
    }

    if (method === "POST") {
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).json(newOrder);
            res.status(400).json({ message: "Order could not be created" })
        } catch (err) {
            toast.error(err)
        }
    }

    if (method === "DELETE") {
        try {
            const orders = await Order.deleteMany()
            res.status(200).json(orders);
            res.status(400).json({ message: "Order not deleted" })
        } catch (err) {
            toast.error(err)
        }
    }
};

export default handler;
