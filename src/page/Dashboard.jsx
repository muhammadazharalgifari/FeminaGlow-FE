import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Form, Input, Menu, Modal, Upload } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  AiFillSave,
  AiOutlineLogout,
  AiOutlineProfile,
  AiOutlineUser,
} from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { IoArrowRedo } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axiosInstance from "../../ax";
import logoBCA from "../assets/BCA.png";
import bgdashboard from "../assets/bgdashboard.jpg";
import logoBNI from "../assets/BNI.png";
import logoBRI from "../assets/BRI.png";
import logoMandiri from "../assets/MANDIRI.png";
import Footer from "../component/Footer";
import About from "./About";
import { useCart } from "./Cart";
import ProductPromo from "./product/ProductPromo";

const Dashboard = () => {
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

  // useEffect(() => {
  //   if (transactionId) {
  //     console.log("Transaction ID:", transactionId);
  //   }
  // }, [transactionId]);

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

  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/api/categories");
        // console.log(result.data.data);
        return result.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

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

  return (
    <section className="w-full h-screen bg-white " id="home">
      {/* Section 1: Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgdashboard})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Navbar */}
        <div className="h-16 flex w-full items-center px-10 fixed top-0 z-50">
          <div className="flex w-[280px] items-center">
            <h1 className="font-pacifico text-3xl">Femina Glow</h1>
          </div>
          <nav className="flex justify-center font-poppins text-black gap-6 z-30 flex-grow mr-8 items-center cursor-pointer">
            <ScrollLink to="home" smooth={true} duration={500}>
              Home
            </ScrollLink>
            <ScrollLink to="product" smooth={true} duration={500}>
              Produk
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500}>
              Tentang Kami
            </ScrollLink>
            <ScrollLink to="promo" smooth={true} duration={500}>
              Promo
            </ScrollLink>
          </nav>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <GiShoppingCart
                onClick={() => setShowPopUp(!showPopUp)}
                size={30}
                className="cursor-pointer"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center select-none">
                  {cartItems.length}
                </span>
              )}
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
                  className="flex align-center justify-center mt-4 bg-black text-white py-3 rounded-lg w-full font-semibold gap-2"
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
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={showModal}>
                    <div className="flex items-center justify-center gap-2 font-poppins">
                      <AiOutlineProfile />
                      <span className="tracking-wider font-light">Profil</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="2" onClick={handleRiwayatTransaksi}>
                    <div className="flex items-center justify-center gap-2 font-poppins">
                      <GrTransaction />
                      <span className="tracking-wider font-light">
                        Riwayat Transaksi
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="3" onClick={handleLogout}>
                    <div className="flex items-center justify-center gap-2 font-poppins">
                      <AiOutlineLogout />
                      <span className="tracking-wider font-light">Logout</span>
                    </div>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <AiOutlineUser size={27} className="relative cursor-pointer" />
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
                  rules={[
                    { required: true, message: "Please input the email!" },
                  ]}
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
                        {Number(transaction.total_price).toLocaleString(
                          "id-ID",
                          {
                            style: "decimal",
                          }
                        )}
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

        {/* Hero Content */}
        <div
          className="w-full h-screen flex flex-col justify-center pl-[160px] pb-16 relative z-10 gap-6 max-w-3xl"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h1 className="text-black font-poppins text-7xl font-bold select-none">
            Selamat Datang
          </h1>
          <h2 className="text-black text-3xl font-poppins font-light select-none">
            di Femina Glow.
          </h2>
          <p className="text-black font-poppins text-lg font-extralight select-none">
            Ayo segera berbelanja, Percantik dirimu mulai dari sekarang miliki
            kulit yang lebih cerah dan bersih!
          </p>
          <ScrollLink
            to="product"
            smooth={true}
            duration={500}
            className="text-white font-poppins bg-slate-700 w-48 h-12 items-center flex justify-center rounded-lg shadow-lg font-semibold hover:bg-slate-800 transition-all duration-500 cursor-pointer"
          >
            Belanja Sekarang
          </ScrollLink>
        </div>
      </div>

      {/* Section 2: Kategori Produk */}
      <section
        id="product"
        className="w-full py-16 bg-gray-300 bg-cover bg-center relative bg-[url('/src/assets/bg.jpg')]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 z-10"></div>

        <div className="container mx-auto px-10 text-center relative z-20">
          <h2 className="text-3xl mb-6 font-pacifico">Kategori Produk</h2>
          <p className="text-lg mb-10 font-poppins tracking-wider">
            Temukan produk-produk terbaik kami untuk perawatan kulit Anda!
          </p>

          {categoriesLoading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-36 font-poppins select-none">
              {categories.map((category) => (
                <div
                  className="bg-white p-8 shadow-md rounded-lg min-h-[28rem] flex flex-col justify-between"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  key={category.id}
                >
                  <h3 className="text-lg font-semibold mb-6 tracking-widest uppercase">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <img
                      src={`http://localhost:3888/public/${category.imageCategory}`}
                      alt="..."
                      className="w-full h-60 object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-justify text-sm min-h-[4rem] pt-6">
                    {category.description}
                  </p>

                  <Link
                    to={`/product/${category.id}`}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-500 text-white rounded-lg mt-8 h-12 shadow-lg gap-2 font-semibold"
                  >
                    <IoArrowRedo className="text-xl" />
                    Lihat Produk
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: About Us */}
      <About />

      {/* Section 4: Promo */}
      <ProductPromo />

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Dashboard;
