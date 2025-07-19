import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableHeader from "../../components/TableHeader";
import SelectBox from "../../theme/SelectBox";
import { TableSection } from "../../components/Table/TableSections";
import Pagination from "../../components/Table/Pagination";
import { openModalHandler } from "../../service/utils/modalHandler";
import { useGet } from "../../hooks/useFetch";
import { getDataBlogs } from "../../service/api/blogs";
import Table from "../../components/Table";

const list = [
  { id: "1", title: "یزد" },
  { id: "2", title: "تهران" },
  { id: "3", title: "شیراز" },
  { id: "4", title: "اصفهان" },
  { id: "5", title: "تبریز" },
];

const tableSections: TableSection[] = [
  { title: "عکس" },
  { title: "عنوان" },
  { title: "دسته بندی" },
  { title: "نویسنده" },
  { title: "تاریخ انتشار" },
  { title: "وضعیت" },
  { title: "عملیات" },
];
const data: [] = [];
export default function Blog() {
  const [selectedLine, setSelectedLine] = useState<{
    id: string;
    title: string;
  }>({
    id: "0",
    title: "انتخاب لاین",
  });
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    title: string;
  }>({
    id: "0",
    title: "انتخاب وضعیت",
  });

  const deleteFilterHandler = () => {
    setSelectedLine({
      id: "0",
      title: "انتخاب لاین",
    });
    setSelectedStatus({
      id: "0",
      title: "انتخاب وضعیت",
    });
  };

  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState("");

  const navigate = useNavigate();

  // const { data: DataBlogs, refetch: getDataBlogsRefetch } = useGet(
  //   getDataBlogs,
  //   ["getDataBlogs"],
  //   { enabled: page !== "0" },
  //   { index: page, size: "10", value: search }
  // );
  // const tableData = DataBlogs?.data?.entity?.map((item) => [
  //   {
  //     type : "text", payload: item.title ?? ""
  //   },
  //   {
  //     type: "text", payload: item.description ?? ""
  //   },
  //   {
  //     type: "text" , payload: item.longitude ?? ""
  //   },
  //   {
  //     type: "text" , payload: item.latitude ?? ""
  //   }.
  //   {
  //     type: "svg",
  //     className: "fill-none stroke-black",
  //     payload: `images/icons/lines.svg#${item.icon}` ?? "",
  //   },
  //   { type: "text", payload: item.title ?? "" },
  //   {
  //     type: "badge",
  //     payload: item.isActive ?? false,
  //     title: item.isActive ? "فعال " : "غیرفعال",
  //   },
  //   {
  //     type: "action",
  //     id: item.id,
  //     payload: [
  //       {
  //         type: "delete",
  //         payload: (id?: string) => {
  //           if (id) {
  //             openModalHandler("line-warning-alert");
  //             setSelectItem(id);
  //           }
  //         },
  //       },
  //       {
  //         type: "edit",
  //         payload: (id?: string) => {
  //           if (id) {
  //             setSelectItem(id);
  //             openModalHandler("newServiceRegistrationModal");
  //           }
  //         },
  //       },
  //     ],
  //   },
  // ]);
  return (
    <section className="relative w-full min-h-[51.688rem]  bg-white mt-6 rounded-lg border border-gray-card-border p-6 !mb-0">
      <p className="text-base font-semibold text-black  ">خدمات</p>

      <TableHeader
        title="ثبت خدمت جدید"
        onClickBtn={() => navigate("/blogdetails")}
      >
        <div className="w-full flex gap-x-8 mt-6  ">
          <SelectBox
            list={list}
            onSelect={setSelectedLine}
            selectedItem={selectedLine}
            wrapperClassName="!w-[240px]"
            byCheckBox
            placeHolder="placeHolder"
          />
          <SelectBox
            list={list}
            onSelect={setSelectedStatus}
            selectedItem={selectedStatus}
            wrapperClassName="!w-[240px]"
            byCheckBox
            placeHolder="placeHolder"
          />
          <span
            onClick={deleteFilterHandler}
            className={`flex items-center justify-center w-10 h-10 border rounded-xl `}
          >
            <svg
              onClick={deleteFilterHandler}
              width="24"
              height="24"
              className="fill-main-primary stroke-transparent cursor-pointer"
            >
              <use href={"/images/icons/panel.svg#delete24"}></use>
            </svg>
          </span>
        </div>
      </TableHeader>
      <Table data={data} tableSections={tableSections} />
      <Pagination />
    </section>
  );
}
