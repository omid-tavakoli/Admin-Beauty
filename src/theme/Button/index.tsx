import { HTMLAttributes, forwardRef } from "react";

type ButtonProps = JSX.IntrinsicElements["button"];
interface IProps extends ButtonProps {
  icon?: string;
  iconClassName?: HTMLAttributes<string>["className"];
  isLoading?: boolean;
}

const Button = forwardRef((props: IProps, ref: any) => {
  const { isLoading, ...buttonProps } = props;
  return (
    <button
      ref={ref}
      {...buttonProps}
      className={`button-primary ${buttonProps.className}`}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm mx-3"></span>
      )}
      {buttonProps?.children}
      {!!props.icon && (
        <svg width="10" height="10" className={props?.iconClassName}>
          <use href={props?.icon}></use>
        </svg>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
