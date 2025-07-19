import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

interface IProps {
  label?: string;
  labelClassName?: string;
  id: string;
  wrapperClassName?: string;
}

const PercentInput = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = useState(1);
    const changeStep = (direction: "up" | "down") => {
      if (direction === "up") setValue((prev) => prev + 1);
      if (direction === "down" && value > 0) {
        setValue((prev) => prev - 1);
      }
    };

    return (
      <div className={`w-[14.375rem] flex flex-col ${props?.wrapperClassName}`}>
        {props?.label && (
          <label
            htmlFor={props?.id}
            className={`text-xs leading-[1.125rem] font-medium text-black mb-2 cursor-pointer ${props?.labelClassName}`}
          >
            {props?.label}
          </label>
        )}
        <div className="w-full h-10 relative bg-white border border-gray-card-border rounded-tl-[0.75rem] rounded-br-[0.75rem] rounded-tr-sm rounded-bl-sm overflow-hidden">
          <div className="absolute top-2/4 -translate-y-2/4 start-4 flex flex-col">
            <svg
              onClick={() => changeStep("up")}
              width="12"
              height="12"
              className="rotate-180 fill-black stroke-transparent cursor-pointer"
            >
              <use
                href={"/images/icons/panel.svg#arrow-down-number-input"}
              ></use>
            </svg>
            <svg
              onClick={() => changeStep("down")}
              width="12"
              height="12"
              className="fill-black stroke-transparent cursor-pointer"
            >
              <use
                href={"/images/icons/panel.svg#arrow-down-number-input"}
              ></use>
            </svg>
          </div>
          <input
            id={props?.id}
            type="number"
            ref={ref}
            value={value}
            onChange={(e) => setValue(+e?.target?.value)}
            className="max-w-48 h-full text-xs leading-[1.125rem] font-medium text-black bg-white p-4 ps-10 outline-0"
          />
          <span className="custom-divider-vertical absolute left-10 top-2/4 -translate-y-2/4 !h-[calc(100%-1rem)]" />
          <span className="absolute left-4 top-2/4 -translate-y-2/4  text-black text-sm leading-[1.313rem] font-medium">
            %
          </span>
        </div>
      </div>
    );
  }
);
PercentInput.displayName = "PercentInput";

export default PercentInput;
