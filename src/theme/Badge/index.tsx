import { FC, ReactNode } from "react";
interface BadgePops {
  children: ReactNode;
  className?: string;
  status?: boolean | string;
}
const Badge: FC<BadgePops> = (props) => {
  return (
    <span
      className={`w-[6.25rem] h-[2.063rem] flex items-center justify-center text-sm leading-[1.313rem] pb-1 font-medium
        ${
          props.status === "pending"
            ? "text-yellow-primary bg-yellow-secondary"
            : ""
        }
        ${
          props.status === "success" || props.status
            ? "text-green-primary bg-green-secondary"
            : ""
        }
          ${
            props.status === "success" || !props.status
              ? "text-danger-primary bg-danger-secondary"
              : ""
          }
        rounded-full ${props.className}`}
    >
      {props.children}
    </span>
  );
};

export default Badge;
