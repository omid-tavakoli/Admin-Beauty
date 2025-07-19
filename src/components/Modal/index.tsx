import { FC, ReactNode } from "react";
import Button from "../../theme/Button";

interface IProps {
  id: string;
  title: string;
  children: ReactNode;
  clickHandler: () => void;
  clickSecondaryHandler?: () => void;
  backdrop?: () => void;
  wrapperClassName?: string;
  textPrimaryBtn?: string;
  textSecondaryBtn?: string;
  classPrimaryBtn?: string;
  classSecondaryBtn?: string;
  isLoading?: boolean;
}

const Modal: FC<IProps> = (props) => {
  return (
    <>
      <dialog id={props?.id} className="modal backdrop:!bg-black/30 ">
        <div
          className={`modal-box ${props.wrapperClassName} !max-w-[46.375rem] !p-0 !pb-3 bg-white !overflow-auto`}
        >
          <div className="sticky bg-white top-0 z-40">
            <div className="marker:modal-title px-6 pt-6 h-fit flex items-center  justify-between">
              <p className="text-base leading-6 font-medium text-black">
                {props?.title}
              </p>
              <form
                method="dialog"
                className="absolute left-6 top-6 z-10 modal-backdrop"
              >
                <button onClick={props?.backdrop}>
                  <svg
                    width="24"
                    height="24"
                    className="fill-black stroke-transparent"
                  >
                    <use href={"images/icons/panel.svg#close"}></use>
                  </svg>
                </button>
              </form>
            </div>
            <span className="custom-divider-horizontal mt-3 mb-5" />
          </div>
          <div className="modal-body px-6">{props?.children}</div>
          <span className="custom-divider-horizontal mt-9 mb-3" />
          <div className="flex justify-end gap-x-2">
            {props?.textSecondaryBtn ? (
              <Button
                onClick={props.clickSecondaryHandler}
                className={`me-3 ${props?.classSecondaryBtn}`}
              >
                {props?.textSecondaryBtn}
              </Button>
            ) : (
              ""
            )}
            {props?.textPrimaryBtn && (
              <Button
                onClick={() => {
                  !props.isLoading && props.clickHandler();
                }}
                className={`me-3 flex  items-center ${props?.classPrimaryBtn}`}
              >
                {props?.textPrimaryBtn}
                {props.isLoading && (
                  <span className="loading loading-spinner loading-xs mx-3"></span>
                )}
              </Button>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={props?.backdrop}>close</button>
        </form>
      </dialog>
    </>
  );
};

Modal.displayName = "Modal";
export default Modal;
