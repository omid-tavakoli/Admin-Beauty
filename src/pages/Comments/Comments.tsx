import { useEffect, useState } from "react";
import TableHeader from "../../components/TableHeader";
import SelectBox from "../../theme/SelectBox";
import { TableSection } from "../../components/Table/TableSections";
import Table from "../../components/Table";
import Button from "../../theme/Button";
import CommentDetails from "../../components/Comment/CommentDetails";
import { useSearchParams } from "react-router-dom";

const Comments = () => {
  let [searchParams] = useSearchParams();
  const [page, setPage] = useState("1");
  const getPage = searchParams.get("page") ?? "1";
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //     setPage(isNaN(+getPage) ? "1" : getPage);
  //     setTimeout(() => {
  //         getReserveRefetch();
  //     }, 2);
  // }, [getPage]);

  const tableSections: TableSection[] = [
    { title: "دیدگاه", width: "" },
    { title: "نام", width: "" },
    { title: "نام خانوادگی", width: "" },
    { title: "شماره تماس", width: "" },
    { title: "وضعیت", width: "" },
    { title: "عملیات", width: "" },
  ];

  const list = [
    { id: "1", title: "یزد" },
    { id: "2", title: "تهران" },
    { id: "3", title: "شیراز" },
    { id: "4", title: "اصفهان" },
    { id: "5", title: "تبریز" },
  ];
  const [selectedLine, setSelectedLine] = useState<{
    id: string;
    title: string;
  }>({
    id: "0",
    title: "انتخاب لاین",
  });
  const deleteFilterHandler = () => {
    setSelectedLine({
      id: "0",
      title: "انتخاب لاین",
    });
  };

  // const tableData = reserve?.data?.entity?.map((item) => [
  //     {
  //       type: "text",
  //       payload: `${
  //         item.firstName !== null && item.lastName !== null
  //           ? `${item.firstName} ${item.lastName}`
  //           : "بدون‌نام"
  //       }`,
  //     },
  //     { type: "text", payload: toJalaali(item.date).date },
  //     { type: "text", payload: toJalaali(item.date).time },
  //     { type: "text", payload: item.serviceName },
  //     {
  //       type: "text",
  //       payload: `${item.personnelName} ${item.personnelLastName}`,
  //     },
  //     { type: "text", payload: item.branchName },
  //     {
  //       type: "text",
  //       payload: `0${phoneSplitter(item?.phoneNumber)}`,
  //     },
  //     {
  //       type: "dropDownAction",
  //       payload: [
  //         {
  //           title: "مشاهده جزئیات",
  //           onClick: () => {
  //             openModalHandler("seeDetailsModal");
  //             setReserveInfo(item);
  //           },
  //         },
  //         {
  //           title: "تسویه حساب",
  //           onClick: () => {
  //             openModalHandler("seeDetailModal");
  //             setReserveInfo(item);
  //           },
  //         },
  //         {
  //           title: "لغو نوبت",
  //           onClick: () => {
  //             openModalHandler("cancelReservationModal");
  //             setReserveInfo(item);
  //           },
  //         },
  //         {
  //           title: "جابجایی نوبت",
  //           onClick: () => {
  //             openModalHandler("changeTurnModal");
  //             setReserveInfo(item);
  //           },
  //         },
  //       ],
  //     },
  //   ]);

  return (
    <section className="relative w-full p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
      <p className="text-base font-semibold text-black mb-6 tracking-tight">
        دیدگاه ها
      </p>
      <div>
        <TableHeader>
          <div className="w-full flex gap-x-8 mt-6  ">
            <SelectBox
              list={list}
              onSelect={setSelectedLine}
              selectedItem={selectedLine}
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
        {/* <Table tableSections={tableSections}/> */}
      </div>
      {/* <CommentDetails  /> */}
    </section>
  );
};

export default Comments;
