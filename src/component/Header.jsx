import React from "react";
import { Avatar, Dropdown, Layout } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
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
          icon: <LogoutOutlined/>,
          onClick: handleLogout,
        },
      ];
  

  return (
    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
      <div style={{ float: "right", padding: "0 16px" }}>
        <Dropdown menu={{ items: items }} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
