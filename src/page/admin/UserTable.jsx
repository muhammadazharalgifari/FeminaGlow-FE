import React, { useEffect, useState } from "react";
import { Table, Space, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ambil data pengguna dari backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3888/api/users");
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hapus pengguna
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3888/api/users/${id}`);
      message.success("User deleted successfully.");
      fetchUsers(); // Refresh data setelah dihapus
    } catch (error) {
      message.error("Failed to delete user.");
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UsersTable;
