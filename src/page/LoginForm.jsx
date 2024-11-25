import React from "react";
import { AiOutlineKey, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const onFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
  };

  const navigate = useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main
      className="w-full font-poppins min-h-screen bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/elements-relaxing-massage-spa_23-2148176935.jpg?t=st=1730713570~exp=1730717170~hmac=909ac2f5fe863292ff688b6d80cafc48fd9a0c0843f1308f7e37ac728b931a8c&w=1380')]
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
                LOGIN FORM
              </h1>
            </div>
            <form onSubmit={onFinish} className="space-y-4 px-8">
              <div className="pt-5">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-b border-black focus:border-black outline-none py-2"
                    required
                  />
                  <AiOutlineMail className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative w-full pt-4">
                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    className="w-full border-b mb-4 border-black focus:border-black outline-none py-2"
                    required
                  />
                  <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex font-poppins pb-4 ">
                  <h1>Belum punya akun? </h1>

                  <a
                    href="/registrasi"
                    className="text-blue-600 hover:text-blue-800 transition "
                  > 
                     Registrasi
                  </a>
                </div>
                <button  onClick={handleLogin}
                  type="submit"
                  className="w-full bg-black text-white py-2  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Login
                </button>
              </div>
            </form>
            {/* tambahin  */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
