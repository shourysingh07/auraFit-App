import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterProduct from "../components/FilterProduct";
import CardFeature from "../components/CardFeature";

const AllProduct = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const categories = [];
  productData.forEach((element) => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  // console.log(categories);

  const [filterData, setFilterData] = useState([...productData]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setFilterData(() => {
      return [...productData];
    });
  }, [productData]);

  const handleFilterData = (category) => {
    setFilterData(() => {
      const data = productData.filter(
        (product) => product.category === category
      );
      setSelectedCategory(() => {
        // console.log(category);
        return category;
      });
      // console.log(data);
      return [...data];
    });
  };

  return (
    <div>
      <div className="ml-6 mt-4 mb-5 p-3 ">
        <div className="md:h-20 bg-slate-200 font-semibold flex items-center justify-center rounded text-2xl">
          Filter Product By Category Using bellow Buttons
        </div>
        <div className="flex mt-2">
          <h2 className="font-bold text-3xl">All Products</h2>
        </div>
        <div className="flex gap-5 mt-3 items-center md:justify-center overflow-scroll scrollbar-none">
          {categories.map((category) => {
            let selected = false;
            if (selectedCategory && category === selectedCategory) {
              selected = true;
            }
            return (
              <FilterProduct
                key={category}
                category={category}
                onClick={() => handleFilterData(category)}
                selected={selected}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap bg-slate-100 justify-center items-center">
        {filterData.map((product) => {
          return (
            <CardFeature
              key={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              description={product.description}
              id={product._id}
            />
          );
        })}
      </div>
    </div>
  );
};
export default AllProduct;
