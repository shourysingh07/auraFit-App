import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../features/productSlice.js";

const Success = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.product.cartList);
  // console.log(cartItems);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const deleteAllItem = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/cart/deleteAllItem`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        dispatch(setCartItems([]));
      } catch (error) {
        console.log(error.message);
      }
    };

    if (token && cartItems.length > 0) {
      // console.log(cartItems.length);
      deleteAllItem();
    }
  }, [token, cartItems.length]);

  return (
    <div className="">
      <div className=" mt-20 bg-green-200 flex-col w-full max-w-md m-auto h-40 flex justify-center items-center font-semibold text-lg">
        <p>Payment Successfully done</p>
        <Link to="/home">
          <p className=" underline text-blue-800">Go To Home</p>
        </Link>
      </div>
    </div>
  );
};
export default Success;
