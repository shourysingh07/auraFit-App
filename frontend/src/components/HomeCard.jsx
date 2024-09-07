import { MdCurrencyRupee } from "react-icons/md";
import loader from "../assets/loading.gif";
import { Link } from "react-router-dom";

const HomeCard = ({ image, name, price, category, description,id }) => {
  return (
    <div className="min-w-[150px] opacity-100  m-8 h-21 w-40 shadow-slate-500 shadow-lg bg-transparent text-extrabold rounded-md font-semibold  flex-col justify-center">
      {name ? (
        <>
          <Link to={`/menu/${id}`}>
            <div className="min-h-[150px] hover:scale-105 p-1">
              <img src={image} className="rounded-sm " />
            </div>
            <div className="text-md">
              <p className="flex justify-center p-2 ">{description}</p>
              {/* <p className="flex justify-center">{name.toUpperCase()}</p> */}
              {/* <p className="flex justify-center">{category}</p> */}
              <p className="flex justify-center font-extrabold">
                <span className="text-bold pt-1 text-red-500">
                  <MdCurrencyRupee />
                </span>
                {price}
              </p>
            </div>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full ">
          <h1 className=" text-md">Loading...</h1>
          <div className="h-20 w-20">
            <img src={loader}></img>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomeCard;
