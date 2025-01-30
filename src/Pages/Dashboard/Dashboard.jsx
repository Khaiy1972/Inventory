import React from "react";
import { Logout } from "../../components";
import { ProductTable } from "../../components";

import style from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={style.dashboardContainer}>
      <div className={style.tableContainer}>
        <ProductTable></ProductTable>
      </div>
    </div>
  );
}

export default Dashboard;
