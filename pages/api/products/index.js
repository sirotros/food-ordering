import Product from "@/models/Product"
import dbConnect from "@/util/dbConnect"

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
      res.status(400).json({ message: "Products not found" })
    } catch (err) {
      toast.error(err)
    }
  }

  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
      res.status(400).json({ message: "Products could not be created" })
    } catch (err) {
      toast.error(err)
    }
  }
  if (method === "DELETE") {
    try {
      const products = await Product.deleteMany()
      res.status(200).json(products);
      res.status(400).json({ message: "Products not deleted" })
    } catch (err) {
      toast.error(err)
    }
  }
};

export default handler;

