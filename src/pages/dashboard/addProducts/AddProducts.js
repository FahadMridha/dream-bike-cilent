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
            name: data.name,
            location: data.location,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
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
          //   save a doctor
          fetch("http://localhost:5000/allProducts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              //   authorazition: `bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success(`${product.name} is added Successfully`);

                navigate("/dashboard/myproduct");
              }
            });
        }
      });
  };

  return (
    <div className=" w-96 p-8">
      <h2 className="text-4xl">ADD PRODUCT</h2>

      <form onSubmit={handleSubmit(handlarAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>

          <input
            placeholder="Product Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
            <span className="label-text">Name</span>
          </label>

          <input
            placeholder="Your Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
            <span className="label-text">Category id</span>
          </label>
          <select
            {...register("categoryID")}
            className="select input-bordered w-full max-w-xs"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
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
          className="btn btn-accent w-full mt-2"
          value="ADD PRODUCT"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProducts;
