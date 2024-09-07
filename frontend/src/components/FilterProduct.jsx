import { CgGym } from "react-icons/cg";

const FilterProduct = ({ category, onClick, selected }) => {
  // console.log(selected);
  return (
    <div onClick={onClick}>
      <div className="flex-row md:justify-center md:items-center m-2   md:max-h-[95px] max-w-[75px]   mb-30 cursor-pointer">
        <div
          className={`md:text-4xl md:min-w-[0px] min-w-[85px] ${
            selected ? "text-yellow-500" : "text-black"
          }  hover:text-yellow-500`}
        >
          <CgGym
            className={`${
              selected ? " bg-black" : "bg-yellow-500"
            } h-full w-full rounded-full p-5 hover:bg-black`}
          />
        </div>
        <div className="flex justify-center items-center ">
          <p className={`font-semibold ${selected ? "font-bold " : ""}`}>
            {category.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};
export default FilterProduct;
