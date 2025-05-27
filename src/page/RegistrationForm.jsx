import { useState } from "react";
import { AiOutlineKey, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import axiosInstance from "../../ax";
import background from "../assets/background.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  // const [imageProfile, setImageProfile] = useState(null);
  const [message, setMessage] = useState(""); // To display success/error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageProfile(file); // Set the file directly
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("role", formData.role);
    // if (imageProfile) {
    //   data.append("imageProfile", imageProfile);
    // }

    try {
      // Send data to backend
      const response = await axiosInstance.post("/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-[900px] h-[600px] bg-white flex rounded-lg shadow-xl overflow-hidden">
          {/* Left Image Side */}
          <div className="w-1/2 h-full">
            <img
              src="https://img.freepik.com/free-photo/medium-shot-korean-woman-posing-with-face-cream_23-2150171941.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Form Side */}
          <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center font-poppins p-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl text-gray-800 font-pacifico">Register</h1>
              <p className="text-gray-600 text-sm mt-4">Create your account.</p>
            </div>

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 pr-10 outline-none"
                  required
                />
                <AiOutlineUser className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 pr-10 outline-none"
                  required
                />
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 pr-10 outline-none"
                  required
                />
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full text-black py-2 rounded-2xl h-11 bg-[#F5BC95] hover:bg-[#E89C69] transition-colors duration-200 tracking-wider"
              >
                Submit
              </button>

              {/* Sign In Link */}
              <div className="text-xs text-center mt-2">
                <span>Already have an account?</span>
                <Link to="/" className="text-blue-600 hover:text-blue-800 ml-1">
                  Sign In
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

export default RegistrationForm;
