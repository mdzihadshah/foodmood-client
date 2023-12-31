import React, { useContext, useState } from "react";
import loginImage from "../../assets/login.png";
import { FaFacebook, FaGithub, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  // recived and distructure fuction from Authcontext
  const { signIn, signWithGoogle, signWithgithub } = useContext(AuthContext);
  // error state for Login field form
  const [error, setError] = useState("");
  // route location
  const location = useLocation();
  const navigate = useNavigate();
  // previous router path bfore redirecrt
  const from = location.state?.from?.pathname || "/";

  // user sign in Handler
  const handleSignin = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    form.reset();

    // Firebase function call ( signInWithEmailAndPassword ) arguments : email, password
    signIn(email, password)
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const crrorr = error.message;
        console.log(crrorr);
        setError("Your email address or passwors doesn't match");
      });
  };

  const handleGoogle = (event) => {
    // Firebase function call ( signInWithPopup )
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((erorr) => {
        const error = erorr.message;
      });
  };
  const handleGithub = (event) => {
    // Firebase function call ( signInWithPopup )
    signWithgithub()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((erorr) => {
        const error = erorr.message;
      });
  };

  return (
    <div>
      <div className="hero min-h-screen px-2 md:px-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-lg  bg-base-100">
            <form onSubmit={handleSignin} className="card-body">
              <div className="form-control">
                <h2 className="text-2xl text-rose-500 tracking-wide font-bold text-center mb-3">
                  User Login
                </h2>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="email"
                  className="input input-bordered bg-rose-50 rounded-full ps-6"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="*******"
                  className="input input-bordered bg-rose-50 rounded-full ps-6"
                />
                <label className="label">
                  <Link to="/register">
                    <a className=" link link-hover">
                      Are you new ?{" "}
                      <span className="text-rose-700">register here.</span>
                    </a>
                  </Link>
                </label>
                <p className="text-red-500">{error}</p>
              </div>
              <div className="form-control mt-6">
                <button className="btn rounded-full bg-rose-500">Login</button>
              </div>
              <div>
                <h1 className=" py-3 text-center">Sign in with</h1>
                <div className="flex gap-6 mt-2 text-2xl  justify-center">
                  <Link
                    onClick={handleGoogle}
                    className="p-4 border-red-500 border-2 rounded-full text-rose-500"
                    to="">
                    <FaGoogle></FaGoogle>
                  </Link>
                  <Link
                    onClick={handleGithub}
                    className="p-4 border-red-500 border-2 rounded-full text-rose-500">
                    <FaGithub></FaGithub>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center lg:text-left">
            <img className="w-10/12" src={loginImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
