import { FC } from "react";

export interface TableSection {
  title: string;
  width?: string;
}

interface IProps {
  tableSections?: TableSection[];
}

const TableSections: FC<IProps> = (props) => {
  return (
    <div className="w-full shrink-0 flex items-center px-4 h-[3.5rem] bg-gray-300 border border-gray-card-border rounded-lg overflow-hidden">
      {props?.tableSections?.map((item, index: number) => (
        <div
          style={
            !item?.width
              ? {
                  width: `calc(100% / ${props?.tableSections?.length})`,
                }
              : {
                  width: item?.width + `%`,
                }
          }
          className="flex justify-between"
        >
          <p className="w-full break-words text-black text-sm leading-5 font-medium text-center">
            {item?.title}
          </p>
          <span
            className={`block h-full w-px bg-gray-card-border ${
              props?.tableSections?.length === index + 1 && "hidden"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default TableSections;
