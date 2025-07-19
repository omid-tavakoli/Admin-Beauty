import { FC } from "react";
import Badge from "../../theme/Badge";
import Button from "../../theme/Button";
import DropDown from "../../theme/Drop";

export interface TableDataItem {
  type: string;
  payload: any;
  width?: string;
  className?: string;
  title?: string;
  id?: string;
}
export type TableData = TableDataItem[][];
interface TableBody {
  data: TableData;
}
const TableBody: FC<TableBody> = (props) => {
  const { data } = props;

  return (
    <div className="w-full overflow-y-auto h-full flex flex-col gap-y-4 px-2 my-4 overflow-hidden">
      {data.map((item) => (
        <div className="shrink-0 w-full flex items-center px-4 pb-4 border-b border-gray-card-border">
          {item.map((newItem, index) => (
            <>
             {newItem.type === "pic" && (
                <div
                style={
                  !newItem?.width
                  ? { width: `calc(100% / ${item?.length})` }
                  : { width: newItem?.width + `%` }
                }
                className="flex justify-center items-center"
                >
                    {newItem.type === "pic" && (
                      <input type="checkbox" className={`ml-6 checkbox !w-[1.125rem] !h-[1.125rem] !rounded-[0.25rem] bg-white border-gray-checkBox checkbox-secondary !outline-0`} />
                    )}
                    <span className="bg-white shadow-xs w-[3.125rem] h-[3.125rem] rounded-2xl flex items-center justify-center">
                      <img src={newItem.payload} alt="pic" />
                    </span>
                </div>
              )}
              {newItem.type === "svg" && (
                <div
                  style={
                    !newItem?.width
                      ? { width: `calc(100% / ${item?.length})` }
                      : { width: newItem?.width + `%` }
                  }
                  className="flex justify-center"
                >
                  <span className="bg-white shadow-xs w-[3.125rem] h-[3.125rem] rounded-2xl flex items-center justify-center">
                    <svg width="40" height="40" className={newItem.className}>
                      <use href={newItem.payload as string}></use>
                    </svg>
                  </span>
                </div>
              )}
              {newItem.type === "text" && (
                <p
                  style={
                    !newItem?.width
                      ? { width: `calc(100% / ${item?.length})` }
                      : { width: newItem?.width + `%` }
                  }
                  className={`text-sm leading-[1.313rem] font-medium text-black text-center line-clamp-2 ${newItem?.className}`}
                >
                  {newItem.payload as string}
                </p>
              )}
              {/* {newItem.type === "text" && (
                <p className="w-[6.25rem] text-sm leading-[1.313rem] font-medium text-black text-center">
                  {newItem.payload as string}
                </p>
              )} */}
              {newItem.type === "badge" && (
                <p
                  style={
                    !newItem?.width
                      ? { width: `calc(100% / ${item?.length})` }
                      : { width: newItem?.width + `%` }
                  }
                  className="flex justify-center text-sm leading-[1.313rem] font-medium text-black text-center"
                >
                  <Badge status={newItem.payload}>{newItem.title}</Badge>
                </p>
              )}
              {newItem.type === "action" && (
                <div className="flex items-start justify-center mx-auto gap-x-4 ">
                  {newItem.payload.map(
                    (action: any) =>
                      action && (
                        <span
                          onClick={() => action.payload(newItem.id)}
                          className={`flex  items-center  justify-center ${action?.className} bg-main-secondary w-9 h-9 rounded-lg cursor-pointer`}
                        >
                          <svg width="20" height="20">
                            <use
                              href={`/images/icons/panel.svg#${action.type}`}
                            ></use>
                          </svg>
                        </span>
                      )
                  )}
                </div>
              )}
              {newItem.type === "dropDownAction" && (
                <DropDown list={newItem.payload} title="عملیات" />
              )}
              {newItem.type === "buttons" && (
                <div className="gap-2 flex items-center mx-auto ">
                  {newItem.payload.map((btn: any) => (
                    <Button
                      onClick={btn?.onClick}
                      disabled={btn.disable}
                      className={`${!btn.isPrimary ? "button-primary-outline" : ""
                        } ${newItem.payload.length === 1 ? "w-32" : "w-[3.75rem]"
                        } `}
                    >
                      {btn.title}
                    </Button>
                  ))}
                </div>
              )}
              {newItem.type === "button" && (
                <div className="gap-2 flex items-center mx-auto ">
                  {newItem.payload.map((btn: any) => (
                    <Button
                      onClick={btn?.onClick}
                      disabled={btn.disable}
                      className={`${!btn.isPrimary ? "button-primary-outline" : ""
                        } ${newItem.payload.length === 1 ? "w-32" : "w-[3.75rem]"
                        } `}
                    >
                      {btn.title}
                    </Button>
                  ))}
                </div>
              )}
              {/* 
                {newItem.type === "delete" && (
                 
                )}
                {newItem?.type === "edit" && (
                  <span className="flex items-center justify-center bg-yellow-secondary w-9 h-9 rounded-lg cursor-pointer">
                    <svg width="20" height="20">
                      <use href={"images/icons/panel.svg#edit"}></use>
                    </svg>
                  </span>
                )}
              </div> */}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;

//?
// ${
//   !isOpen
//     ? "invisible opacity-0"
//     : "visible opacity-100"
// }

// <div
// onClick={() => setIsOpen(index)}
// onBlur={(e) => handleBlur(e)}
// className="flex flex-col cursor-pointer w-[5.688rem] h-[2.375rem] text-sm transition-all duration-300 "
// >
// <div className="relative w-full h-full text-sm items-center flex">
//   <div className="group w-full h-full flex items-center justify-between text-white border border-input-border rounded-lg py-2 px-4 bg-main-primary">
//     <p className="">عملیات</p>
//     <svg
//       width="20"
//       height="20"
//       className="stroke-white  fill-none ms-1"
//     >
//       <use href={`images/icons/panel.svg#arrow-down10`}></use>
//     </svg>
//   </div>
//   {isOpen === index && (
//     <ul
//       className={`absolute transition-all duration-[250ms] z-10 w-full bg-white flex flex-col top-[0.938rem] shadow-xl rounded-lg
//         `}
//     >
//       {newItem.payload.map((item: any) => (
//         <li
//           onClick={(e) => {
//             e?.stopPropagation();
//             console.log("clicked");
//             setIsOpen(999);
//           }}
//           className="text-[10px] ps-[5px] pt-1 last-of-type:pb-2 hover:text-main-primary cursor-pointer"
//         >
//           {item.title}
//         </li>
//       ))}
//     </ul>
//   )}
// </div>
// </div>
