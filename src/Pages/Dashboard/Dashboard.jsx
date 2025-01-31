import React from "react";
import { Logout } from "../../components";
import { ProductTable } from "../../components";

import style from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className="md:flex flex-col items-center justify-center p-4">
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <ProductTable></ProductTable>
      </div>
    </div>
  );
}

export default Dashboard;
