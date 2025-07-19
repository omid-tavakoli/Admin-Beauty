import { useState } from "react";

export default function DropDown(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const handleBlur = (e: any) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  return (
    <div
      onClick={() => setIsOpen((pre) => !pre)}
      onBlur={(e) => handleBlur(e)}
      className="flex flex-col cursor-pointer w-[5.688rem] h-[2.375rem] text-sm transition-all duration-300 mx-auto"
    >
      <div className="relative w-full h-full text-sm items-center flex">
        <div className="group w-full h-full flex items-center justify-between text-white border border-input-border rounded-lg py-2 px-4 bg-main-primary">
          <p className="">{props.title}</p>
          <svg width="20" height="20" className="stroke-white  fill-none ms-1">
            <use href={`images/icons/panel.svg#arrow-down10`}></use>
          </svg>
        </div>
        {isOpen && (
          <>
            <div
              className="fixed right-0 z-10 top-0 w-screen h-screen "
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 0);
              }}
            ></div>
            <ul
              className={`absolute top-9 transition-all duration-[250ms] z-10 w-full bg-white flex flex-col  shadow-xl rounded-lg
                          `}
            >
              {props?.list?.map(
                (item: any) =>
                  !!item && (
                    <li
                      onClick={item?.onClick}
                      className="text-[10px] ps-[5px] pt-1 last-of-type:pb-2 hover:text-main-primary cursor-pointer"
                    >
                      {item.title}
                    </li>
                  )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
