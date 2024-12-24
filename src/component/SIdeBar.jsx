import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, AppstoreAddOutlined, UserOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined, PercentageOutlined } from "@ant-design/icons";
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
      icon: <UserOutlined/>,
    
    },
    {
      key:"/admin/category",
      label: "Category",
      icon: <AppstoreAddOutlined />,

    },
    {
      key: "/admin/products",
      label: "Products",
      icon: <ShoppingOutlined/>,
    },
    {
      key: "/admin/order",
      label: "Order",
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "/admin/promo",
      label: "Promo",
      icon: <PercentageOutlined/>,
    }
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
