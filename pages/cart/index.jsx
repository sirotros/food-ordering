import Image from "next/image";
import Title from "@/components/ui/Title";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/api";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  increment,
  decrement,
  calculateQuantity,
} from "@/redux/cartSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Cart = ({ userList }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const sizes = ["small", "medium", "large"];

  const { data: session } = useSession();

  const user = userList?.find((user) => user.email === session?.user?.email);
  const cart = useSelector((state) => state.cart);
  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
    order: cart.products,
  };
  useEffect(() => {
    dispatch(calculateQuantity());
  }, [cart.products]);
  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await api.post(`/orders`, newOrder);
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  };
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          {cart?.products?.length > 0 ? (
            <div className="w-full">
              <div className="max-h-52 overflow-auto w-full">
                <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        PRODUCT
                      </th>
                      <th scope="col" className="py-3 px-6">
                        EXTRAS
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Size
                      </th>
                      <th scope="col" className="py-3 px-6">
                        PRICE
                      </th>
                      <th scope="col" className="py-3 px-6">
                        QUANTITY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((product, index) => (
                      <tr
                        className="transition-all text-base bg-secondary border-gray-700 hover:bg-primary"
                        key={index}
                      >
                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                          <Image
                            src={product?.img}
                            alt=""
                            width={50}
                            height={50}
                          />
                          <span>{product.name}</span>
                        </td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                          {product.extras?.length > 0
                            ? product.extras.map((item) => (
                                <span key={item.id}>{item.text} </span>
                              ))
                            : "empty"}
                        </td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                          {sizes[product.size]}
                        </td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                          ${product.price}
                        </td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap flex gap-3 justify-center items-center hover:text-white">
                          <button
                            className="btn-rounded bg-red-600 text-white"
                            onClick={() => dispatch(decrement(product))}
                          >
                            -
                          </button>
                          {product.quantity}
                          <button
                            className="btn-rounded bg-green-600 text-white"
                            onClick={() => dispatch(increment(product))}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="btn-primary mt-5"
                onClick={() => dispatch(reset())}
              >
                Clear Order
              </button>
            </div>
          ) : (
            <p className="text-center font-semibold"> No order yet </p>
          )}
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full   md:text-start !text-center">
          <Title className="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Subtotal: </b>${cart.total} <br />
            <b className=" inline-block my-1">Discount: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={createOrder}
            >
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await api.get(`/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
