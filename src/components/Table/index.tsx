import { FC } from "react";
import TableBody, { TableData } from "./TableBody";
import TableSections, { TableSection } from "./TableSections";

interface Table {
  tableSections?: TableSection[];
  data?: TableData;
  wrapperClassName?: string;
  loading?: boolean;
}
const Table: FC<Table> = (props) => {
  const { tableSections, data, loading } = props;
  return (
    <section className={`flex flex-col ${props?.wrapperClassName}`}>
      <TableSections tableSections={tableSections} />
      {data && !loading && <TableBody data={data} />}
      {loading && (
        <div className="w-full overflow-y-auto h-full flex flex-col gap-y-4 px-2 my-4 overflow-hidden">
          {new Array(4).fill("").map((_, i) => (
            <>
              <div
                key={i}
                className="skeleton w-full h-16 flex items-center mt-6 rounded-lg justify-between px-6"
              />
            </>
          ))}
        </div>
      )}
    </section>
  );
};

export default Table;
