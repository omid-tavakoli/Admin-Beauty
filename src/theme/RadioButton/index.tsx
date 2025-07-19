import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface IProps {
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

const RadioButton: FC<IProps> = (props) => {
  const { inputProps } = props;
  return (
    <div className={`${props?.wrapperClassName}`}>
      <label
        className={`label cursor-pointer justify-normal ${props?.labelClassName}`}
      >
        <input
          {...inputProps}
          type="radio"
          className={`radio checked:bg-main-primary !border-gray-radio-border ${inputProps?.className}`}
        />
        <span className="text-xs leading-[1.125rem] font-medium text-black ms-2">
          {props?.label}
        </span>
      </label>
    </div>
  );
};

export default RadioButton;
