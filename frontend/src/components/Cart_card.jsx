import { MdCurrencyRupee } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { LuMinus } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from "../features/productSlice";
import { useDispatch } from "react-redux";

const Cart_Card = ({ image, name, price, category, description, id, qty }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const increaseQty = async () => {
    // console.log(token);
    if (token) {
      try {
        dispatch(increaseQuantity(id));
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/cart/addCartItem`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log("error.message");
      }
    } else {
      dispatch(increaseQuantity(id));
    }
  };

  const decreaseQty = async () => {
    // console.log(token);
    if (token && qty >= 2) {
      try {
        dispatch(decreaseQuantity(id));
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/cart/decreaseQuantity`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const deleteItem = async () => {
    // console.log(token);
    if (token) {
      try {
        dispatch(deleteFromCart(id));
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/cart/deleteItem`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
          }
        );
        const data = await res.json();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="md:pl-5 md:p-2 bg-slate-200 flex gap-4 p-1">
      <div className="md:relative flex items-center md:w-full md:max-w-4xl w-screen bg-white">
        <div className="md:relative flex items-center md:w-full md:max-w-4xl w-screen">
          <div className="max-w-sm  md:h-[200px] md:w-[200px] w-[200px] h-[200px] overflow-hidden p-1">
            <img src={image} className=" hover:scale-105 " />
          </div>
          <div className="flex ">
            <div className="flex-col ml-7 ">
              <div className="text-md overflow-hidden ">
                <p className="md:text-4xl font-semibold text-slate-400 m-2">
                  {name.toUpperCase()}
                </p>
                <p className="m-2">{category.toUpperCase()}</p>
                <p className="flex font-medium text-2xl m-2">
                  <span className="text-extrabold  font-extrabold pt-1 text-red-500">
                    <MdCurrencyRupee />
                  </span>
                  {price}
                </p>
                <div className="mr-10 flex">
                  <button
                    onClick={increaseQty}
                    className="flex justify-center items-center bg-yellow-500 w-[35px] m-2 p-2 rounded"
                  >
                    <IoAdd />
                  </button>
                  <span className="flex justify-center items-center w-[35px] m-2 p-2 rounded">
                    {qty}
                  </span>
                  <button
                    onClick={decreaseQty}
                    className="flex justify-center items-center bg-yellow-500 w-[35px] m-2 p-2 rounded"
                  >
                    <LuMinus />
                  </button>
                </div>
              </div>
              <div
                onClick={deleteItem}
                className=" md:absolute top-0 right-0 m-4 text-3xl"
              >
                <AiFillDelete />
              </div>
              <div className="flex md:absolute bottom-0 right-0 m-4 text-3xl">
                Total:
                <span className="text-extrabold   font-extrabold pt-1 text-red-500">
                  <MdCurrencyRupee />
                </span>
                {price * qty}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart_Card;
