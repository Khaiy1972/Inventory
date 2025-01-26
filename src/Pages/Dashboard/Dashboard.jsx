import React from "react";
import { Logout } from "../../components";
import { ProductTable } from "../../components";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <ProductTable></ProductTable>
      <Logout />
    </>
  );
}

export default Dashboard;
