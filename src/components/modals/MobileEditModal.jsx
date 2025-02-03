import { Close, Delete, Edit } from "@mui/icons-material";
import React from "react";

function MobileEditModal({ onClose, onDelete, onEdit }) {
  return (
    <div className="fixed flex items-center justify-center bg-[#00000066] h-screen w-screen top-0 left-0 z-50">
      <div className="bg-white h-[40vh] w-[90vw] flex flex-col justify-evenly px-4 rounded-sm">
        <header className="flex justify-center items-center py-4 px-8">
          <h1 className="font-bold text-3xl">Options</h1>
        </header>
        <section className="flex flex-col gap-4 p-4">
          <button
            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-sm"
            onClick={onDelete}>
            <Delete /> Delete
          </button>
          <button
            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-sm"
            onClick={onEdit}>
            <Edit /> Edit
          </button>
          <button
            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-sm"
            onClick={onClose}>
            <Close /> Close
          </button>
        </section>
      </div>
    </div>
  );
}

export default MobileEditModal;
