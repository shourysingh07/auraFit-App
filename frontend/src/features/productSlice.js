import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      // console.log(action.payload);
      state.productList = [...action.payload];
    },
    setCartItems: (state, action) => {
      // console.log(action.payload);
      const data = action.payload;

      state.cartList = [...action.payload];
    },
    addToCart: (state, action) => {
      // console.log(action.payload);
      const index = state.cartList.findIndex(
        (product) => product._id === action.payload._id
      );
      // console.log(index);
      if (index < 0) {
        state.cartList = [
          ...state.cartList,
          { ...action.payload, qty: 1, total: action.payload.price },
        ];
        toast("Product Successfully added to cart");
      } else {
        toast("Product already added to cart");
      }

      // console.log(state.cartList);
    },
    deleteFromCart: (state, action) => {
      const index = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      state.cartList.splice(index, 1);
    },
    increaseQuantity: (state, action) => {
      const index = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      // console.log(index);
      let qty = state.cartList[index].qty;
      state.cartList[index].qty = ++qty;
    },
    decreaseQuantity: (state, action) => {
      const index = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      // console.log(index);
      let qty = state.cartList[index].qty;
      if (qty > 1) {
        state.cartList[index].qty = --qty;
      }
    },
  },
});

export const {
  setProductData,
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
} = productSlice.actions;

export default productSlice.reducer;
