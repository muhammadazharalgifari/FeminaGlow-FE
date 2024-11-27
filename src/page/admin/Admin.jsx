import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Sider } = Layout;

const DashboardAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user berdasarkan token yang ada di localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Arahkan ke halaman login jika token tidak ada
    }

    axios
      .get("http://localhost:3888/api/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [navigate]);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Dropdown menu untuk profil admin
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => navigate("/admin")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreAddOutlined />} onClick={() => navigate("/admin/users")}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ float: "right", padding: "0 16px" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h2>Welcome, {userData ? userData.name : "Admin"}</h2>
            <p>Here is the admin dashboard content.</p>
            {/* Additional content can go here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardAdmin;
