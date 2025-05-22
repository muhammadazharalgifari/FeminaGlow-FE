import { useQuery } from "@tanstack/react-query";
import { Image, Layout, Table, Tag } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
import axiosInstance from "../../../ax";
import Sider from "../../component/SideBar";
import Header from "../../component/Header";

const { Content } = Layout;

const fetchPromoProducts = async () => {
  const { data } = await axiosInstance.get("/api/promo/products");
  return data.data;
};

const PromoAdmin = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["promoProducts"],
    queryFn: fetchPromoProducts,
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Promo Price",
      dataIndex: "promoPrice",
      key: "promoPrice",
      render: (promoPrice) => (
        <Tag color="green" className="font-poppins text-sm">
          Rp. {promoPrice.toLocaleString("id-ID")}
        </Tag>
      ),
    },
    {
      title: "Promo Start",
      dataIndex: "promoStart",
      key: "promoStart",
      render: (promoStart) => dayjs(promoStart).format("DD MMM YYYY"),
    },
    {
      title: "Promo End",
      dataIndex: "promoEnd",
      key: "promoEnd",
      render: (promoEnd) => dayjs(promoEnd).format("DD MMM YYYY"),
    },
    {
      title: "Product Image",
      dataIndex: "imageProduct",
      key: "imageProduct",
      render: (img) => (
        <Image
          src={`http://localhost:3888/public/${img}`}
          alt="Produk"
          width={100}
          style={{ objectFit: "cover" }}
        />
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load promo products</p>;

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
              overflow: "initial",
              background: "#fff",
            }}
            className="rounded-2xl"
          >
            <h1 className="text-3xl tracking-tighter select-none mb-4">
              Promo.
            </h1>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
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
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default PromoAdmin;
