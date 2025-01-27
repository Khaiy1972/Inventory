import React from "react";

import style from "./ErrorModal.module.css";

function ErrorModal({ errorMessage, onClose }) {
  return (
    <div className={style.background}>
      <div className={style.modal}>
        <div className={style.logo}>!</div>
        <h2 className={style.message}>{errorMessage}</h2>
        <button className={style.close} onClick={() => onClose()}>
          X
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
