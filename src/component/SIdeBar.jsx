import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sider = () => {
    const navigate = useNavigate();

  const items = [
    {
      label: "Dashboard",
      key: "1",
      icon: <DashboardOutlined />,
      onClick: () => navigate("/admin"),
    },
    {
      label: "User",
      key: "2",
      icon: <AppstoreAddOutlined />,
      onClick: () => navigate("/admin/user"),
    },
    {
      label: "Products",
      key: "3",
      icon: <AppstoreAddOutlined />,
      onClick: () => navigate("/admin/products"),
    },
  ];

  return (
    <Layout.Sider>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["key"]}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
  );
};

export default Sider;
