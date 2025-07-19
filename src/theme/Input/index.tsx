import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface IProps {
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { inputProps, inputClassName } = props;

    return (
      <div className={`flex flex-col ${props?.wrapperClassName}`}>
        <>
          {props?.label && (
            <label
              htmlFor={props?.inputProps?.id}
              className={`text-xs leading-[1.125rem] font-medium text-black mb-2 cursor-pointer ${props?.labelClassName}`}
            >
              {props?.label}
            </label>
          )}
        </>

        <div className="flex">
          <input
            ref={ref}
            type="text"
            // onChange={(e) => {
            //   if (!Number.isInteger(+(p2e(e?.target?.value) || ""))) return;
            // }}
            className={`w-full h-[2.5rem] text-black rounded-tl-[0.75rem] rounded-br-[0.75rem] rounded-tr-sm rounded-bl-sm p-4 bg-white border border-gray-card-border outline-0 ${inputClassName}`}
            {...inputProps}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
