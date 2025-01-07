import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Spin,
  Image,
  notification,
  Modal,
  Form,
  Input,
  Button,
} from "antd"; // Import Modal, Form, Input, Button
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sider from "../../component/SIdeBar";
import Header from "../../component/Header";
import BreadcrumbComponent from "../../component/Breadcrumb";
import axiosInstance from "../../../ax";
const { Content } = Layout;

const UserTable = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false); // State to control the modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for editing
  const [form] = Form.useForm(); // Ant Design Form hook
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    axiosInstance
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [navigate]);

  // Handle Delete User
  const handleDelete = (userId) => {
    const token = localStorage.getItem("token");
    axiosInstance
      .delete(`/api/delete/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Remove the deleted user from the state
        setUserData(userData.filter((user) => user.id !== userId));

        // Show success notification
        notification.success({
          message: "User Deleted",
          description: "The user has been successfully deleted.",
          placement: "topRight",
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);

        // Show error notification
        notification.error({
          message: "Error",
          description: "There was an error deleting the user.",
          placement: "topRight",
        });
      });
  };

  // Handle Edit User: Show the modal and pre-fill the form
  const handleEdit = (userId) => {
    const user = userData.find((user) => user.id === userId);
    setSelectedUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      
    });
    setEditModalVisible(true); // Open the modal
  };

  // Handle Form Submission (Edit User)
  const handleFormSubmit = (values) => {
    const token = localStorage.getItem("token");
    axios;
    axiosInstance
      .put(`/api/users/${selectedUser.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Update user data in state
        setUserData(
          userData.map((user) =>
            user.id === selectedUser.id ? { ...user, ...values } : user
          )
        );
        setEditModalVisible(false); // Close the modal
        notification.success({
          message: "User Updated",
          description: "The user has been successfully updated.",
          placement: "topRight",
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        notification.error({
          message: "Error",
          description: "There was an error updating the user.",
          placement: "topRight",
        });
      });
  };

  // Kolom untuk Tabel
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Profile Image",
      dataIndex: "imageProfile",
      key: "imageProfile",
      render: (e) => (
        <Image
          src={`https://shineskin.hotelmarisrangkas.com/profile/${e}`}
          width={80}
          height={80}
          alt=""
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "5px 15px",
              marginRight: "5px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </button>

          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginRight: "5px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <BreadcrumbComponent />
          <div>
            {loading ? (
              <Spin size="large" />
            ) : (
              <Table
              dataSource={userData}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              />
            )}
          </div>
        </Content>
      </Layout>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null} // We'll handle the form submission in the modal
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          initialValues={{
            username: selectedUser?.username,
            email: selectedUser?.email,
           
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
         
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default UserTable;
