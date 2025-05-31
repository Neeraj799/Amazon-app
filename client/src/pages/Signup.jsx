import React, { useContext, useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ name, email, password });
  };
  return (
    <div>
      <div className="flex h-screen">
        {/*Left side */}
        <div className="flex flex-col w-1/2  bg-blue-600 items-center justify-center gap-10 text-white ">
          <div className="font-bold text-[56px] ">Welcome Back!</div>
          <div className="flex text-[26px] text-center">
            To keep connected with us please login with your personal info
          </div>
          <button className="border 1px solid black rounded-full px-18 py-3">
            SIGN IN
          </button>
        </div>

        {/*Right side */}

        <div className="flex flex-col w-1/2 gap-10 justify-center items-center text-center ">
          <div className="text-4xl font-bold text-[#EDA415]">
            Create Account
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className=" relative items-center">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-[428px] pl-12 px-3 py-2 border border-gray-800"
                  placeholder="Name"
                  required
                />
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
              </div>

              <div className=" relative items-center">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="w-[428px] pl-12 px-3 py-2 border border-gray-800"
                  placeholder="Email"
                  required
                />
                <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
              </div>

              <div className=" relative items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="w-[428px] pl-12 px-3 py-2 border border-gray-800"
                  placeholder="Password"
                  required
                />
                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
              </div>
            </div>
            <button
              type="submit"
              className=" border 1px solid black rounded-full px-18 py-3 bg-[#EDA415] text-white"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
