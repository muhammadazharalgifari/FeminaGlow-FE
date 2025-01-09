import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Statistic } from "antd";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";
import BreadcrumbComponent from "../../component/Breadcrumb";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../../ax";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { Content } = Layout;

const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const usersResponse = await axiosInstance.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(usersResponse.data.data);

        const productsResponse = await axiosInstance.get(
          "/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductData(productsResponse.data.data);

        const totalTransactionResponse = await axiosInstance.get(
          "/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalTransaction(totalTransactionResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatToRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "decimal",
      currency: "IDR",
    }).format(value);

  const monthlySalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Penjualan Bulanan",
        data: salesData.monthlySales || [500, 800, 700, 650, 900, 1000, 2100],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const dailySalesData = {
    labels: ["Pagi", "Siang", "Sore"],
    datasets: [
      {
        label: "Penjualan Hari Ini",
        data: salesData.dailySales || [500, 600, 400],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "16px", padding: 24, minHeight: 280 }}>
          <BreadcrumbComponent />
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Jumlah Pengguna"
                  value={userData.length}
                  loading={loading}
                  valueStyle={{ fontSize: 24 }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Jumlah Kategori Produk"
                  value={productData.length}
                  loading={loading}
                  valueStyle={{ fontSize: 24 }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Penjualan Hari Ini"
                  value={totalTransaction.salesToday || 0}
                  loading={loading}
                  valueStyle={{ fontSize: 24, color: "#3f8600" }}
                  prefix="Rp"
                  precision={2}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Penjualan Bulanan"
                  value={salesData.salesThisMonth || 0}
                  loading={loading}
                  valueStyle={{ fontSize: 24, color: "#3f8600" }}
                  prefix="Rp"
                  precision={2}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} className="pt-4">
            <Col span={12}>
              <Card title="Grafik Penjualan Hari Ini">
                <Bar data={dailySalesData} options={{ responsive: true }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Grafik Penjualan Per Bulan">
                <Line data={monthlySalesData} options={{ responsive: true }} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
