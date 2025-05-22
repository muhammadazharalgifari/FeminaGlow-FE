import { useQuery } from "@tanstack/react-query";
import { Alert, Layout, Spin, Table } from "antd";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";

const { Content } = Layout;

const fetchMonthlySales = async () => {
  const response = await axiosInstance.get("/api/sales/monthly");
  // console.log(response.data);
  return response.data;
};

const columns = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    render: (text) => {
      const date = new Date(text);
      return new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        month: "long",
        year: "numeric",
      }).format(date);
    },
  },
  {
    title: "Total Monthly Sales",
    dataIndex: "totalSales",
    key: "totalSales",
    render: (value) => `Rp. ${Number(value).toLocaleString("id-ID")}`,
  },
];

const BulananTransaction = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["monthly-sales"],
    queryFn: fetchMonthlySales,
    refetchInterval: 30000,
  });
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
              Monthly Sales.
            </h1>

            {isLoading ? (
              <Spin tip="Loading..." />
            ) : isError ? (
              <Alert
                message="Error"
                description={error.message}
                type="error"
                showIcon
              />
            ) : (
              <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 10 }}
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
            )}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default BulananTransaction;
