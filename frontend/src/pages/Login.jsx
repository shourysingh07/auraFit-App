import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { setCartItems } from "../features/productSlice.js";
import image from '../assets/dumbbell.png'

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product.productList);

  const getCartItemAfterLogin = async () => {
    const token = localStorage.getItem("token");
    const product1 = await fetch(
      `${import.meta.env.VITE_APP_SERVER_DOMAIN}/cart/getCartItem`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cartItemsData = await product1.json();

    const productsWithQuantities = cartItemsData
      .map((cartItem) => {
        // Find corresponding product in productData
        const product = productData.find(
          (product) => product._id === cartItem.productId
        );
        if (product) {
          return {
            ...product,
            qty: cartItem.quantity,
            total: cartItem.price, // Include quantity from cart item
          };
        }
        return null; // Return null if product not found (handle edge case)
      })
      .filter(Boolean);
    // console.log(data);
    // console.log(productsWithQuantities);
    dispatch(setCartItems(productsWithQuantities));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `${import.meta.env.VITE_APP_SERVER_DOMAIN}/login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    
    const res = await data.json();
    const { check } = res;
    if (check) {
      toast(`${res.userData.name} successfully Login`);
      dispatch(login(res.userData));
      localStorage.setItem("token", res.token);
      if (res.userData.email == import.meta.env.VITE_IS_ADMIN) {
        localStorage.setItem("role", true);
      }
      getCartItemAfterLogin();
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      toast(res.msg);
    }
    // console.log(userRedux.user.name);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="h-full bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <img className="mx-auto h-[100px] w-auto" src={image} alt="Your Company" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login Here
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleOnSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={user.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={user.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onSubmit={handleOnSubmit}
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don`t` Have an Account?
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              SignUp here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
