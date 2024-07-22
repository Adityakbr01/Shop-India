import React, { useState, useEffect } from "react";
import { items } from "../CardItems";
import ShoppingItems from "./ShoppingItems";
import { ToastContainer, toast } from "react-toastify";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
function ShoppingContainer() {
  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer) {
      const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
      });

      return () => scroll.destroy();
    }
  }, []);
  return (
    <div
      className="section grid lg:grid-cols-3 md:grid-cols-2 gap-6 relative"
      data-scroll-container
    >
      {items.map((item) => (
        <ShoppingItems key={item.id} item={item} />
      ))}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default ShoppingContainer;
