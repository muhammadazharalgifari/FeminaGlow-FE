import React, { useEffect, useState } from "react";
import { Layout, Table, Tag, Button } from "antd";
import Header from "../../component/Header";
import Sider from "../../component/SIdeBar";
import BreadcrumbComponent from "../../component/Breadcrumb";
import axios from "axios";
import axiosInstance from "../../../ax";

const { Content } = Layout;

const OrderAdmin = () => {
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axiosInstance.get(
          "/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalTransaction(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatToRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: ["user", "username"],
      key: "username",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => formatToRupiah(price),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "completed" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
      render: (record) => <Button type="primary">Detail</Button>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "16px", padding: 24, minHeight: 280 }}>
          <BreadcrumbComponent />
          <div className="mt-5">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <Table
              columns={columns}
              dataSource={totalTransaction}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              bordered
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderAdmin;
