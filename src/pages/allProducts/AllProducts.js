import { useLoaderData } from "react-router-dom";
import BookingModal from "./bookingModal/BookingModal";
import ProductsCard from "./productsCard/ProductsCard";

const AllProducts = () => {
  const products = useLoaderData();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-5 lg:m-16">
        {products &&
          products.map((product) => (
            <ProductsCard key={product._id} product={product}></ProductsCard>
          ))}
      </div>
      <div>
        {products &&
          products.map((product) => (
            <BookingModal key={product._id} product={product}></BookingModal>
          ))}
      </div>
    </>
  );
};

export default AllProducts;
