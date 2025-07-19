import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

type InputProps = JSX.IntrinsicElements["input"];

interface IProps extends InputProps {
  wrapperProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLInputElement
  >;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: string;
  labelClassName?: string;
}

const CheckBox: FC<IProps> = (props) => {
  const { inputProps, wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={`form-control ${wrapperProps?.className}`}
    >
      <label
        className={`flex items-center cursor-pointer label p-0 ${props?.labelClassName}`}
      >
        <input
          {...inputProps}
          type="checkbox"
          className={`checkbox !w-[1.125rem] !h-[1.125rem] !rounded-[0.25rem] bg-white border-gray-checkBox checkbox-secondary !outline-0 ${inputProps?.className}`}
        />
        <span className="text-sm leading-[1.313rem] font-medium text-black mr-2">
          {props?.label}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;
