import React from "react";
import { Layout } from "antd";
import Header from "../../component/Header";
import Sider from "../../component/SIdeBar";

import BreadcrumbComponent from "../../component/Breadcrumb";
import { Content } from "antd/es/layout/layout";

const OrderAdmin = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="site-layout ">
        <Header />

        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
          }}
        >
        <BreadcrumbComponent />

        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderAdmin;
