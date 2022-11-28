import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthPovider";
import useToken from "../../hooks/useToken";
import Spinner from "../shared/spinner/Spinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignIn, loading } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const [loginError, setLoginError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [token] = useToken(loginEmail);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }
  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const email = user?.email;
        // console.log(user);
        toast("Successfully user login", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setLoginEmail(email);
      })
      .catch((error) => {
        console.log(error.massage);
        setLoginError(error.message);
      });
  };
  const handlerGoogleSignIn = (provider) => {
    googleSignIn(provider)
      .then((result) => {
        const user = result.user;
        toast("Successfully user Login", {
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
        setLoginEmail(email);
        saveUserToDb(name, email, role);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  const saveUserToDb = (name, email, role) => {
    const user = { name, email, role };
    fetch(" https://dream-bike-alpha-green.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoginEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center ">
      <div className=" w-96 p-8 bg-green-500 rounded-lg">
        <h3 className="text-xl text-center">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              {...register("email", {
                required: "Email Address is required",
              })}
              placeholder="email"
              type="email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "password should be at least 6 carecter must",
                },
              })}
              placeholder="password"
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="label-text"> Forgate password?</span>
            </label>
          </div>
          <input
            className="btn bg-green-600 hover:bg-green-700 w-full"
            value="Login"
            type="submit"
          />
        </form>
        <div>{loginError && <p className="text-red-600">{loginError}</p>}</div>
        <p>
          New to Dream Bike ?
          <Link to="/signup" className="text-primary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>

        <button
          onClick={() => handlerGoogleSignIn(googleProvider)}
          className="btn bg-green-600 hover:bg-green-700 w-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
