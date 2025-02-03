import { QuestionMark } from "@mui/icons-material";
import style from "./ConfirmationModal.module.css";

function ConfirmationModal({ onClose, onConfirm, message }) {
  return (
    <div
      className="fixed flex items-center justify-center bg-[#00000066] h-screen w-screen top-0 left-0 z-50"
      onClose={onClose}>
      <div className="relative bg-white h-[40vh] w-[90vw] md:w-[30vw] md:h-[60vh] flex flex-col items-center justify-evenly px-8 rounded-sm">
        <div className="flex justify-center items-center text-white bg-blue-500 w-1/5 aspect-square rounded-full">
          <QuestionMark />
        </div>
        <h1 className="font-bold text-2xl">Confirmation</h1>

        <p className="text-2xl text-center">{message}</p>
        <footer className="flex justify-evenly w-full">
          <button
            className="text-white font-bold py-2 px-4 bg-blue-500 text-xl rounded-sm cursor-pointer"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="text-white font-bold py-2 px-4 bg-blue-500 text-xl rounded-sm cursor-pointer"
            onClick={onConfirm}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ConfirmationModal;
