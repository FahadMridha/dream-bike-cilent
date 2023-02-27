import React from "react";
import toast from "react-hot-toast";

const ProductsCard = ({ product }) => {
  const handlerReporting = (product) => {
    //   save a reported product
    fetch("https://dream-bike-alpha-green.vercel.app/reported", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorazition: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(`${product.ProductName} is reported to admin`);
        }
      });
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {product.ProductName}</h2>
        <p>Location: {product.location}</p>
        <p>Resale Price :{product.resalePrice} BDT</p>
        <p>Original Price: {product.originalPrice} BDT</p>
        <p>Year of Use: {product.yearOfUse}</p>
        <p>Post Date: {product.postTime}</p>
        <p>Seller's name: {product.sellerName}</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vero
          neque eveniet commodi ducimus possimus exercitationem ad atque
          molestias corrupti earum aliquam quisquam, esse quas, sunt minus
          minima ipsa fugit dolore veritatis itaque saepe reiciendis. Explicabo
          temporibus ipsa saepe. Odit sunt maiores quas, aspernatur sit tempora
          quisquam error repellendus molestias nobis nam ipsum minus suscipit
          incidunt a deserunt, voluptates maxime! Quos quaerat eveniet iure
          sapiente. Cupiditate aspernatur, fugit consequatur cum nobis magni
          adipisci sapiente vitae ut a ea animi? Accusantium minima totam ipsum
          qui odit, porro incidunt nobis, quam rerum suscipit velit nam animi
          voluptas possimus numquam tenetur earum modi tempore eveniet
          praesentium quis eum architecto ab quod? Qui amet unde odit, ea
          tempora dolorum quam natus pariatur, architecto cum, cupiditate
          repudiandae? Quos quis autem consequuntur atque nisi? Esse, fugit
          dolor placeat consequuntur, reiciendis eius rem illo officia earum
          facilis harum commodi consectetur totam, aut error voluptatum!
          Perferendis excepturi iste temporibus neque distinctio ex deserunt.
          Labore sint ratione eius? Perspiciatis adipisci recusandae ab
          dignissimos amet illum consectetur eum, voluptas dolore provident
          fugiat in at, deleniti deserunt cum voluptatem esse? Porro, cupiditate
          ut! Repellendus harum nesciunt corporis facilis excepturi aut dolorem
          atque esse, ad sapiente totam ipsa ullam, eaque blanditiis magnam.
        </p>

        <div className="card-actions justify-end">
          <button
            onClick={() => handlerReporting(product)}
            className="btn btn-warning"
          >
            Reporte
          </button>
          <label
            htmlFor="booking-modal"
            className="btn bg-green-800 hover:bg-green-700"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
