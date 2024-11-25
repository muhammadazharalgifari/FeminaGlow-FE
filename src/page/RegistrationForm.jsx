import React from "react";
import {
  AiOutlineIdcard,
  AiOutlineKey,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const onFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
  };

  // navigate
  const navigate = useNavigate();
  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/elements-relaxing-massage-spa_23-2148176935.jpg?t=st=1730713570~exp=1730717170~hmac=909ac2f5fe863292ff688b6d80cafc48fd9a0c0843f1308f7e37ac728b931a8c&w=1380')]
         "
    >
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <div className="w-[900px] h-[600px] bg-white flex justify-center items-center rounded-lg shadow-xl">
          <div className="w-[500px] h-full bg-blue-600 flex justify-center items-center rounded-l-lg">
            {/* Add any content or image here if needed */}
            <img
              src="https://img.freepik.com/free-photo/medium-shot-korean-woman-posing-with-face-cream_23-2150171941.jpg?t=st=1730713328~exp=1730716928~hmac=f40479ac9ddbfe47ec138e6e2c92358d9109fa5c44ad00330e3843a8091c752a&w=740"
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="w-[500px] h-full bg-white rounded-r-lg">
            <div className="flex justify-center p-10">
              <h1 className="text-2xl font-semibold text-gray-800">
                REGISTRATION FORM
              </h1>
            </div>
            <form onSubmit={onFinish} className="space-y-4 px-8">
              <div className="flex space-x-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full border-b border-black focus:border-black outline-none py-2 pr-10"
                    required
                  />
                  {/* First Name Icon */}
                  <AiOutlineUser className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Last Name Input */}
                <div className="relative w-full">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full border-b border-black focus:border-black outline-none py-2 pr-10"
                    required
                  />
                  {/* Last Name Icon */}
                  <AiOutlineIdcard className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full border-b border-black focus:border-black outline-none py-2 pr-10"
                  required
                />
                {/* Icon */}
                <AiOutlineUser className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full border-b border-black focus:border-black outline-none py-2"
                  required
                />
                {/* Icon */}
                <AiOutlineMail className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div>
                <select
                  name="gender"
                  className="w-full border-b border-black focus:border-black outline-none py-2 text-gray-500"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border-b border-black focus:border-black outline-none py-2"
                  required
                />
                {/* Icon */}
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full border-b mb-4 border-black focus:border-black outline-none py-2"
                  required
                />
                {/* Icon */}
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleRegister}
                type="submit"
                className="w-full bg-black text-white py-2  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;
