import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, Layout } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Ambil email pengguna dari localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Jika tidak ada email, arahkan kembali ke halaman login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // Hapus email
    navigate("/");
  };

  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => navigate("/admin/profile"),
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
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
        <span style={{ marginRight: 8 }}>
          <h1 className="text-white">{email}</h1>
        </span>{" "}
        {/* Menampilkan Email */}
        <Dropdown menu={{ items: items }} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
