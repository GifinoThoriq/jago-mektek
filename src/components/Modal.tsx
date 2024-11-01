import React, { useState, ReactNode, FC } from "react";
import { Button } from "../ui/Button";
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface ModalType {
  message: string;
  onClose: () => void;
  isOpen: boolean;
  success: boolean;
}

const Modal: FC<ModalType> = ({ isOpen, onClose, message, success}) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center opacity-100 transition-opacity transform translate-y-0"
    : "fixed inset-0 flex items-center justify-center opacity-0 transition-opacity transform translate-y-full pointer-events-none";

  return (
    <div className={modalClasses}>
      <div className="fixed inset-0 bg-blue-dark opacity-50"></div>
      <div
        className="absolute bg-white p-4 rounded shadow-md z-10 w-[50vh] sm:w-[60vh] flex flex-col justify-between gap-4"
        style={{ minHeight: "192px" }}
      >
        <div>
          <div>
            { success === false && <ExclamationTriangleIcon className="h-10 w-10 text-red mx-auto" /> }
            { success === true && <CheckCircleIcon className="h-10 w-10 text-green mx-auto" /> }
          </div>
          <div className="text-center mt-2">
            <span className="break-words">{message}</span>
          </div>
        </div>
        <div className="text-center">
          <Button style="solid" onClick={onClose} loading={false}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
