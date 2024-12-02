import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Header from "../../component/Header";
import Sider from "../../component/SIdeBar";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../component/Breadcrumb";

const { Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <BreadcrumbComponent/>
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
