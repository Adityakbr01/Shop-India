// import { configureStore } from "@reduxjs/toolkit";
// import CheckOutReducer from "../Reducer/CheckOutSlice";
// import CardReducer from "../Reducer/CardSlice";

// export const Store = configureStore({
//   reducer: {
//     CheckOut: CheckOutReducer,
//     Card: CardReducer,
//   },
// });

// store.js

// src/Store/store.js

import { configureStore } from "@reduxjs/toolkit";
import CheckOutReducer from "../Reducer/CheckOutSlice";
import CardReducer from "../Reducer/CardSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    CheckOut: CheckOutReducer,
    Card: CardReducer,
  },
  preloadedState: {
    Card: persistedState || {
      cardItems: [],
      amount: 0,
      total: 0,
    },
  },
});

store.subscribe(() => {
  saveState(store.getState().Card);
});

export default store;
