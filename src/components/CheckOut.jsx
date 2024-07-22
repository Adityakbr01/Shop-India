import React from "react";
import { HiChevronLeft, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../Reducer/CheckOutSlice";
import CheckOutItems from "./CheckOutItems";
import { clear } from "../Reducer/CardSlice";
import { toast } from "react-toastify";

function CheckOut() {
  const dispatch = useDispatch();
  const { cardItems, total } = useSelector((state) => state.Card);
  const totalAmount = cardItems.reduce((total, item) => total + item.amount, 0);
  const handleCheckOut = () => {
    toast.warning("Website Under Mentaine", {
      position: "top-center",
    });
  };

  return (
    <div
      className="bg-transparentBlack fixed z-30 top-0 left-0 w-full h-screen"
      onClick={() => dispatch(open())}
    >
      <div
        className="h-full bg-gray sm:w-[40rem] min-w-[15rem] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(open())}
            >
              <HiChevronLeft />
              <span className="text-[0.95rem] uppercase select-none">
                Continue Shopping
              </span>
            </div>
            <div>Shopping Bag ({totalAmount})</div>
          </div>
          <div className="mt-8">
            {cardItems.length === 0 ? (
              <div className="uppercase text-center flex items-center justify-center text-3xl h-[60vh]">
                Your Card is empty
              </div>
            ) : (
              <>
                {cardItems.map((cardItem) => {
                  return (
                    <CheckOutItems key={cardItem.id} cardItem={cardItem} />
                  );
                })}
                <div className="flex justify-between items-center mt-12">
                  <div>Total Cost : ${total.toFixed(2)}</div>
                  <HiTrash
                    onClick={() => dispatch(clear())}
                    color="red"
                    size={22}
                    className="cursor-pointer"
                  />
                </div>
                <div
                  onClick={handleCheckOut}
                  className="bg-[#000] text-[#fff] p-3 mt-12 text-center cursor-pointer"
                >
                  Check Out
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
