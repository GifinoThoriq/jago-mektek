import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface DropdownProps {
  options: string[];
  onClick: () => void;
}

const DropdownProfile: React.FC<DropdownProps> = ({ options, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="options-menu"
        >
          <Image
            src={"/icons/avatar.svg"}
            width={36}
            height={36}
            alt="avatar"
          />
          <span className="text-sm cursor-pointer text-gray font-bold">
            Hello, {selectedOption} !
          </span>
          <ChevronDownIcon className="h-6 w-6 text-gray" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute mt-2 px-6 py-4 rounded-md shadow-lg bg-white"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{ width: "12rem" }}
        >
          <div className="py-1" role="none">
            <button className="inline-flex gap-2 items-center">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red" />
              <span className="text-red font-bold text-sm" onClick={onClick}>
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownProfile;
