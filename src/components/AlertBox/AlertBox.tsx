import { FC } from "react";
import Button from "../../theme/Button";

interface IProps {
  id: string;
  status: string;
  title: string;
  text: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const AlertBox: FC<IProps> = (props) => {
  const { status, title, text, id, onSubmit, onCancel } = props;
  return (
    <dialog id={id} className="modal  backdrop:!bg-black/30">
      <div className="modal-box  flex flex-col items-center bg-white w-[237px] px-6 rounded-2xl pb-6 border">
        <span
          className={`flex rounded-full w-[6.25rem] h-px mb-6 ${
            status == "success"
              ? "bg-green-500"
              : status == "warning"
              ? "bg-yellow-primary"
              : status == "info"
              ? "bg-infoAlertBox"
              : status == "delete"
              ? "bg-red-500"
              : ""
          }`}
        ></span>
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            status == "success"
              ? "bg-green-50"
              : status == "warning"
              ? "bg-yellow-secondary"
              : status == "info"
              ? "bg-infoBgIcon"
              : status == "delete"
              ? "bg-red-50"
              : ""
          }`}
        >
          <svg width={32} height={32}>
            <use
              href={`/images/icons/alertBox.svg#${
                status == "success"
                  ? "success"
                  : status == "warning"
                  ? "warning"
                  : status == "info"
                  ? "info"
                  : status == "delete"
                  ? "delete"
                  : ""
              }`}
            ></use>
          </svg>
        </div>
        <div className="flex flex-col gap-y-2 items-center ">
          <span
            className={` text-sm ${
              status == "success"
                ? "text-green-500"
                : status == "warning"
                ? "text-yellow-primary"
                : status == "info"
                ? "text-infoAlertBox"
                : status == "delete"
                ? "text-red-500"
                : ""
            }`}
          >
            {title}
          </span>
          <p className="text-xs leading-[1.1rem] text-black/70 tracking-wide">
            {text}
          </p>
        </div>
        {status === "warning" ? (
          <div className="flex gap-x-2 mt-4">
            <Button
              className="text-yellow-primary border border-yellow-primary  bg-white rounded-full min-w-20"
              onClick={onCancel}
            >
              لغو
            </Button>
            <Button
              className="bg-yellow-primary rounded-full min-w-[6.25rem]"
              onClick={onSubmit}
            >
              تایید
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default AlertBox;
