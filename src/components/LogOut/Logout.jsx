import React from "react";
import { logout } from "../../service/auth";
import { useNavigate } from "react-router-dom";

import style from "./Logout.module.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button className={style.logoutButton} onClick={handleLogout}>
      Log out
    </button>
  );
}

export default Logout;
