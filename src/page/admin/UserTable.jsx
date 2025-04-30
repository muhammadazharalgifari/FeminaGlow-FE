import { Button, Image, Layout, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";
import { RiDeleteBin5Line } from "react-icons/ri";
const { Content } = Layout;

const UserTable = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setUserData(userData.filter((user) => user.id !== userId));

        notification.success({
          message: "User Deleted",
          description: "The user has been successfully deleted.",
          placement: "topRight",
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);

        notification.error({
          message: "Error",
          description: "There was an error deleting the user.",
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
          src={`http://localhost:3888/profile/${e}`}
          width={80}
          height={80}
          alt=""
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            icon={<RiDeleteBin5Line className="text-lg" />}
            className="font-poppins h-10"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="font-poppins" style={{ backgroundColor: "#475569" }}>
        <Header />
        <div className="p-6">
          <Content
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
            className="rounded-2xl"
          >
            <h1 className="text-3xl font-poppins tracking-tighter select-none mb-4">
              Users
            </h1>

            <div>
              {loading ? (
                <Spin size="large" />
              ) : (
                <Table
                  dataSource={userData}
                  columns={columns}
                  rowKey="id"
                  bordered
                  className="shadow-lg"
                  rowClassName={(_, index) =>
                    `transition-all ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`
                  }
                  pagination={{ pageSize: 4 }}
                  components={{
                    body: {
                      cell: (props) => (
                        <td
                          {...props}
                          className="font-poppins text-gray-700 text-sm"
                        />
                      ),
                    },
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          className="font-poppins text-gray-900 bg-gray-100"
                        />
                      ),
                    },
                  }}
                />
              )}
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default UserTable;
