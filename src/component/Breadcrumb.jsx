import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const items = [
    {
      title: <Link to="/admin">Dashboard</Link>,
      link: "/admin",
    },
    {
      title: <Link to="/admin/user">User</Link>,
      link: "/admin/user",
    },
    {
      title: <Link to="/admin/products">Products</Link>,
      link: "/admin/products",
    },
  ];

  const breadcrumbItems = pathnames.map((path, index) => {
    const link = `/${pathnames.slice(0, index + 1).join("/")}`;
    const item = items.find((item) => item.link === link);

    return {
      title: item ? item.title : path,
    };
  });

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
};

export default BreadcrumbComponent;
