import { useLoaderData } from "react-router-dom";
import BookingModal from "./bookingModal/BookingModal";
import ProductsCard from "./productsCard/ProductsCard";

const AllProducts = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductsCard key={product._id} product={product}></ProductsCard>
        ))}
      </div>
      <div>
        {products.map((product) => (
          <BookingModal product={product}></BookingModal>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
