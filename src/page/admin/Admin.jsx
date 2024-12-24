import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Statistic } from "antd";
import Header from "../../component/Header";
import Sider from "../../component/SIdeBar";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../component/Breadcrumb";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios"; // Impor axios
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

// Registrasi elemen yang digunakan untuk grafik
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
  const [userData, setUserData] = useState([]); // State untuk data pengguna
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Mengambil data pengguna dari API
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // Gantilah URL ini dengan URL API Anda yang sesuai
        const usersResponse = await axios.get(
          "http://localhost:3888/api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Users Data:", usersResponse.data);
        setUserData(usersResponse.data.data); // Set data pengguna

        // Mengambil data kategori produk dari API
        const productsResponse = await axios.get(
          "http://localhost:3888/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Products Data:", productsResponse.data);
        setProductData(productsResponse.data.data);

        setLoading(false); // Data berhasil diambil
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Jika ada error
      }
    };

    fetchData(); // Memanggil fungsi untuk mengambil data
  }, []);

  // Data untuk grafik penjualan per bulan
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
        label: "Penjualan Bulanan",
        data: salesData.monthlySales || [500, 800, 700, 650, 900, 1000, 2100], // Fallback data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Data untuk grafik penjualan hari ini
  const dailySalesData = {
    labels: ["Pagi", "Siang", "Sore"],
    datasets: [
      {
        label: "Penjualan Hari Ini",
        data: salesData.dailySales || [500, 600, 400], // Fallback data
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
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <BreadcrumbComponent />
          {/* Statistik */}
          <Row gutter={16}>
            {/* Card untuk jumlah pengguna */}
            <Col span={6}>
              <Card>
                <Statistic
                  title="Jumlah Pengguna"
                  value={userData.length} // Menampilkan jumlah pengguna
                  loading={loading}
                  valueStyle={{ fontSize: 24 }}
                />
              </Card>
            </Col>

            {/* Card untuk jumlah kategori produk */}
            <Col span={6}>
              <Card>
                <Statistic
                  title="Jumlah Kategori Produk"
                  value={productData.length} // Menghitung jumlah kategori produk
                  loading={loading}
                  valueStyle={{ fontSize: 24 }}
                />
              </Card>
            </Col>

            {/* Card untuk penjualan hari ini */}
            <Col span={6}>
              <Card>
                <Statistic
                  title="Penjualan Hari Ini"
                  value={salesData.salesToday || 0}
                  loading={loading}
                  valueStyle={{ fontSize: 24, color: "#3f8600" }}
                  prefix="Rp"
                  precision={2}
                />
              </Card>
            </Col>

            {/* Card untuk penjualan bulanan */}
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

          {/* Grafik Penjualan */}
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
