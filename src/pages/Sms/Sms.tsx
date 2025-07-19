import { useNavigate, useSearchParams } from "react-router-dom";
import TableHeader from "../../components/TableHeader";
import SmsDetailsModal from "../../components/Sms/SmsDetailsModal";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useFetch";
import { getAllSms, GetAllSmsResponse } from "../../service/api/sms";
import Table from "../../components/Table";
import { TableSection } from "../../components/Table/TableSections";
import { openModalHandler } from "../../service/utils/modalHandler";
import { formattedDate } from "../Experts/Vacations/Vacations";
import Pagination from "../../components/Table/Pagination";
import { toJalaali } from "../../utils/date";


export default function Sms() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const tableSections: TableSection[] = [
    { title: "شماره تماس" },
    { title: "متن" },
    { title: "تاریخ" },
    { title: "وضعیت" },
    { title: "عملیات" },
  ];

  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");

  const { data: allSms, refetch: allSmsRefetch } = useGet(
    getAllSms,
    ["getDataCategory"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      allSmsRefetch();
    }, 2);
  }, [getPage]);

  function onSubmit() {
    navigate("/sms/singel");
  }
  const [data , setData] = useState<GetAllSmsResponse>()
  const tableData = allSms?.data?.entity?.map((item) => [
    { type: "text", payload: item.phoneNumber ?? "" },
    { type: "text", payload: item.message ?? "" },
    { type: "text", payload: toJalaali(item.date).date ?? "" },
    {
      type: "badge",
      payload: item.isSent ?? false,
      title: item.isSent ? "ارسال شده " : "ارسال نشده",
    },
    {
      type: "buttons",
      payload: [
        { title: "مشاهد جزییات", onClick: () => {openModalHandler('SmsDetailsModal')  ; setData(item)}  , isPrimary : true },
      ],
    },
  ]);
  return (
    <section className="relative w-full min-h-[51.688rem] p-6 bg-white mt-6 rounded-lg border border-gray-card-border">
      <p className="text-base font-semibold text-black mb-6">پیامک‌ها</p>
      <TableHeader onClickBtn={onSubmit} title="ارسال پیامک" />
      {!!tableData && <Table tableSections={tableSections} data={tableData} />}
      <SmsDetailsModal data={data}/>
      <Pagination
        index={allSms?.data?.index}
        size={allSms?.data?.size}
        totalCount={allSms?.data?.totalCount}
      />
    </section>
  );
}
