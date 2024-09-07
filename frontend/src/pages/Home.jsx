import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import { MdElectricBike } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useRef, useState, useEffect } from "react";
import CardFeature from "../components/CardFeature";
import AllProduct from "../components/AllProduct";
import loader from "../assets/loading.gif";
import { Link } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const homeProductList = productData.slice(5, 10);
  const loadingArray = new Array(5).fill(null);
  const vegetables = productData.filter(
    (product) => product.category === "dumbbells"
  );
  // console.log(vegetables);
  const categories = [];
  productData.forEach((element) => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  // console.log(categories);

  // const [filterData, setFilterData] = useState([...productData]);
  // const [selectedCategory,setSelectedCategory]=useState(null)

  // useEffect(() => {
  //   setFilterData(() => {
  //     return [...productData];
  //   });
  // }, [productData]);

  // const handleFilterData = (category) => {
  //   setFilterData(() => {
  //     const data = productData.filter(
  //       (product) => product.category === category
  //     );
  //     // console.log(data);
  //     return [...data];
  //   });
  // };

  const SlideProductRef = useRef();
  const nextProduct = () => {
    SlideProductRef.current.scrollLeft += 200;
  };
  const prevProduct = () => {
    SlideProductRef.current.scrollLeft -= 200;
  };

  // if (!homeProductList[0])
  // {
  //   return (
  //     <div className="bg-slate-100 flex text-4xl justify-center items-center w-full h-screen ">
  //       <div className="bg-white p-8 rounded-lg w-[800px]">
  //         <div className="flex justify-center items-center h-full ">
  //           <h1 className=" text-md">Loading...</h1>
  //           <div className="h-20 w-20 ">
  //             <img src={loader}></img>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="">
      <div className="md:flex">
        <div className="md:w-1/2 ">
          <div className="flex ml-6 mt-4 w-72 p-3 rounded-full h-200 bg-red-500 justify-center shadow-slate-300 shadow-md">
            <p className="text-2xl font-semibold text-yellow-200">
              Fast Delivery
            </p>
            <MdElectricBike className="text-4xl font-semibold ml-3 text-yellow-200 " />
          </div>
          <h1 className="text-7xl font-bold text-slate-500 flex flex-wrap pl-6 mt-4  ">
            Fitness Equipment
            <span className=" text-7xl font-bold text-slate-500 ">
              Built to Perfection
            </span>
          </h1>
          <p className="text-2xl  ml-6 mt-4 font-semibold text-slate-800">
            Enhance your fitness journey with AuraFit EShop, your ultimate
            destination for premium gym equipment in India. Explore a diverse
            selection of high-quality treadmills, elliptical trainers,
            weightlifting benches, dumbbells, and more. We prioritize user
            feedback to offer tailored gear that meets your fitness goals.
            Experience excellence with us and achieve your fitness aspirations
            affordably and effectively.
          </p>
          <Link to={'/allProduct'}>
            <div className="flex ml-6 mt-4 w-72 p-3 rounded-lg bg-red-500 justify-center shadow-slate-300 shadow-md">
              <button
                type="button"
                className="text-2xl font-semibold text-white "
              >
                Order Now
              </button>
            </div>
          </Link>
        </div>
        {/* <div className="md:w-1/2 flex flex-wrap justify-center  ">
          {homeProductList[0]
            ? homeProductList.map((product) => {
                return (
                  <HomeCard
                    key={product._id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    description={product.description}
                    id={product._id}
                  />
                );
              })
            : loadingArray.map((p, index) => {
                return <HomeCard key={index} />;
              })}
        </div> */}
      </div>

      <div className="ml-6 mt-4 p-3 ">
        <div className="flex ">
          <h2 className="font-bold text-3xl">DUMBBELLS</h2>
          <div className="ml-auto mr-10 text-3xl  p-2 ">
            <button
              onClick={prevProduct}
              className="hover:bg-slate-500 bg-slate-200 mr-3 p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="hover:bg-slate-500 bg-slate-200 p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all bg-slate-100 "
          ref={SlideProductRef}
        >
          {vegetables.map((vegetable) => {
            return (
              <CardFeature
                key={vegetable._id}
                image={vegetable.image}
                name={vegetable.name}
                price={vegetable.price}
                category={vegetable.category}
                description={vegetable.description}
                id={vegetable._id}
              />
            );
          })}
        </div>
      </div>

      <AllProduct />
    </div>
  );
};
export default Home;
