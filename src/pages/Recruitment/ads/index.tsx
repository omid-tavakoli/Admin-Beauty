import React, { useState } from "react";
import TableHeader from "../../../components/TableHeader";
import SelectBox from "../../../theme/SelectBox";
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import { TableSection } from "../../../components/Table/TableSections";

const list = [
  { id: "1", title: "یزد" },
  { id: "2", title: "تهران" },
  { id: "3", title: "شیراز" },
  { id: "4", title: "اصفهان" },
  { id: "5", title: "تبریز" },
];

const tableSections: TableSection[] = [
  { title: "عنوان شغلی", width: "" },
  { title: "شعبه", width: "" },
  { title: "لاین", width: "" },
  { title: "خدمت ", width: "" },
  { title: "وضعیت", width: "" },
  { title: "عملیات", width: "" },
];

const data: [] = [];
export default function RecruitmentAds() {
  const [selectedLine, setSelectedLine] = useState<{
    id: string;
    title: string;
  }>({
    id: "0",
    title: "انتخاب شعبه",
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

  //   const navigate = useNavigate();
  //   const { data } = useGet(getDataServices, ["getDataServices"], {});
  //   const allServicesData = data?.data?.entities;
  //   console.log("allServicesData  =>", allServicesData);
  return (
    <section className="relative w-[calc(100%-26.875rem)] min-h-[51.688rem]  bg-white mt-6 rounded-lg border border-gray-card-border p-6 !mb-0">
      <p className="text-base font-semibold text-black  ">خدمات</p>

      <TableHeader
        title="ثبت آگهی جدید"
        // onClickBtn={() => navigate("/services/Information")}
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
      <Pagination
      // index={data?.data?.index}
      // size={data?.data?.size}
      // totalCount={data?.data?.totalCount}
      />
    </section>
  );
}
