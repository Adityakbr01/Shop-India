import React from "react";
import { HiX } from "react-icons/hi";
import { increase, decrease, remove } from "../Reducer/CardSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOutItems({ cardItem }) {
  const notify = () => toast.error("Item Deleted",{
    pauseOnHover: false,
    autoClose: 1000,
  });
  const dispatch = useDispatch();
  const { id, price, image, name, amount } = cardItem;
  const HandleClick = (cardItem) => {
    dispatch(remove(cardItem));
    notify();
  };
  return (
    <div
      className="flex justify-between items-center border border-solid border-glass p-4 mb-6"
      key={id}
    >
      <img src={image} alt="" className="w-20 h-20 object-cover" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <div className="">{name}</div>
          <div className="flex items-center  gap-4 mt-2">
            <button
              className="flex items-center text-center justify-center w-8 h-8 rounded-full bg-[#000] text-[#fff]"
              onClick={() => dispatch(decrease(cardItem))}
            >
              -
            </button>
            <div>{amount}</div>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#000] text-[#fff]"
              onClick={() => dispatch(increase(cardItem))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[4rem] items-center gap-3">
        <HiX
          className="cursor-pointer text-xl"
          onClick={() => HandleClick(cardItem)}
        />
        <div className="">${(price * amount).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CheckOutItems;
