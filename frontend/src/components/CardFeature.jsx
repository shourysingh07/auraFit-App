import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToCart } from "../features/productSlice";
import { useDispatch,useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CardFeature = ({ image, name, price, category, description, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
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
        console.log('error.message');
      }
    }
    dispatch(addToCart({ image, name, price, category, description, _id: id }));
  };

  return (
    <div className="p-2 m-4 h-21 w-60 min-w-[240px] shadow-slate-500 shadow-md border-t-2 text-extrabold rounded-md font-semibold  flex-col justify-center bg-white ">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="min-h-[120px] h-[150px] w-[150px] flex justify-center items-center m-auto hover:scale-110">
              <img src={image} className="rounded-sm h-full w-full" />
            </div>
            <div className="text-md overflow-hidden ">
              <p className=" whitespace-nowrap ">{description}</p>
              <p className="">{name.toUpperCase()}</p>
              {/* <p className="">{category.toUpperCase()}</p> */}
              <p className="flex font-medium text-2xl">
                <span className="text-extrabold   font-extrabold pt-1 text-red-500">
                  <MdCurrencyRupee />
                </span>
                {price}
              </p>
            </div>
          </Link>
          <div className="p-2">
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center  bg-yellow-500 w-full mt-2 p-2  rounded"
            >
              Add Cart
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full ">
          <h1 className="text-blue-500 text-md">Loading...</h1>
        </div>
      )}
    </div>
  );
};
export default CardFeature;
