import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MovingComponent from "react-moving-text";
import { AuthContext } from "../AuthContex/AuthProvider";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check if the email domain is right
    if (!email.endsWith("@acigodrej.com")) {
      setError("Invalid email domain. Please use a valid email address.");
      return; // Stop further execution
    }

    createUser(email, password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(name)
        .then(() => {
          const userInfo = {
            name,
            email,
            password,
            role: "User",
          };
          fetch("https://dbb-server-cd2o.onrender.com/addUser", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/account");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    });
  };
  return (
    <div className="flex min-h-[100vh] items-center flex-1 flex-col justify-center px-6 py-10 lg:px-8 overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm overflow-hidden">
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="ACI Godrej Agrovet Private Ltd"
          title=""
        />

        <MovingComponent
          type="fadeInFromLeft"
          duration="3000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
          className="text-center text-2xl font-bold leading-9 tracking-wide text-gray-800 "
        >
          <span className="text-lime-500"> Daily </span>
          <span className="text-sky-500"> Bank </span>
          <span className="text-pink-500"> Satetement</span>
        </MovingComponent>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form
          onSubmit={handleRegister}
          className="space-y-5"
          action="#"
          method="POST"
        >
          <div></div>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="username"
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="example@acigodrej.com"
              name="email"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              // onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </label>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            <p className="text-red-500">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
