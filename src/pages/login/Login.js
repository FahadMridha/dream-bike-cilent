import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthPovider";
import useToken from "../../hooks/useToken";
import SmallSpinner from "../shared/spinner/SmallSpinner";

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
  const from = location.state?.from?.pathname || "/home";

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
        setLoginEmail(email);
      });
  };

  return (
    <div className="bg-teal-900">
      <div className="h-[800px] flex justify-center items-center ">
        <div className=" w-96 p-8 text-white rounded-lg">
          <h3 className="text-3xl ">Welcome to Dream Bike </h3>
          <h3 className="text-xl   mb-5">Please login to continue </h3>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full mb-4 max-w-xs">
              <input
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="Email address"
                type="email"
                className="input bg-teal-900 border-gray-500 w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password should be at least 6 carecter must",
                  },
                })}
                placeholder="Password"
                type="password"
                className="input bg-teal-900 border-gray-500 w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
              <label className="label">
                <span className=""> Forgate password?</span>
              </label>
            </div>

            <button
              className="btn bg-emerald-400 hover:bg-emerald-500 w-full"
              value="Login"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">
                  <SmallSpinner />
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
          <p>
            No account ?
            <Link to="/signup" className="ml-1 text-emerald-400">
              Sign up now
            </Link>
          </p>
          <div className="divider">OR</div>

          <button
            onClick={() => handlerGoogleSignIn(googleProvider)}
            className="btn bg-emerald-400 hover:bg-emerald-500 w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">
                <SmallSpinner />
              </span>
            ) : (
              "CONTINUE WITH GOOGLE"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
