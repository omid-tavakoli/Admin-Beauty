import { FC, useEffect, useState } from "react";
import { Type } from "../../utils/ToastContext";

interface IProps {
  message: string;
  type: Type;
  onClose: () => void;
}

const statusStyles: Record<string, {bg : string , text : string}> = {
  error: {bg : "main-secondary", text: "main-primary"},
  success: {bg : "green-secondary", text: "green-primary"},
  warning: {bg : "yellow-warning", text: "yellow-primary"},
};

const Toast: FC<IProps> = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Same duration as the transition
    }, 3000); // Duration the toast is visible
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-10 transition-all duration-500 z-50 flex items-center justify-between w-[37.188rem] h-10 bg-${statusStyles[type].bg} 
      ${isVisible ? "right-0" : "-right-full"}  rounded py-2 ps-4 pe-2`}
    >
      <span
        className={`absolute text-sm leading-[1.313rem] font-normal text-black  transition-all delay-400 duration-700  text-${statusStyles[type].text}  ${
          isVisible ? "right-2" : "-right-full"
        }` }
      >
        {message}
      </span>
      <svg
        onClick={onClose}
        width="16"
        height="16"
        fill={statusStyles[type].text}
        className={`absolute left-2 cursor-pointer fill-${statusStyles[type].text}`}
      >
        <use href={"/images/icons/toast.svg#close"}></use>
      </svg>
    </div>
  );
};

export default Toast;
