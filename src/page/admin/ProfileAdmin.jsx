import React, { useState, useEffect } from "react";
import axiosInstance from "../../../ax";

const ProfileAdmin = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageProfile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUser(response.data.data);
        setFormData({
          username: response.data.data.username || "",
          email: response.data.data.email || "",
          password: "",
          confirmPassword: "",
          imageProfile: null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      imageProfile: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);

      if (formData.imageProfile) {
        formDataToSend.append("imageProfile", formData.imageProfile);
      }

      const response = await axiosInstance.put("/api/update/user", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <main className="flex justify-center w-full h-screen bg-slate-500 items-center ">
    <div className=" w-[400px] h-[650px] p-6 bg-white rounded-lg shadow-md  ">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Profile Admin
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Profile Image:
          </label>
          <input
            type="file"
            name="imageProfile"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-blue-500 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-white rounded-lg ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-500 font-medium">{message}</p>
      )}

     
    </div>
    </main>
  );
};

export default ProfileAdmin;
