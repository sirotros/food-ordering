import { useEffect, useState } from "react";
import Title from "../ui/Title";
import { useSession } from "next-auth/react";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get(`/orders`);
        setOrders(
          res.data.filter((order) => order.customer === currentUser?.fullName)
        );
      } catch (err) {
        toast.error(err.message);
      }
    };
    getOrders();
  }, [currentUser]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get(`/users`);
        setCurrentUser(
          res.data.filter((user) => user.email === session.user.email)[0]
        );
      } catch (err) {
        toast.error(err.message);
      }
    };
    getUsers();
  }, [session]);
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title className="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px] min-w-100%">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                ADRESS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary hover:cursor-pointer"
                  key={order?._id}
                  onClick={() => push(`/order/${order?._id}`)}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <span>{order?._id.slice(0, 5)}...</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order &&
                      order?.order?.slice(0, 3).map((ord) => (
                        <span className="ml-3" key={ord?._id}>
                          {ord?.title}
                        </span>
                      ))}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order?.address.slice(0, 10)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order?.updatedAt.slice(0, 10)}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    $ {order?.total}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
