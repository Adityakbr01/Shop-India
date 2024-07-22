// CardSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { items } from "../CardItems";

const initialState = {
  cardItems: [],
  amount: 0,
  total: 0,
};

const CardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    add: (state, action) => {
      state.amount += 1;
      const cardItem = state.cardItems.find(
        (cardItem) => cardItem.id === action.payload.id
      );
      if (cardItem) {
        cardItem.amount += 1;
      } else {
        state.cardItems.push({ ...action.payload, amount: 1 });
      }
      // Update total
      state.total = state.cardItems.reduce(
        (total, item) => total + item.amount * item.price,
        0
      );
    },
    increase: (state, action) => {
      state.amount += 1;
      const itemIndex = state.cardItems.findIndex(
        (cardItem) => cardItem.id === action.payload.id
      );
      state.cardItems[itemIndex].amount += 1;
      // Update total
      state.total = state.cardItems.reduce(
        (total, item) => total + item.amount * item.price,
        0
      );
    },
    decrease: (state, action) => {
      const itemIndex = state.cardItems.findIndex(
        (cardItem) => cardItem.id === action.payload.id
      );
      if (state.cardItems[itemIndex].amount > 1) {
        state.cardItems[itemIndex].amount -= 1;
        state.amount -= 1;
      } else {
        state.cardItems = state.cardItems.filter(
          (cardItem) => cardItem.id !== action.payload.id
        );
        state.amount -= 1;
      }
      // Update total
      state.total = state.cardItems.reduce(
        (total, item) => total + item.amount * item.price,
        0
      );
    },
    remove: (state, action) => {
      const itemIndex = state.cardItems.findIndex(
        (cardItem) => cardItem.id === action.payload.id
      );
      state.amount -= state.cardItems[itemIndex].amount;
      state.cardItems = state.cardItems.filter(
        (cardItem) => cardItem.id !== action.payload.id
      );
      // Update total
      state.total = state.cardItems.reduce(
        (total, item) => total + item.amount * item.price,
        0
      );
    },
    total: (state, action) => {
      let total = 0;
      state.cardItems.forEach((cartItem) => {
        total += cartItem.amount * cartItem.price;
      });
      state.total = total;
    },
    clear: (state) => {
      (state.cardItems = []), (state.amount = 0);
    },
  },
});

export const { add, increase, decrease, remove, total, clear } =
  CardSlice.actions;

export default CardSlice.reducer;
