import { FC, useEffect, useState } from "react";
import Button from "../../theme/Button";

interface IProps {
  title?: string;
  secondaryTitleBtn?: string;
  onClickBtn?: () => void;
  onSecondaryClickBtn?: () => void;
  onSubmit?: () => any;
  children?: React.ReactNode;
  searchHandler?: (search: string) => void;
  wrapperClassName? : string,
  buttonIcon?: any;
}

const TableHeader: FC<IProps> = (props) => {
  const {
    onClickBtn,
    title,
    children,
    searchHandler,
    secondaryTitleBtn,
    onSecondaryClickBtn,
    wrapperClassName,
    buttonIcon,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [isShowFilter, setIsShowFilter] = useState(false);
  const onSubmit = () => {};

  const handleEnterKeyboard = (event: KeyboardEvent) => {
    if (event?.key === "Enter") {
      searchHandler && searchHandler(searchValue);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyboard);
    return () =>
      window.document.removeEventListener("keydown", handleEnterKeyboard);
  }, [handleEnterKeyboard]);

  const ShowFilterHandler = () => {
    setIsShowFilter((prev) => !prev);
  };

  return (
    <section className={`flex flex-wrap items-start justify-between my-6 ${wrapperClassName}`}>
      {children ? (
        <div className="flex flex-wrap ">
          <div className="relative">
            <span
              onClick={() => searchHandler && searchHandler(searchValue)}
              className="flex items-center justify-center w-9 h-9 p-2 absolute top-5 -translate-y-2/4 right-1  rounded-xl "
            >
              <svg
                width="20"
                height="20"
                className="fill-black stroke-transparent cursor-pointer"
              >
                <use href={"/images/icons/panel.svg#search"}></use>
              </svg>
            </span>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e?.target?.value)}
              className="w-[15rem] ps-[3.25rem] bg-white h-[2.5rem] border border-gray-card-border p-2 pb-3 rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-sm text-sm leading-[1.313rem] font-medium placeholder:text-black/50 outline-0"
              placeholder="جست و جو"
            />
          </div>
          <span
            // onClick={() => onClick(searchValue)}
            onClick={ShowFilterHandler}
            className={`absolute right-[17rem] flex items-center justify-center w-10 h-10  border rounded-xl ${
              isShowFilter && "border-main-primary"
            }`}
          >
            <svg
              width="24"
              height="24"
              className="fill-main-primary stroke-transparent cursor-pointer"
            >
              <use href={"/images/icons/panel.svg#filter"}></use>
            </svg>
          </span>
        </div>
      ) : (
        <div className="relative flex items-center">
          <span
            onClick={() => searchHandler && searchHandler(searchValue)}
            className="flex items-center justify-center w-9 h-full p-2 absolute  right-2 rounded-xl "
          >
            <svg
              width="20"
              height="20"
              className="fill-black stroke-transparent cursor-pointer"
            >
              <use href={"/images/icons/panel.svg#search"}></use>
            </svg>
          </span>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
            className="w-[21.438rem] ps-[3.25rem] bg-white h-[3.25rem] border border-gray-card-border p-2 pb-3 rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-sm text-sm leading-[1.313rem] font-medium placeholder:text-black/50 outline-0"
            placeholder="جست و جو"
          />
        </div>
      )}
      {title ? (
        <div className="flex flex-row-reverse items-center gap-4">
          <Button
            onClick={() => {
              onClickBtn && onClickBtn();
            }}
            onSubmit={onSubmit}
          >
            {title}
          </Button>
          {secondaryTitleBtn && (
            <Button
              className="bg-white text-main-primary border border-main-primary"
              onClick={() => {
                onSecondaryClickBtn && onSecondaryClickBtn();
              }}
              onSubmit={onSubmit}
            >
              {secondaryTitleBtn}
              {buttonIcon && buttonIcon}
            </Button>
          )}
        </div>
      ) : (
        ""
      )}
      {isShowFilter && children}
    </section>
  );
};

export default TableHeader;
