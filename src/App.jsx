import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "./page/admin/Admin";
// import EditProduct from "./page/admin/EditProduct";
import BulananTransaction from "./page/admin/BulananTransaction";
import CategoryAdmin from "./page/admin/CategoryAdmin";
import EditUser from "./page/admin/EditUser";
import HarianTransaction from "./page/admin/HarianTransaction";
import OrderAdmin from "./page/admin/OrderAdmin";
import ProductAdmin from "./page/admin/ProductAdmin";
import ProfileAdmin from "./page/admin/ProfileAdmin";
import PromoAdmin from "./page/admin/PromoAdmin";
import UserTable from "./page/admin/UserTable";
import { Cart } from "./page/Cart";
import Dashboard from "./page/Dashboard";
import LoginForm from "./page/LoginForm";
import NotFound from "./page/NotFound";
import AllProduct from "./page/product/ProductSunscreen";
import RegistrationForm from "./page/RegistrationForm";

const App = () => {
  return (
    <Cart>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registrasi" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:categoryId" element={<AllProduct />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/admin/edit/user" element={<EditUser />} />
        <Route path="/admin/user" element={<UserTable />} />
        <Route path="/admin/profile" element={<ProfileAdmin />} />
        <Route path="/admin/products" element={<ProductAdmin />} />
        <Route path="/admin/category" element={<CategoryAdmin />} />
        <Route path="/admin/promo" element={<PromoAdmin />} />
        <Route path="/harian/transaction" element={<HarianTransaction />} />
        <Route path="/bulanan/transaction" element={<BulananTransaction />} />
        {/* <Route path="/admin/products/edit/:id" element={<EditProduct />} /> */}
        <Route path="/admin/order" element={<OrderAdmin />} />
      </Routes>
    </Cart>
  );
};

export default App;
