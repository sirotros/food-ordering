import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";

const OrderDetail = ({ order, setIsSearchModal }) => {
  const sizes = ["small", "medium", "large"];
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
            <Title className="text-[40px] text-center">OrderDetail</Title>
            <table className="w-full mt-5">
              <thead className="h-10 bg-gray-700 text-gray-300 text-base">
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Extras</th>
                </tr>
              </thead>
              <tbody>
                {order.order &&
                  order?.order.map((ord) => (
                    <tr className="transition-all text-base text-gray-200 bg-secondary border-gray-700 hover:bg-primary hover:text-secondary">
                      <td className="text-center py-2"> {ord?.title} </td>
                      <td className="text-center"> {sizes[ord?.size]} </td>
                      <td className="flex justify-center items-center py-2 ">
                        {ord?.extras.length >= 1 &&
                          ord?.extras.map((extra) => (
                            <span className="mx-2"> {extra?.text} </span>
                          ))}
                        {ord?.extras.length < 1 && <span> No extras </span>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsSearchModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default OrderDetail;
