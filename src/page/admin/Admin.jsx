import { useQuery } from "@tanstack/react-query";
import { Card, Col, Layout, Row, Spin, Statistic } from "antd";
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
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdCategory } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { FcBarChart } from "react-icons/fc";
import { format } from "date-fns-tz";

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

const fetchUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data.data;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get("/api/categories");
  return response.data.data;
};

const fetchTransactions = async () => {
  const response = await axiosInstance.get("/api/transactions");
  return response.data.data;
};

const fetchDailySales = async () => {
  const response = await axiosInstance.get("/api/sales/daily");
  return response.data.data;
};

const fetchMonthlySales = async () => {
  const res = await axiosInstance.get("/api/sales/monthly");
  return res.data;
};

const Admin = () => {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data: transactions = [], isLoading: loadingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data: dailySales = [], isLoading: loadingDailySales } = useQuery({
    queryKey: ["daily-sales"],
    queryFn: fetchDailySales,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data: monthlySales = [], isLoading: loadingMonthlySales } = useQuery({
    queryKey: ["monthly-sales"],
    queryFn: fetchMonthlySales,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    onError: (err) => {
      console.error("Error fetching monthly sales:", err);
    },
  });

  const loading =
    loadingUsers ||
    loadingCategories ||
    loadingTransactions ||
    loadingDailySales ||
    loadingMonthlySales;

  const timeZone = "Asia/Jakarta";

  const getTotalSalesToday = () => {
    if (!Array.isArray(dailySales) || dailySales.length === 0) return 0;
    const todayStr = format(new Date(), "yyyy-MM-dd", { timeZone });
    const todaySales = dailySales.find((item) => {
      const itemDateStr = format(new Date(item.date), "yyyy-MM-dd", {
        timeZone,
      });
      return itemDateStr === todayStr;
    });
    const total = Number(todaySales?.totalSales || 0);
    return isNaN(total) ? 0 : total;
  };

  const getTotalSalesThisMonth = () => {
    if (!Array.isArray(monthlySales) || monthlySales.length === 0) return 0;
    const currentMonth = format(new Date(), "yyyy-MM", { timeZone });
    const monthSale = monthlySales.find((item) => item.month === currentMonth);
    const total = Number(monthSale?.totalSales || 0);
    return isNaN(total) ? 0 : total;
  };

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const sortedDailySales = [...dailySales].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const sortedMonthlySales = [...monthlySales].sort(
    (a, b) => new Date(`${a.month}-01`) - new Date(`${b.month}-01`)
  );

  // Filter data sesuai bulan dan tahun saat ini
  const now = new Date();
  const currentMonthStr = format(now, "yyyy-MM", { timeZone });
  const currentYearStr = format(now, "yyyy", { timeZone });

  // Filter data sesuai bulan saat ini
  const filteredDailySales = sortedDailySales.filter((item) => {
    const itemMonthStr = format(new Date(item.date), "yyyy-MM", { timeZone });
    return itemMonthStr === currentMonthStr;
  });

  // Filter data sesuai tahun saat ini
  const filteredMonthlySales = sortedMonthlySales.filter((item) => {
    const itemYearStr = item.month.split("-")[0];
    return itemYearStr === currentYearStr;
  });

  const dailySalesChartData = {
    labels: filteredDailySales.map((item) =>
      format(new Date(item.date), "dd MMM", { timeZone })
    ),
    datasets: [
      {
        label: "Daily Sales",
        data: filteredDailySales.map((item) => Number(item.totalSales)),
        backgroundColor: "rgba(71, 85, 105, 0.5)",
        borderColor: "rgba(71, 85, 105, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesChartData = {
    labels: filteredMonthlySales.map((item) =>
      format(new Date(`${item.month}-01`), "MMM yyyy", { timeZone })
    ),
    datasets: [
      {
        label: "Monthly Sales",
        data: filteredMonthlySales.map((item) => Number(item.totalSales)),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgba(16, 185, 129, 1)",
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
              Dashboard.
            </h1>
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <>
                <Row gutter={16} justify={"center"} align={"middle"}>
                  <Col span={5}>
                    <Card className="font-poppins shadow-lg">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <HiMiniUserGroup className="text-2xl" />
                          <h1 className="text-lg font-medium tracking-tight">
                            Users
                          </h1>
                        </div>
                        <Statistic
                          value={users.length}
                          valueStyle={{
                            fontSize: 24,
                            fontWeight: "bolder",
                            borderRadius: "24px",
                            backgroundColor: "black",
                            color: "white",
                            padding: "4px 16px",
                          }}
                          className="font-poppins text-3xl"
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card className="font-poppins shadow-lg">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <MdCategory className="text-2xl" />
                          <h1 className="text-lg font-medium tracking-tight">
                            Categories
                          </h1>
                        </div>
                        <Statistic
                          value={categories.length}
                          valueStyle={{
                            fontSize: 24,
                            fontWeight: "bolder",
                            borderRadius: "24px",
                            backgroundColor: "black",
                            color: "white",
                            padding: "4px 16px",
                          }}
                          className="font-poppins text-3xl"
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card
                      className="font-poppins"
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <FaChartBar className="text-xl" />
                        <h1 className="text-lg font-medium tracking-tight">
                          Daily Sales
                        </h1>
                      </div>
                      <Statistic
                        value={getTotalSalesToday()}
                        formatter={formatRupiah}
                        valueStyle={{
                          fontSize: 20,
                          paddingLeft: 18,
                          color: "white",
                          fontWeight: "bold",
                          background: "black",
                          borderRadius: "12px",
                          padding: "4px 12px",
                        }}
                        className="font-poppins text-3xl"
                      />
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card
                      className="font-poppins shadow-lg"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <FaChartBar className="text-xl" />
                        <h1 className="text-lg font-medium tracking-tight">
                          Monthly Sales
                        </h1>
                      </div>
                      <Statistic
                        value={getTotalSalesThisMonth()}
                        formatter={formatRupiah}
                        valueStyle={{
                          fontSize: 20,
                          paddingLeft: 18,
                          color: "white",
                          fontWeight: "bold",
                          background: "black",
                          borderRadius: "12px",
                          padding: "4px 12px",
                        }}
                        className="font-poppins text-3xl"
                      />
                    </Card>
                  </Col>
                </Row>

                <Row gutter={16} className="pt-4">
                  <Col span={12}>
                    <Card className="font-poppins shadow-lg">
                      <div className="flex items-center gap-2">
                        <FcBarChart className="text-2xl" />
                        <h1 className="text-lg font-medium tracking-tight">
                          Daily Sales Graph
                        </h1>
                      </div>
                      <Bar
                        data={dailySalesChartData}
                        options={{ responsive: true }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className="font-poppins shadow-lg">
                      <div className="flex items-center gap-2">
                        <FcBarChart className="text-2xl" />
                        <h1 className="text-lg font-medium tracking-tight">
                          Monthly Sales Graph
                        </h1>
                      </div>
                      <Bar
                        data={monthlySalesChartData}
                        options={{ responsive: true }}
                      />
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Admin;
