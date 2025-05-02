import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  Layout,
  Modal,
  Upload,
  message as antMessage,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FcAddImage } from "react-icons/fc";
import { MdCheckCircle, MdOutlineModeEdit } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../ax";

const Header = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/");
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUser(response.data.data);
        form.setFieldsValue({
          username: response.data.data.username || "",
          email: response.data.data.email || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [form, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleProfileUpdate = async (values) => {
    setIsLoading(true);
    const { username, email, password, confirmPassword, imageProfile } = values;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", username);
      formDataToSend.append("email", email);
      if (password) formDataToSend.append("password", password);
      if (confirmPassword)
        formDataToSend.append("confirmPassword", confirmPassword);

      if (imageProfile?.file) {
        formDataToSend.append("imageProfile", imageProfile.file);
      }

      const response = await axiosInstance.put(
        "/api/update/user",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      antMessage.success(response.data.message);
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
      antMessage.error(
        error.response?.data?.message || "Error updating profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 text-sm py-2 px-10">
          <FaRegUserCircle className="text-lg text-blue-600" />
          <span className="font-poppins text-blue-600 font-medium">
            Profile
          </span>
        </div>
      ),
      onClick: () => setModalVisible(true),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 text-sm py-2 px-10">
          <TbLogout2 className="text-lg text-red-600" />
          <span className="font-poppins text-red-600 font-medium">Logout</span>
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
      <div
        style={{
          float: "right",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{ marginRight: 8 }}
          className="font-poppins font-semibold select-none"
        >
          <h1 className="text-white">{email}</h1>
        </span>
        <Dropdown menu={{ items: items }} trigger={["click"]}>
          <Avatar icon={<FaCircleUser className="text-3xl cursor-pointer" />} />
        </Dropdown>
      </div>

      {/* Profile Modal */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
          initialValues={{
            username: user?.username || "",
            email: user?.email || "",
          }}
          className="font-poppins"
        >
          <div className="flex items-center gap-2 mb-4">
            <MdOutlineModeEdit className="text-3xl fill-amber-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Edit Profile
            </h1>
          </div>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="font-poppins h-11" placeholder="example" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input className="font-poppins h-11" placeholder="example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password
              className="font-poppins h-11"
              placeholder="********"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                validator(_, value) {
                  if (!value || form.getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              },
            ]}
          >
            <Input.Password
              className="font-poppins h-11"
              placeholder="********"
            />
          </Form.Item>

          <Form.Item
            label="Profile Picture"
            name="imageProfile"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList[0])}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button
                type="dashed"
                className="text-slate-400 font-poppins h-10"
                icon={<FcAddImage className="text-lg" />}
              >
                Upload Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              className="font-poppins h-11"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              style={{ backgroundColor: "#16a34a" }}
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <div className="flex items-center gap-2">
                  <MdCheckCircle className="text-xl" />
                  <span>Submit</span>
                </div>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Header>
  );
};

export default Header;
