import {
  Button,
  Card,
  Col,
  Image,
  Layout,
  List,
  message,
  Modal,
  Row,
  Statistic,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { BiDetail, BiSolidDetail } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";

const { Content } = Layout;

const OrderAdmin = () => {
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [dailySales, setDailySales] = useState([]);

  // Fungsi untuk mengambil data transaksi
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/api/transactions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const transactions = response.data.data;

        setTotalTransaction(transactions);
        setLoading(false);

        // Menghitung total seluruh transaksi
        const totalAmount = transactions.reduce((acc, transaction) => {
          const price = parseFloat(transaction.total_price);
          if (!isNaN(price)) {
            return acc + price;
          }
          return acc;
        }, 0);

        setTotalAmount(totalAmount);

        // Menghitung total transaksi dengan status PENDING
        const totalPending = transactions
          .filter((transaction) => transaction.status === "PENDING")
          .reduce((acc, transaction) => {
            const price = parseFloat(transaction.total_price);
            if (!isNaN(price)) {
              return acc + price;
            }
            return acc;
          }, 0);

        setTotalPending(totalPending);

        // Menghitung total transaksi dengan status SUCCESS
        const totalSuccess = transactions
          .filter((transaction) => transaction.status === "SUCCESS")
          .reduce((acc, transaction) => {
            const price = parseFloat(transaction.total_price);
            if (!isNaN(price)) {
              return acc + price;
            }
            return acc;
          }, 0);

        setTotalSuccess(totalSuccess);

        // Hitung penjualan harian
        calculateDailySales(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Fungsi untuk menghitung penjualan harian
  const calculateDailySales = (transactions) => {
    const groupedByDate = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      const price = parseFloat(transaction.total_price);

      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += !isNaN(price) ? price : 0;

      return acc;
    }, {});

    // Konversi object ke array dan urutkan berdasarkan tanggal
    const sortedByDate = Object.entries(groupedByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setDailySales(sortedByDate);
  };

  // Fungsi untuk menampilkan detail transaksi
  const handleDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  // Fungsi untuk mengubah status transaksi menjadi "SUCCESS"
  const handleSuccess = async () => {
    if (!selectedTransaction) return;

    if (selectedTransaction.status === "SUCCESS") {
      message.warning("This transaction has already been marked as SUCCESS.");
      return;
    }

    try {
      await axiosInstance.put(
        `/api/set-success/${selectedTransaction.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const response = await axiosInstance.get("/api/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setTotalTransaction(response.data.data);

      const totalAmount = response.data.data.reduce((acc, transaction) => {
        const price = parseFloat(transaction.total_price);
        if (!isNaN(price)) {
          return acc + price;
        }
        return acc;
      }, 0);
      setTotalAmount(totalAmount);

      const totalPending = response.data.data
        .filter((transaction) => transaction.status === "PENDING")
        .reduce((acc, transaction) => {
          const price = parseFloat(transaction.total_price);
          if (!isNaN(price)) {
            return acc + price;
          }
          return acc;
        }, 0);
      setTotalPending(totalPending);

      const totalSuccess = response.data.data
        .filter((transaction) => transaction.status === "SUCCESS")
        .reduce((acc, transaction) => {
          const price = parseFloat(transaction.total_price);
          if (!isNaN(price)) {
            return acc + price;
          }
          return acc;
        }, 0);
      setTotalSuccess(totalSuccess);

      setOpenModal(false);
      message.success("Transaction status successfully updated to SUCCESS.");
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update transaction status.");
    }
  };

  const formatToRupiah = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(numericValue);
  };

  // Table columns
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
        const color = status === "SUCCESS" ? "green" : "volcano";
        return (
          <Tag className="font-poppins select-none" color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "actions",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => handleDetail(record)}
          icon={<BiSolidDetail className="text-lg" />}
          className="font-poppins h-10"
        >
          Detail
        </Button>
      ),
    },
    {
      title: "Image Transaction",
      dataIndex: "imageTransaction",
      key: "imageTransaction",
      render: (imageTransaction) => (
        <Image
          src={`http://localhost:3888/public/${imageTransaction}`}
          alt="..."
          width={80}
        />
      ),
    },
  ];

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
            <h1 className="text-3xl tracking-tighter select-none mb-4">
              Orders.
            </h1>

            <div className="mt-5">
              <div className="w-full h-full flex mb-5">
                <Row gutter={16} justify="center" align="middle">
                  <Col>
                    <Card className="font-poppins shadow-lg bg-blue-500 border border-blue-500">
                      <h1 className="text-lg mb-2 font-medium tracking-tight text-white">
                        Total of All Transactions
                      </h1>
                      <Statistic
                        value={formatToRupiah(totalAmount)}
                        loading={loading}
                        valueStyle={{
                          fontSize: 24,
                          paddingLeft: 12,
                          color: "#3b82f6",
                          fontWeight: 24,
                          background: "#fff",
                          borderRadius: 6,
                        }}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card className="font-poppins shadow-lg bg-green-500 border border-green-500">
                      <h1 className="text-lg mb-2 font-medium tracking-tight text-white">
                        Total Successful Transactions
                      </h1>
                      <Statistic
                        value={formatToRupiah(totalSuccess)}
                        loading={loading}
                        valueStyle={{
                          fontSize: 24,
                          paddingLeft: 12,
                          color: "#22c55e",
                          fontWeight: 24,
                          background: "#fff",
                          borderRadius: 6,
                        }}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card className="font-poppins shadow-lg bg-red-500 border border-red-500 text-white">
                      <h1 className="text-lg mb-2 font-medium tracking-tight">
                        Total Pending Transactions
                      </h1>
                      <Statistic
                        value={formatToRupiah(totalPending)}
                        loading={loading}
                        valueStyle={{
                          fontSize: 24,
                          paddingLeft: 12,
                          color: "#ef4444",
                          fontWeight: 24,
                          background: "#fff",
                          borderRadius: 6,
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>

              <Table
                columns={columns}
                dataSource={totalTransaction}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 4 }}
                bordered
                className="shadow-lg"
                rowClassName={(_, index) =>
                  `transition-all ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`
                }
                components={{
                  body: {
                    cell: (props) => (
                      <td
                        {...props}
                        className="font-poppins text-gray-700 text-sm"
                      />
                    ),
                  },
                  header: {
                    cell: (props) => (
                      <th
                        {...props}
                        className="font-poppins text-gray-900 bg-gray-100"
                      />
                    ),
                  },
                }}
              />
            </div>
          </Content>
        </div>

        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
          width={500}
          className="font-poppins"
        >
          <div className="flex items-center gap-2 mb-4">
            <BiDetail className="text-3xl fill-blue-500" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Transaction Detail
            </h1>
          </div>

          {selectedTransaction ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <h3 className="font-semibold">Transaction ID :</h3>
                <p>{selectedTransaction.id}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <h3 className="font-semibold">Username :</h3>
                <p>{selectedTransaction.user.username}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <h3 className="font-semibold">Email :</h3>
                <p>{selectedTransaction.user.email}</p>
              </div>
              <div className="flex items-center gap-2  text-sm">
                <h3 className="font-semibold">Total Price :</h3>{" "}
                <p>{formatToRupiah(selectedTransaction.total_price)}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <h3 className="font-semibold">Status :</h3>
                <p>{selectedTransaction.status}</p>
              </div>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <h3 className="font-semibold">Product Lists :</h3>
              </div>
              {Array.isArray(selectedTransaction?.products) &&
              selectedTransaction.products.length > 0 ? (
                <List
                  dataSource={selectedTransaction.products}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <div className="grid grid-cols-4">
                        <div className="font-poppins">
                          <h3 className="font-semibold">Product Name</h3>{" "}
                          <p>{item.name}</p>
                        </div>
                        <div className="font-poppins flex gap-2">
                          <h3 className="font-semibold">Qty :</h3>
                          <p>{item.quantity}</p>
                        </div>
                        <div className="font-poppins">
                          <h3 className="font-semibold">Subtotal</h3>{" "}
                          <p>{formatToRupiah(item.subtotal_price)}</p>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <p>No products in this transaction.</p>
              )}
            </div>
          ) : (
            <p>No transaction selected</p>
          )}
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={handleSuccess}
              disabled={selectedTransaction?.status === "SUCCESS"}
              style={{
                backgroundColor:
                  selectedTransaction?.status === "SUCCESS"
                    ? "gray"
                    : "#16a34a",
              }}
              className="font-poppins h-11 shadow-lg"
              icon={<MdCheckCircle className="text-xl" />}
            >
              Success
            </Button>
          </div>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default OrderAdmin;
