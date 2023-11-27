import { FC, ReactNode } from "react";

interface ButtonComponent {
  children: ReactNode;
  onClick?: () => void;
  style: "solid" | "outline";
  type?: "submit" | "reset" | "button";
  className?: string;
}

export const Button: FC<ButtonComponent> = ({
  children,
  onClick,
  style,
  type,
  className,
}) => {
  if (style === "solid") {
    return (
      <button
        className={`border border-blue bg-blue-light px-8 py-3 text-sm text-white font-bold rounded transition-opacity hover:bg-opacity-80 ${className}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }

  if (style === "outline") {
    return (
      <button
        className={`border border-blue-light px-8 py-3 text-sm text-blue-light font-bold rounded ${className} `}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
