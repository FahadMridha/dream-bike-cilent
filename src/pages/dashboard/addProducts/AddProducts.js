import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthPovider";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const handlarAddProduct = (data) => {
    console.log(data);
    const img = data.img[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const product = {
            email: user?.email,
            ProductName: data.productName,
            condition: data.condition,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            phoneNumber: data.phoneNumber,
            location: data.location,
            description: data.description,
            yearOfPurchase: data.yearOfPurchase,
            yearOfUse: data.yearOfUse,
            categoryID: data.categoryID,
            postTime: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(Date.now()),
            image: imgData.data.url,
            sellerName: data.sellerName,
          };
          //   save a new Product
          fetch("http://localhost:5000/allProducts", {
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
                toast.success(`${product.ProductName} is added Successfully`);
                navigate("/dashboard/myproduct");
              }
            });
        }
      });
  };

  return (
    <div className=" w-96 p-8 bg-green-600">
      <h2 className="text-4xl">ADD PRODUCT</h2>

      <form onSubmit={handleSubmit(handlarAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>

          <input
            placeholder="Product Name"
            type="text"
            {...register("productName", {
              required: "Name is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.productName && (
            <p className="text-red-600">{errors.productName.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Condition</span>
          </label>
          <select
            placeholder="Product Condition"
            type="text"
            {...register("condition", {
              required: "Price is required",
            })}
            className="select input-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Pick Product Condition
            </option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
          {errors.condition && (
            <p className="text-red-600">{errors.condition.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label for="phone">Enter your phone number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input input-bordered w-full max-w-xs"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          ></input>
          {errors.phoneNumber && (
            <p className="text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs p-2">
          <label for="phone">Your Product Description</label>
          <textarea
            className="textarea textarea-bordered w-full max-w-xs"
            placeholder="Product Description "
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            placeholder="Your Location"
            type="text"
            {...register("location", {
              required: "Location is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.location && (
            <p className="text-red-600">{errors.location.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>

          <input
            placeholder="Resale Price"
            type="text"
            {...register("resalePrice", {
              required: "Price is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.resalePrice && (
            <p className="text-red-600">{errors.resalePrice.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>

          <input
            placeholder="Original Price"
            type="text"
            {...register("originalPrice", {
              required: "Price is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.originalPrice && (
            <p className="text-red-600">{errors.originalPrice.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Year Of Use</span>
          </label>

          <input
            placeholder="Year Of Use"
            type="text"
            {...register("yearOfUse", {
              required: "This is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.yearOfUse && (
            <p className="text-red-600">{errors.yearOfUse.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Year Of Purchase</span>
          </label>

          <input
            placeholder="Year of Purchase"
            type="text"
            {...register("yearOfPurchase", {
              required: "This is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.yearOfPurchase && (
            <p className="text-red-600">{errors.yearOfPurchase.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("categoryID")}
            className="select input-bordered w-full max-w-xs"
          >
            <option disabled selected>
              <span>Pick one if you want</span>
            </option>
            <option value="1">YAMAHA</option>
            <option value="2">SUZUKI</option>
            <option value="3">HONDA</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>

          <input
            placeholder="Product Photo"
            type="file"
            {...register("img", {
              required: "Photo  is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.img && <p className="text-red-600">{errors.img.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>

          <input
            placeholder="Your Name"
            type="text"
            {...register("sellerName", {
              required: "Name is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.sellerName && (
            <p className="text-red-600">{errors.sellerName.message}</p>
          )}
        </div>

        <input
          className="btn bg-green-800 hover:bg-green-700 w-full mt-2"
          value="ADD PRODUCT"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProducts;
