import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
      res.status(400).json({ message: "Something went wrong" })
    } catch (err) {
      console.error(err)
    }
  }

  if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
      res.status(400).json({ message: "Something went wrong" })
    } catch (err) {
      console.error(err)
    }
  }
};

export default handler;
