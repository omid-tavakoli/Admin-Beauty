import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from "react";
import CheckBox from "../CheckBox";

export interface ListItem {
  id: string;
  title: string;
  type?: string;
}
interface IProps {
  list: ListItem[] | undefined;
  selectedItem: any;
  onSelect: (item: ListItem, e?: ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  byCheckBox?: boolean;
  placeHolder?: string;
  multiSelect?: boolean;
  label?: string;
  labelClassName?: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const SelectBox: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  return (
    <div>
      {props?.label && (
        <label
          className={`text-xs leading-[1.125rem] font-medium text-black mb-2 cursor-pointer ${props?.labelClassName}`}
        >
          {props?.label}
        </label>
      )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={1}
        onBlur={(e) => handleBlur(e)}
        className={`group w-full h-10 flex flex-col outline-0 bg-white border border-gray-card-border custom-border  ${props?.wrapperClassName}`}
      >
        <div className="relative w-full h-full custom-border border border-transparent p-2 transition-colors duration-[250ms] group-focus:!border-main-primary rounded-[0.25rem]">
          <div className="w-full h-full flex items-center justify-between  bg-white cursor-pointer">
            <p className="w-[calc(100%-1.625rem)] text-sm leading-[1.313rem] font-medium text-black">
              {!(Array.isArray(props?.selectedItem) && props?.multiSelect)
                ? props?.selectedItem?.title === ""
                  ? props?.placeHolder
                  : props?.selectedItem?.title
                : props?.selectedItem?.length < 1
                ? props?.placeHolder
                : props?.selectedItem.length < 3
                ? props?.selectedItem?.map((item) => item?.title).join("، ")
                : props?.selectedItem[props?.selectedItem?.length - 1]?.type !==
                  "all"
                ? `${props?.selectedItem?.length} مورد`
                : `${props?.selectedItem?.length - 1} مورد`}
            </p>
            <span className="flex items-center justify-center">
              <svg
                width="16"
                height="16"
                stroke="#181718"
                className={`w-4 h-4 ${
                  isOpen && "rotate-180"
                } transition-transform duration-[250ms] `}
              >
                <use
                  href={"/images/icons/panel.svg#arrow-down-select-box"}
                ></use>
              </svg>
            </span>
          </div>
          <ul
            className={`absolute  ${
              !isOpen ? "invisible opacity-0" : "visible opacity-100"
            } transition-all duration-[250ms] z-[101] w-full bg-white rounded-lg top-10 left-0 border custom-border `}
          >
            {props?.list?.map((item) =>
              props?.byCheckBox ? (
                <CheckBox
                  wrapperProps={{
                    key: item?.id,
                    className: `text-[0.938rem] leading-5 font-medium cursor-pointer hover:text-main-primary transition-all duration-[250ms] hover:bg-main-100 ${
                      (
                        props?.multiSelect && Array.isArray(props?.selectedItem)
                          ? props?.selectedItem.includes(item)
                          : item?.id === props?.selectedItem?.id
                      )
                        ? "text-main-primary bg-main-100"
                        : "text-black bg-white"
                    }`,
                  }}
                  label={item?.title}
                  labelClassName="flex-row-reverse"
                  inputProps={{
                    className: "m-2",
                    defaultChecked:
                      props?.multiSelect && Array?.isArray(props?.selectedItem)
                        ? props?.selectedItem?.some(
                            (prev) => prev.id === item.id
                          )
                        : props?.selectedItem?.id === item?.id,
                    checked: !props?.multiSelect
                      ? props?.selectedItem?.id === item?.id
                      : props?.selectedItem?.find((prev: any) =>
                          prev?.id === item?.id ? true : undefined
                        ),
                    onChange: (e) => {
                      e?.stopPropagation();
                      props?.onSelect(item, e);
                      !props?.multiSelect && setIsOpen(false);
                    },
                  }}
                />
              ) : (
                <li
                  onClick={(e) => {
                    e?.stopPropagation();
                    props?.onSelect(item);
                    setIsOpen(false);
                  }}
                  key={item?.id}
                  className={`text-[0.938rem] leading-5 font-medium p-2 cursor-pointer hover:text-main-primary
              } transition-colors duration-[250ms]  ${
                (
                  props?.multiSelect && Array.isArray(props?.selectedItem)
                    ? props?.selectedItem.includes(item)
                    : item?.id === props?.selectedItem?.id
                )
                  ? "text-main-primary"
                  : "text-black"
              }`}
                >
                  {item?.title}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
