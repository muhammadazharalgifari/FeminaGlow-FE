import { Card, Col, Layout, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
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

  // Fetch data transactions
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const usersResponse = await axiosInstance.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(usersResponse.data.data);

        const productsResponse = await axiosInstance.get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  // Data for monthly sales
  const monthlySalesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: salesData.monthlySales || [500, 800, 700, 650, 900, 1000, 2100],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Data for daily sales
  const dailySalesData = {
    labels: ["Pagi", "Siang", "Sore"],
    datasets: [
      {
        label: "Daily Sales",
        data: salesData.dailySales || [300, 750, 500],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="font-poppins" style={{ backgroundColor: "#475569" }}>
        <Header />
        <div className="p-6">
          <Content
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
            className="rounded-2xl"
          >
            <h1 className="text-3xl font-poppins tracking-tighter select-none mb-4">
              Dashboard
            </h1>

            <Row gutter={16}>
              <Col span={6}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Number of Users
                  </h1>
                  <Statistic
                    value={userData.length}
                    loading={loading}
                    valueStyle={{ fontSize: 24 }}
                    className="font-poppins text-3xl"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Number of Categories
                  </h1>
                  <Statistic
                    value={productData.length}
                    loading={loading}
                    valueStyle={{ fontSize: 24 }}
                    className="font-poppins text-3xl"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Daily Sales
                  </h1>
                  <Statistic
                    value={totalTransaction.salesToday || 0}
                    loading={loading}
                    valueStyle={{ fontSize: 24, color: "#3f8600" }}
                    prefix="Rp"
                    precision={2}
                    className="font-poppins text-3xl"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Monthly Sales
                  </h1>
                  <Statistic
                    value={salesData.salesThisMonth || 0}
                    loading={loading}
                    valueStyle={{ fontSize: 24, color: "#3f8600" }}
                    prefix="Rp"
                    precision={2}
                    className="font-poppins text-3xl"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16} className="pt-4">
              <Col span={12}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Daily Sales Graph
                  </h1>
                  <Bar data={dailySalesData} options={{ responsive: true }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="font-poppins shadow-lg">
                  <h1 className="text-lg mb-2 font-medium tracking-tight">
                    Monthly Sales Graph
                  </h1>
                  <Line
                    data={monthlySalesData}
                    options={{ responsive: true }}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Admin;
