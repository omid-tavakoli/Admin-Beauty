import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";

interface Props {
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  itemPosition: "right" | "left";
  itemChildren: ReactNode;
  errorMessage?: string;
  label? : string
  labelClassName? : string
  border? : string
}
const IconInput: FC<Props> = (props) => {
  const { inputProps, itemChildren, itemPosition, errorMessage , border , label ,labelClassName} = props;

  return (
    <div className="w-full flex flex-col text-black">
          {props?.label && (
           <label
             htmlFor={props?.inputProps?.id}
             className={`text-xs leading-[1.125rem]  text-black mb-2 ${props?.labelClassName}`}
           >
             {props?.label}
           </label>
         )}
      <div
        className={`  flex items-center w-full h-10 border border-gray-card-border custom-border  px-2${
          errorMessage ? "border-red" : ""
        }   relative `}
      >
        <input
          {...inputProps}
          className={` text-sm ${inputProps.className} ${
            itemPosition === "right" ? "order-2" : ""
          }  h-full w-full outline-none px-2`}
          dir="ltr"
        />
        <div
          className={`relative  flex justify-center   ${
            itemPosition === "right"
              ? "order-1 before:left-0 w-1/6"
              : "order-2 before:right-0 w-1/4"
          }  ${border == 'true' ? 'before:border before:absolute before:h-full before:border-gray-card-border' : ''} `}
        >
          {itemChildren}
        </div>
      </div>
      {!!errorMessage && (
        <p className="text-red text-xs mt-1 me-auto ">{errorMessage}</p>
      )}
    </div>
  );
};

export default IconInput;
