import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import AllProduct from "../components/AllProduct";
import loader from "../assets/loading.gif";
import { addToCart } from "../features/productSlice";

const Menu = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
   const navigate = useNavigate();
  // console.log(id);
  let productData = useSelector((state) => state.product.productList);
  // console.log(productData);

  const product = productData.filter((product) => product._id === id)[0];
  // console.log(product);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

 

  const handleBuy = () => {
    // const { image, name, price, category, description, _id } = product;
    const handleAddToCart = async () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        try {
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
      }
    };
    handleAddToCart()
    dispatch(addToCart(product));
    navigate("/cart");
  };

  if (productData.length == 0) {
    return (
      <div className="bg-slate-100 flex text-4xl justify-center items-center w-full h-screen ">
        <div className="bg-white p-8 rounded-lg w-[800px]">
          <div className="flex justify-center items-center h-full ">
            <h1 className=" text-md">Loading...</h1>
            <div className="h-20 w-20 ">
              <img src={loader}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div className="p-2 md:p-4 bg-slate-100 ">
      <div className="md:flex items-center  w-full max-w-4xl m-auto bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img src={product.image} className=" hover:scale-105 " />
        </div>
        <div className="flex-col ml-7 ">
          <div className="text-md overflow-hidden ">
            <p className="md:text-4xl font-semibold text-slate-400 m-2">
              {product.name.toUpperCase()}
            </p>
            <p className="m-2">{product.category.toUpperCase()}</p>
            <p className="flex font-medium text-2xl m-2">
              <span className="text-extrabold  font-extrabold pt-1 text-red-500">
                <MdCurrencyRupee />
              </span>
              {product.price}
            </p>
            <div className="mr-10 flex">
              <button
                onClick={handleBuy}
                className="flex justify-center items-center bg-yellow-500 w-[100px] m-2 p-2 rounded"
              >
                Buy
              </button>
              <button
                onClick={handleAddToCart}
                className="flex justify-center items-center bg-yellow-500 w-[100px] m-2 p-2 rounded"
              >
                Add Cart
              </button>
            </div>
          </div>
          <div className="text-md overflow-hidden m-2">
            <p className="text-2xl font-semibold text-slate-400">
              Description :
            </p>
            <p className="flex flex-wrap ">{product.description}</p>
          </div>
        </div>
      </div>
      <div>
        <AllProduct />
      </div>
    </div>
  );
};
export default Menu;
