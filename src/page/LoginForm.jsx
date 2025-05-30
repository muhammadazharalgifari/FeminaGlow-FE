import { useState } from "react";
import { AiOutlineKey, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../ax";
import background from "../assets/background.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fungsi Menangani Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Mengirim Request Post Ke API Untuk Login
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      // Jika login berhasil, simpan token dan role ke localStorage
      const { token, role } = response.data; // Asumsi backend mengirim token dan role

      if (token) {
        localStorage.setItem("token", token); // Menyimpan token JWT
        localStorage.setItem("role", role); // Menyimpan role
        localStorage.setItem("email", email);

        // Navigasi berdasarkan role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/dashboard");
        }
      }

      // Menyimpan Pesan Dari Server
      setMessage(response.data.message);
      console.log("Login Success", response.data);
    } catch (error) {
      // Menangani Error Ketika Request Tidak Berhasil
      setMessage("Email atau Password Salah");
      console.log("Login Error", error);
    }
  };

  return (
    <main
      className="w-full font-poppins min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-[900px] h-[600px] bg-white flex rounded-lg shadow-xl overflow-hidden">
          {/* Left Image Side */}
          <div className="w-1/2 h-full">
            <img
              src="https://img.freepik.com/free-photo/medium-shot-korean-woman-posing-with-face-cream_23-2150171941.jpg?t=st=1730713328~exp=1730716928~hmac=f40479ac9ddbfe47ec138e6e2c92358d9109fa5c44ad00330e3843a8091c752a&w=740"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Form Side */}
          <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center font-poppins p-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl text-gray-800 font-pacifico">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-sm mt-4">
                Login to your account.
              </p>
            </div>

            <form className="w-full space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-black py-2 pr-10 outline-none"
                  required
                />
                <AiOutlineMail className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-black py-2 pr-10 outline-none"
                  required
                />
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full text-white py-2 bg-[#E89C69] hover:bg-[#D17E4D] transition-colors duration-500 rounded-2xl h-11 tracking-wider"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <div className="text-xs text-center mt-2">
                <span>Don't have an account?</span>
                <Link
                  to="/registrasi"
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  Sign Up
                </Link>
              </div>

              {/* Message */}
              {message && (
                <p className="text-center mt-2 text-red-500">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
