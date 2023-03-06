import { api } from "@/api";
import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";

const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get(`/categories`);
        setCategories(res?.data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getCategories();
  }, []);
  const handleCreate = async (e) => {
    try {
      const res = await api.post(`/categories`, { title: inputText });
      setCategories([...categories, res.data]);
      setInputText("");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleDelete = async (e, id) => {
    try {
      if (confirm("Are you sure you want to delete this category?")) {
        await api.delete(`/categories/${id}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title className="text-[40px]">Category</Title>
      <div className="mt-5 px">
        <div className="flex gap-4 flex-1 items-center">
          <Input
            placeholder="Add a new Category..."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button
            type="submit"
            className="btn-primary  "
            onClick={handleCreate}
          >
            Add
          </button>
        </div>
        <div className="mt-10  max-h-[250px] overflow-auto pb-4 px-3">
          {categories.map((category) => (
            <div className="flex justify-between mt-4" key={category._id}>
              <b className="text-xl">{category.title}</b>

              <button
                className="btn-primary !bg-danger"
                onClick={(e) => handleDelete(e, category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
