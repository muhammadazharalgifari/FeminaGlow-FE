import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sider = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "/admin",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "/admin/user",
      label: "User",
      icon: <AppstoreAddOutlined />,
    },
    {
      key: "/admin/products",
      label: "Products",
      icon: <AppstoreAddOutlined />,
    },
  ];

  return (
    <Layout.Sider>
      <div className="logo" />
      <Menu
        theme="dark"
        onClick={(e) => navigate(e.key)}
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
  );
};

export default Sider;
