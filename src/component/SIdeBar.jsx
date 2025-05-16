import { Layout, Menu } from "antd";
import {
  BiSolidDashboard,
  BiSolidPurchaseTag,
  BiSolidShoppingBags,
} from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdCategory, MdDiscount } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo Femina.jpg";

const Sider = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "/admin",
      label: (
        <div className="flex items-center gap-2">
          <BiSolidDashboard className="text-lg" />
          <span className="font-medium">Dashboard</span>
        </div>
      ),
    },
    {
      key: "/admin/user",
      label: (
        <div className="flex items-center gap-2">
          <HiMiniUserGroup className="text-lg" />
          <span className="font-medium">Users</span>
        </div>
      ),
    },
    {
      key: "/admin/category",
      label: (
        <div className="flex items-center gap-2">
          <MdCategory className="text-lg" />
          <span className="font-medium">Categories</span>
        </div>
      ),
    },
    {
      key: "/admin/products",
      label: (
        <div className="flex items-center gap-2">
          <BiSolidShoppingBags className="text-lg" />
          <span className="font-medium">Products</span>
        </div>
      ),
    },
    {
      key: "/admin/order",
      label: (
        <div className="flex items-center gap-2">
          <BiSolidPurchaseTag className="text-lg" />
          <span className="font-medium">Orders</span>
        </div>
      ),
    },
    {
      key: "/admin/promo",
      label: (
        <div className="flex items-center gap-2">
          <MdDiscount className="text-lg" />
          <span className="font-medium">Promo</span>
        </div>
      ),
    },
    {
      key: "/harian/transaction",
      label: (
        <div className="flex items-center gap-2">
          <FaChartBar className="text-lg" />
          <span className="font-medium">Daily Sales</span>
        </div>
      ),
    },
    {
      key: "/bulanan/transaction",
      label: (
        <div className="flex items-center gap-2">
          <FaChartBar className="text-lg" />
          <span className="font-medium">Monthly Sales</span>
        </div>
      ),
    },
    {
      key: "/logout",
      label: (
        <div className="flex items-center gap-2">
          <TbLogout2 className="text-lg" />
          <span className="font-medium">Logout</span>
        </div>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      console.log("Logging out...");

      navigate("/");
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout.Sider className="sidebar">
      <div className="flex items-center justify-center gap-2 p-6">
        <img src={logo} alt="" className="rounded-full w-20 h-20" />
        <h1 className="text-white font-pacifico text-lg select-none">
          Welcome!
        </h1>
      </div>
      <Menu
        theme="dark"
        onClick={handleMenuClick}
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className="font-poppins font-semibold"
      />
    </Layout.Sider>
  );
};

export default Sider;
