import { FC, ReactNode, useState } from "react";

interface ButtonComponent {
  children: ReactNode;
  onClick?: () => void;
  style: "solid" | "outline";
  type?: "submit" | "reset" | "button";
  className?: string;
  loading: boolean;
}

export const Button: FC<ButtonComponent> = ({
  children,
  onClick,
  style,
  type,
  className,
  loading,
}) => {
  if (style === "solid") {
    return (
      <button
        className={`border border-blue bg-blue-light px-8 py-3 text-sm text-white font-bold rounded transition-opacity hover:bg-opacity-80 ${className}`}
        onClick={onClick}
        type={type}
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center gap-2">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }

  if (style === "outline") {
    return (
      <button
        className={`border border-blue-light px-8 py-3 text-sm text-blue-light font-bold rounded ${className} hover:bg-blue-light hover:text-white `}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
