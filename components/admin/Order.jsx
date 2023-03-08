import { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import Title from "../ui/Title";
import { deleteAll } from "@/util";
import { api } from "@/api";
import { toast } from "react-toastify";

const Order = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get(`/orders`);
        setOrders(res.data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;
    try {
      const res = await api.put(`/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteAllOrders = async () => {
    deleteAll("orders").then((res) => setOrders(res.data));
  };

  const handleOpenModal = (id) => {
    const item = orders.find((order) => order._id === id);
    setOrder(item);
    setIsSearchModal(true);
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <div className="flex justify-between ">
        <Title className="text-[40px]">Orders</Title>
        <button className="btn-primary" onClick={deleteAllOrders}>
          Clear Order
        </button>
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                PRODUCT ID
              </th>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                PAYMENT
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                    key={order?._id}
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
                      {order?._id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      $ {order?.total}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.method === 0 ? "Cash" : "Card"}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order?.status]}
                    </td>
                    <td className="flex items-center justify-center h-full py-4 px-6 font-medium whitespace-nowrap gap-5 hover:text-white">
                      <button
                        className="btn-primary"
                        onClick={() => handleOpenModal(order?._id)}
                      >
                        Order Detail
                      </button>
                      <button
                        className="btn-primary !bg-[#31aa75]"
                        onClick={() => handleStatus(order?._id)}
                        disabled={order?.status > 1}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {isSearchModal && (
        <OrderDetail order={order} setIsSearchModal={setIsSearchModal} />
      )}
    </div>
  );
};

export default Order;
