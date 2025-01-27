import React from "react";
import { Logout } from "../../components";
import { ProductTable, AddNewProduct } from "../../components";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <AddNewProduct></AddNewProduct>
      <ProductTable></ProductTable>
      <Logout />
    </>
  );
}

export default Dashboard;
