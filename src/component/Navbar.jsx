import React from "react";
import { useEffect, useState } from "react";
import { useCart } from "../page/Cart";
import axiosInstance from "../../ax";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { BiLogOut, BiPurchaseTag, BiShoppingBag, BiUser } from "react-icons/bi";
import { Button, Dropdown, Form, Input, Menu, Modal, Upload } from "antd";
import { FcAddImage } from "react-icons/fc";
import logoBCA from "../assets/BCA.png";
import logoBNI from "../assets/BNI.png";
import logoBRI from "../assets/BRI.png";
import logoMandiri from "../assets/MANDIRI.png";
import { AiFillSave } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Navbar = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    grandTotalPrice,
    refetchCart,
    transactionId,
  } = useCart();
  const [showPopUp, setShowPopUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [transactions, setTransactions] = useState([]);
  const [modalTransaksi, setModalTransaksi] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageProfile: "",
  });

  useEffect(() => {
    if (isLogin) {
      refetchCart();
    }
  }, [isLogin, refetchCart]);

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      once: true,
    });
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUser(response.data.data);
        setFormData({
          username: response.data.data.username || "",
          email: response.data.data.email || "",
          password: "",
          confirmPassword: "",
          imageProfile: response.data.data.imageProfile || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (isLogin) {
      const fetchTransactions = async () => {
        try {
          const response = await axiosInstance.get("/api/auth-transactions");
          setTransactions(response.data.data); // Menyimpan data transaksi
          // console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();
    }
  }, [isLogin]);

  const handleUpdateUser = async (values) => {
    try {
      const updatedData = new FormData();

      updatedData.append("username", values.username);
      updatedData.append("email", values.email);
      updatedData.append("password", values.password);
      updatedData.append("confirmPassword", values.confirmPassword);

      if (values.imageProfile instanceof File) {
        updatedData.append("imageProfile", values.imageProfile);
      } else if (formData.imageProfile instanceof File) {
        updatedData.append("imageProfile", formData.imageProfile);
      }

      // Mengirim data ke server
      const response = await axiosInstance.put(
        "/api/update/user",
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Modal.success({
          title: "Update Successful",
          content: "Your profile has been updated successfully!",
        });
        setUser(response.data.data);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Modal.error({
        title: "Update Failed",
        content:
          error.response?.data?.message || "Failed to update user profile.",
      });
    }
  };

  const handleMinusQuantity = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      await updateQuantity(itemId, currentQuantity - 1);
      refetchCart();
    }
  };

  const handlePlusQuantity = async (itemId, currentQuantity) => {
    await updateQuantity(itemId, currentQuantity + 1);
    refetchCart();
  };

  const handleRiwayatTransaksi = () => {
    setModalTransaksi(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleOpenCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
    return false;
  };

  const handleCheckout = async () => {
    if (!imageFile) {
      Modal.error({
        title: "Upload Gagal",
        content: "Silakan unggah gambar terlebih dahulu.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("imageTransaction", imageFile);

    try {
      const response = await axiosInstance.put(
        `/api/update-transaction/${transactionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Modal.success({
          title: "Checkout Berhasil",
          content: "Gambar transaksi berhasil diunggah.",
        });
        setIsCheckoutModalOpen(false);
        refetchCart();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Modal.error({
        title: "Checkout Gagal",
        content: error.response?.data?.message || "Gagal melakukan checkout.",
      });
    }
  };

  // Menu
  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2 font-poppins w-full">
          <BiUser className="text-2xl" />
          <span className="font-semibold text-white bg-black p-2 rounded-full w-full text-center">
            Profile
          </span>
        </div>
      ),
      onClick: showModal,
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2 font-poppins w-full">
          <BiPurchaseTag className="text-2xl" />
          <span className="font-semibold text-white bg-black p-2 rounded-full w-full text-center">
            Transaction History
          </span>
        </div>
      ),
      onClick: handleRiwayatTransaksi,
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2 font-poppins w-full">
          <BiLogOut className="text-2xl" />
          <span className="font-semibold text-white bg-black p-2 rounded-full w-full text-center">
            Logout
          </span>
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="h-24 flex items-center justify-between mx-20">
        <Link to={"/dashboard"}>
          <div className="w-[190px] font-pacifico text-3xl">
            <h1 className="text-black select-none">Femina Glow.</h1>
          </div>
        </Link>
        <div className="flex-1 flex justify-center">
          <nav className="flex gap-6 font-poppins text-black items-center cursor-pointer font-medium">
            <ScrollLink to="home" smooth={true} duration={500}>
              Home
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500}>
              Tentang Kami
            </ScrollLink>
            <ScrollLink to="product" smooth={true} duration={500}>
              Produk
            </ScrollLink>
            <ScrollLink to="promo" smooth={true} duration={500}>
              Promo
            </ScrollLink>
          </nav>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="bg-white p-2 rounded-full">
              <BiShoppingBag
                onClick={() => setShowPopUp(!showPopUp)}
                size={27}
                className="cursor-pointer fill-black hover:fill-[#D8AE7E]"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center select-none">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>

          {/* Sidebar Keranjang */}
          {showPopUp && (
            <div className="fixed top-0 right-0 h-screen w-96 bg-white shadow-lg z-50 p-6 font-poppins">
              <div className="flex items-center justify-center gap-2 mb-8">
                <GiShoppingCart size={30} />
                <h2 className="text-xl font-semibold">Keranjang Anda</h2>
              </div>

              <button
                onClick={() => setShowPopUp(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>

              {cartItems.length === 0 ? (
                <p className="text-center">Keranjang Anda kosong</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-4 gap-4"
                  >
                    <p className="flex-shrink-0 w-1/4">{item.product_name}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleMinusQuantity(item.id, item.quantity)
                        }
                        className="bg-red-500 text-white px-2 rounded-lg shadow-lg"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handlePlusQuantity(item.id, item.quantity)
                        }
                        className="bg-green-500 text-white px-2 rounded-lg shadow-lg"
                      >
                        +
                      </button>
                    </div>
                    <span className="flex-shrink-0 w-1/5">
                      IDR{" "}
                      {Number(item.subtotal_price).toLocaleString("id-ID", {
                        style: "decimal",
                      })}
                    </span>
                    <button onClick={() => removeFromCart(item.id)}>
                      <RiDeleteBin5Line className="text-red-500 text-xl shadow-lg rounded-lg" />
                    </button>
                  </div>
                ))
              )}
              <h3 className="text-lg font-semibold mt-4">
                Total : IDR{" "}
                {Number(grandTotalPrice).toLocaleString("id-ID", {
                  style: "decimal",
                })}
              </h3>
              <button
                className="flex align-center justify-center mt-4 bg-black text-white py-3 rounded-full w-full font-semibold gap-2"
                onClick={handleOpenCheckoutModal}
              >
                <MdOutlineShoppingCartCheckout className="text-xl" />
                Check Out
              </button>
            </div>
          )}

          {/* Start Checkout Modal */}
          <Modal
            open={isCheckoutModalOpen}
            onOk={handleCheckout}
            onCancel={handleCloseCheckoutModal}
            okText="Submit"
            cancelText="Cancel"
          >
            <div className="flex flex-col gap-6">
              <span className="text-2xl font-semibold text-gray-800 font-poppins select-none">
                Unggah Bukti Transaksi
              </span>
              <Upload beforeUpload={handleImageUpload} maxCount={1}>
                <Button
                  icon={<FcAddImage className="text-lg" />}
                  type="dashed"
                  className="text-slate-400 h-10 font-poppins"
                >
                  Upload Image
                </Button>
              </Upload>
            </div>

            <div className="flex flex-col items-start justify-center gap-8 p-4">
              <div className="flex items-center gap-8">
                <img src={logoBCA} alt="..." width={100} />
                <p className="text-lg font-bold font-poppins tracking-wider">
                  1663329650
                </p>
              </div>
              <div className="flex items-center gap-8">
                <img src={logoBRI} alt="..." width={100} />
                <p className="text-lg font-bold font-poppins tracking-wider">
                  1798450932
                </p>
              </div>
              <div className="flex items-center gap-8">
                <img src={logoMandiri} alt="..." width={100} />
                <p className="text-lg font-bold font-poppins tracking-wider">
                  6585432809
                </p>
              </div>
              <div className="flex items-center gap-8">
                <img src={logoBNI} alt="..." width={100} />
                <p className="text-lg font-bold font-poppins tracking-wider">
                  2876093487
                </p>
              </div>
            </div>
          </Modal>
          {/* End Checkout Modal */}

          {/* Start Dropdown */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="bg-white p-2 rounded-full">
              <BiUser
                size={27}
                className="relative cursor-pointer hover:text-[#D8AE7E]"
              />
            </div>
          </Dropdown>
          {/* End Dropdown */}

          {/* Start Modal Profile */}
          <Modal
            title={
              <span className="text-2xl font-semibold text-gray-800 font-poppins select-none">
                Profil Saya
              </span>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            maskClosable={true}
          >
            <Form
              layout="vertical"
              initialValues={{
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                imageProfile: formData.imageProfile,
              }}
              onFinish={handleUpdateUser}
            >
              <Form.Item style={{ textAlign: "center" }}>
                <div className="mb-4 flex justify-center items-center">
                  {formData.imageProfile ? (
                    typeof formData.imageProfile === "string" ? (
                      <img
                        src={`http://localhost:3888/profile/${formData.imageProfile}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(formData.imageProfile)}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                    )
                  ) : (
                    <span className="text-gray-500">No image uploaded</span>
                  )}
                </div>
                <Upload
                  name="imageProfile"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      message.error("You can only upload image files!");
                      return Upload.LIST_IGNORE;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      imageProfile: file,
                    }));
                    return false;
                  }}
                >
                  <Button
                    icon={<FcAddImage className="text-lg" />}
                    type="dashed"
                    className="text-slate-400 h-10 font-poppins"
                  >
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input className="h-11 text-slate-500 font-poppins" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input className="h-11 text-slate-500 font-poppins" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input the password!" },
                ]}
              >
                <Input
                  type="password"
                  className="h-11 text-slate-500"
                  placeholder="********"
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  className="h-11 text-slate-500"
                  placeholder="********"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  className="h-11 font-poppins"
                >
                  <AiFillSave className="text-lg" />
                  Simpan Perubahan
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          {/* End Modal Profile */}

          {/* Start Modal Riwayat */}
          <Modal
            open={modalTransaksi}
            onCancel={() => setModalTransaksi(false)}
            footer={null}
            width={500}
            maskClosable={true}
          >
            <span className="text-2xl font-semibold text-gray-800 font-poppins select-none">
              Riwayat Transaksi
            </span>
            {transactions.length > 0 ? (
              <div className="font-poppins mt-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id}>
                    <div>
                      <strong>ID Transaksi :</strong> {transaction.id}
                    </div>
                    <div>
                      <strong>Status :</strong> {transaction.status}
                    </div>
                    <div>
                      <strong>Total Harga :</strong> Rp{" "}
                      {Number(transaction.total_price).toLocaleString("id-ID", {
                        style: "decimal",
                      })}
                    </div>
                    <div>
                      <strong>Tanggal :</strong>{" "}
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </div>
                    <div>
                      <strong>Produk :</strong>
                      <ul>
                        {transaction.products.map((product) => (
                          <li key={product.id}>
                            {product.name} : IDR{" "}
                            {Number(product.price).toLocaleString("id-ID", {
                              style: "decimal",
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <p>Tidak ada riwayat transaksi.</p>
            )}
          </Modal>
          {/* End Modal Riwayat */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
