import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProduct from "./pages/AddProduct.jsx";
import Login from "./pages/Login.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductData, setCartItems } from "./features/productSlice.js";
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import AllProduct from "./components/AllProduct.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProduct = async () => {
      console.log(import.meta.env.VITE_APP_SERVER_DOMAIN);
      const product = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/getAllProduct`
      );
      const productData = await product.json();
      // console.log(data);
      dispatch(setProductData(productData));

      // get all cart items
      const token = localStorage.getItem("token");
      if(token)
      {
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
      }
    };
    fetchAllProduct();
  }, []);

  // console.log(productData);
  // const productData = useSelector((state) => state.product.productList);
  document.body.style.zoom = "80%";

  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <div className="pt-16 min-h-[calc(100vh)] h-full ">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/allProduct" element={<AllProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
