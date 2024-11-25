import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./page/LoginForm";
import RegistrationForm from "./page/RegistrationForm";
import Dashboard from "./page/Dashboard";
import AllProduct from "./page/product/ProductSunscreen";
import PaketProductScrub from "./page/product/PaketProductScrub";
import PaketLengkap from "./page/product/PaketLengkap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/registrasi" element={<RegistrationForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produksunscreen" element={<AllProduct />} />
      <Route path="/produkscrab" element={<PaketProductScrub />} />
      <Route path="/produklengkap" element={<PaketLengkap />} />
    </Routes>
  );
};

export default App;
