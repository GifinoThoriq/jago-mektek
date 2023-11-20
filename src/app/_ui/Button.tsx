import { FC, ReactNode } from "react";

interface ButtonComponent {
  children: ReactNode;
  onClick?: () => void;
  type: "solid" | "outline";
}

export const Button: FC<ButtonComponent> = ({ children, onClick, type }) => {
  if (type === "solid") {
    return (
      <button
        className="border border-blue bg-blue-light px-8 py-3 text-sm text-white font-bold rounded transition-opacity hover:bg-opacity-80"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "outline") {
    return (
      <button
        className="border border-blue-light px-8 py-3 text-sm text-blue-light font-bold rounded "
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
