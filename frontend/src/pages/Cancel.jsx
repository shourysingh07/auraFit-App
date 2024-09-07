import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="">
      <div className=" mt-20 bg-red-200 flex-col w-full max-w-md m-auto h-40 flex justify-center items-center font-semibold text-lg">
        <p>Payment Cancelled</p>
        <Link to="/home">
          <a className=" underline text-blue-800">Go To Home</a>
        </Link>
      </div>
    </div>
  );
};
export default Cancel;
