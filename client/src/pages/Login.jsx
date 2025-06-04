import React, { useContext, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex flex-col w-1/2 gap-10 justify-center items-center ">
          <div className="text-4xl font-bold text-[#EDA415]">
            <div className="md:ml-10">Sign In to</div>
            <div>Your Account</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className=" relative items-center">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="w-[428px] pl-12 px-3 py-3 border border-gray-800"
                  placeholder="Email"
                  required
                />
                <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
              </div>

              <div className=" relative items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-[428px] pl-12 px-3 py-3 border border-gray-800"
                  placeholder="Password"
                  required
                />
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
              </div>
            </div>
            <div className="underline  text-center mt-8">forgot password?</div>
            <div className=" text-center">
              <button
                type="submit"
                className=" border 1px solid black rounded-full px-18 py-3 bg-[#EDA415] text-white mt-6"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col w-1/2  bg-blue-600 items-center justify-center gap-10 text-white ">
          <div className="font-bold text-[56px] ">Hello Friend!</div>
          <div className="flex text-[26px] text-center">
            Enter your personal details and <br /> start your journey with us
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="border 1px solid black rounded-full px-18 py-3"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
