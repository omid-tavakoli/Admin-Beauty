import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

interface IProps {
  textAreaProps?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  wrapperClassName?: string;
  label?: string;
}

const TextArea = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { textAreaProps, wrapperClassName } = props;
    return (
      <div className="flex flex-col h-full">
        {props?.label && (
          <label
            htmlFor={textAreaProps?.id}
            className="text-[0.75rem] leading-[1.125rem] font-medium text-black mb-2 cursor-pointer outline-0"
          >
            {props.label}
          </label>
        )}
        <div className="relative">
          <textarea
            maxLength={1024}
            ref={ref}
            onChange={(e) => {
              if (textAreaProps?.onChange) textAreaProps.onChange(e);
            }}
            {...textAreaProps}
            className={`w-full h-[9.75rem] text-black rounded-bl-sm rounded-tr-sm rounded-tl-xl rounded-br-xl p-3 bg-white border border-gray-card-border resize-none outline-0 ${
              wrapperClassName && wrapperClassName
            }`}
          />
          <div className="text-sm leading-[1.313rem] font-medium text-black absolute left-3 bottom-3 flex items-center">
            <p>1024</p>
            <span className="mx-0.5">/</span>
            <span className="text-end text-main-primary">
              {textAreaProps?.value?.toString()?.length}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
