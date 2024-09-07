import { useSelector } from "react-redux";
import Cart_Card from "../components/Cart_card";
import { MdCurrencyRupee } from "react-icons/md";
import emptyCartImage from "../assets/Cart.gif";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import loader from "../assets/loading.gif";

const Cart = () => {
  const cartItem = useSelector((state) => state.product.cartList);
  // console.log(cartItem);
  const navigate = useNavigate();

  let total_price = 0;
  let total_qty = 0;

  cartItem.map((item) => {
    total_price += item.price * item.qty;
    total_qty += item.qty;
  });
  // console.log(total_price);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItem.length === 0) {
      // Set loading state to true after 5 seconds
      const timer = setTimeout(() => {
        setLoading(true);
      }, 2000);

      // Clean up the timer to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [cartItem]); // Re-run effect when cartItem changes

  const beforeFiveSec = () => {
    return (
      <div className="flex-col bg-slate-200 h-screen w-full flex justify-center items-center">
        <div className="p-4 text-blue-500 font-bold text-5xl">
          Please Wait...
        </div>
        <div className="h-20 w-20">
          <img src={loader}></img>
        </div>
      </div>
    );
  };

  const afterFiveSec = () => {
    return (
      <div className="flex-col bg-slate-200 h-screen w-full flex justify-center items-center">
        <div className="p-4 text-blue-500 font-bold text-5xl">
          <span className="text-red-500">OOPS! </span>
          Your Cart Is Empty
        </div>
        <img
          src={emptyCartImage}
          className="md:h-[250px] md:w-[250px]"
          alt="Empty Cart"
        />
      </div>
    );
  };

  // Conditional rendering based on cartItem length and loading state
  const token = localStorage.getItem("token");
  if (cartItem.length === 0) {
    if (!loading && token) {
      return beforeFiveSec();
    } else {
      return afterFiveSec();
    }
  }

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please Login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    const stripePromise = await loadStripe(
      import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
    );
    const res = await fetch(
      `${
        import.meta.env.VITE_APP_SERVER_DOMAIN
      }/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      }
    );
    const data = await res.json();
    // console.log(data);
    toast("Redirect To Payment Gateway");
    stripePromise.redirectToCheckout({ sessionId: data });
  };

  return (
    <div className="bg-slate-200 h-[100%] w-[100%]">
      <div className="p-4 text-blue-500 font-bold text-4xl ">
        Your Cart Items
      </div>
      <div className="md:flex ">
        <div className="md:w-[900px]">
          {cartItem.map((product) => {
            return (
              <Cart_Card
                key={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                category={product.category}
                description={product.description}
                id={product._id}
                qty={product.qty}
              />
            );
          })}
        </div>
        <div className="md:w-[500px] ml-12">
          <div className="w-full">
            <h1 className="p-4 mt-2 bg-blue-500 font-semibold text-white text-4xl">
              Summary
            </h1>
            <h1 className="p-4 mt-4 text-3xl flex justify-between">
              Total Qty: <div>{total_qty}</div>
            </h1>
            <h1 className="flex p-4 mt-2 text-3xl justify-between">
              Total Price:
              <div className="flex">
                <span className="text-extrabold  font-extrabold pt-1 text-red-500">
                  <MdCurrencyRupee />
                </span>
                {total_price}
              </div>
            </h1>
            <button
              onClick={handlePayment}
              className="p-4 mt-4 bg-red-500 font-semibold w-full text-white text-4xl flex justify-center"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
