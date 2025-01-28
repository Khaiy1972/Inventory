import React from "react";
import { Logout } from "../../components";
import { ProductTable, AddNewProduct } from "../../components";

import style from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={style.dashboardContainer}>
      <h1>Dashboard</h1>
      <AddNewProduct></AddNewProduct>
      <div className={style.tableContainer}>
        <ProductTable></ProductTable>
      </div>
      <Logout />
    </div>
  );
}

export default Dashboard;
