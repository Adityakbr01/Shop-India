import React from "react";
import { add } from "../Reducer/CardSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ShoppingItems({ item }) {
  const dispatch = useDispatch();
  const { id, image, price, name } = item;
  const notify = () => toast.success("Item Added ",{
    pauseOnHover: false,
    autoClose: 1000,
  });

  const HandlleClick = (item) => {
    dispatch(add(item));
    notify();
  };

  return (
    <div className="">
      <div className="bg-gray rounded-xl h-[400px] flex items-center justify-center">
        <motion.img
          src={image}
          alt=""
          className="max-w-[200px] max-h-[200px]"
          animate={{ y: [0, 40, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
          }}
        />
      </div>
      <div className="mt-6 flex items-center justify-between px-4">
        <div className="">
          <div className="text-sm font-bold mb-3">{name}</div>
          <div className="text-xl font-bold">${price}</div>
        </div>
        <button
          className="bg-[#0063CC] rounded-md text-[#fff] p-3 font-medium"
          onClick={() => HandlleClick(item)}
        >
          Add to Card
        </button>
      </div>
    </div>
  );
}

export default ShoppingItems;
