import style from "./ConfirmationModal.module.css";

function ConfirmationModal({ onClose, onConfirm, message }) {
  return (
    <div className={style.background} onClose={onClose}>
      <div className={style.modal}>
        <div className={style.logo}>?</div>
        <h1 className={style.title}>Confirmation</h1>

        <p className={style.content}>{message}</p>
        <footer className={style.footer}>
          <button className={style.button} onClick={onClose}>
            Cancel
          </button>
          <button className={style.button} onClick={onConfirm}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ConfirmationModal;
