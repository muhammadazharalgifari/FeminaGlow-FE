import React, { useEffect, useState } from "react";
import { Table, Card, Statistic, Row, Col } from "antd";
import axios from "axios";

const SalesDashboard = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchSalesData();
  }, []);

  // Ambil data penjualan dari backend
  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3888/api/sales");
      setSales(response.data.sales);
      setTotalSales(response.data.totalSales);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `Rp ${amount.toLocaleString()}`,
    },
  ];

  return (
    <>
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalSales}
              precision={2}
              prefix="Rp"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>
      </Row>
      <Table
        dataSource={sales}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.orderId}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default SalesDashboard;
