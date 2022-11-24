import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthPovider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [token] = useToken(createUserEmail);
  if (token) {
    navigate("/");
  }
  const handlerSignUp = (data) => {
    console.log(data);
    setSignupError("");
    const { email, password, name, role } = data;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully create user");
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUserToDb(name, email, role);
          })
          .catch((error) => console.log(error));
        console.log(user);
      })
      .catch((error) => {
        setSignupError(error.message);
        console.log(error);
      });
  };
  const handlerGoogleSignUp = (googleProvider) => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  const saveUserToDb = (name, email, role) => {
    const user = { name, email, role };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreateUserEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex  justify-center items-center ">
      <div className=" w-96 p-8 bg-green-500 rounded-lg">
        <h3 className="text-xl text-center">Sign Up</h3>
        <form onSubmit={handleSubmit(handlerSignUp)}>
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
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              placeholder="email"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">User Role</span>
            </label>
            <select
              type="text"
              {...register("role", {
                required: "Role is required",
              })}
              className="select w-full max-w-xs mt-2"
            >
              <option></option>
              <option>Buyer</option>
              <option>Seller</option>
            </select>
            {errors.role && (
              <p className="text-red-600">{errors.role.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              placeholder="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "must be atleast 6 disits" },

                pattern: {
                  value: /[A-Z]/,
                  message: "password must be capital letter",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <input
            className="btn bg-green-600 hover:bg-green-700 w-full mt-2"
            value="Sign Up"
            type="submit"
          />
        </form>
        {signupError && <p className="text-red-600">{signupError}</p>}
        <p>
          Alreday have an account ?
          <Link to="/login" className=" text-lg font-semibold">
            Please login
          </Link>
        </p>
        <div className="divider">OR</div>

        <button
          onClick={() => handlerGoogleSignUp(googleProvider)}
          className="btn  bg-green-600 hover:bg-green-700 w-full "
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
