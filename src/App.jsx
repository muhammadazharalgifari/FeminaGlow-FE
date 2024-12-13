import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./page/LoginForm";
import RegistrationForm from "./page/RegistrationForm";
import Dashboard from "./page/Dashboard";
import AllProduct from "./page/product/ProductSunscreen";
import PaketProductScrub from "./page/product/PaketProductScrub";
import PaketLengkap from "./page/product/PaketLengkap";
import DashboardAdmin from "./page/admin/Admin";
import NotFound from "./page/NotFound";
import UserTable from "./page/admin/UserTable";
import ProfileAdmin from "./page/admin/ProfileAdmin";
import EditUser from "./page/admin/EditUser";
import ProductAdmin from "./page/admin/ProductAdmin";
import EditProduct from "./page/admin/EditProduct";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/registrasi" element={<RegistrationForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produksunscreen" element={<AllProduct />} />
      <Route path="/produkscrab" element={<PaketProductScrub />} />
      <Route path="/produklengkap" element={<PaketLengkap />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/admin/edit/user/:id" element={<EditUser />} /> 
      <Route path ="/admin/user" element={<UserTable />} />
      <Route path ="/admin/profile" element={<ProfileAdmin />} />
      <Route path ="/admin/products" element={<ProductAdmin />} />
      <Route path ="/admin/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
