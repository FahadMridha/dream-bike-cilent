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
        toast("Successfully create user", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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
        toast("Successfully create user", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        const name = user?.displayName;
        const email = user?.email;
        const role = "buyer";
        saveUserToDb(name, email, role);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  const saveUserToDb = (name, email, role) => {
    const user = { name, email, role };
    fetch("https://dream-bike-alpha-green.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreateUserEmail(email);
      });
  };

  return (
    <div className="bg-teal-900">
      <div className="h-[800px] flex  justify-center items-center ">
        <div className=" w-96 p-8 text-white rounded-lg">
          <h3 className="text-3xl text-center">Sign Up</h3>
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
                className="input bg-teal-900 border-gray-500 w-full max-w-xs"
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
                placeholder="Your  email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="input bg-teal-900 border-gray-500 w-full max-w-xs"
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
                className="select bg-teal-900 border-gray-500 w-full max-w-xs mt-2"
              >
                <option></option>
                <option>buyer</option>
                <option>seller</option>
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
                className="input bg-teal-900 border-gray-500 w-full mb-2  max-w-xs"
              />
              {errors.password && (
                <p className="text-red-600 ">{errors.password.message}</p>
              )}
            </div>
            <input
              className="btn bg-emerald-600 hover:bg-emerald-500 w-full"
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
            className="btn bg-emerald-600 hover:bg-emerald-500 w-full"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
