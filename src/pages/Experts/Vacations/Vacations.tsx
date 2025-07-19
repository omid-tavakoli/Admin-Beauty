import Pagination from "../../../components/Table/Pagination";
import ExpertLayout from "../../../components/Expert/ExpertLayout";
import { getAbsence, putAbsence } from "../../../service/api/Expert/index";
import { useGet, useMutate } from "../../../hooks/useFetch";
import { TableSection } from "../../../components/Table/TableSections";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "../../../components/Table";
import { useToast } from "../../../utils/ToastContext";

export const formattedDate = (e: any) => {
  const date = new Date(e);
  return date.toISOString().split("T")[0];
};

export default function Vacations() {
  const { addToast } = useToast()
  let [searchParams] = useSearchParams();
  const userId = searchParams.get('ui')
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");

  const tableSections: TableSection[] = [
    { title: "بازه مرخصی" },
    { title: "عنوان مرخصی" },
    { title: "تاریخ درخواست" },
    { title: "عملیات" },
  ];
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getAbsenceRefetch();
    }, 2);
  }, [getPage]);

  const { data: Absence, refetch: getAbsenceRefetch } = useGet(
    getAbsence,
    ["getAbsence"],
    { enabled: page !== "0" },
    { index: page, size: "10", branchUserId: userId ?? '' }
  );

  const { mutate: putFetcherAbsens } = useMutate(putAbsence);
  const changeStatus = (id: string, status: number | null) => {
    if (id && status) {
      putFetcherAbsens(
        { absenceId: id, status: status },
        {
          onError: (error) => {
            addToast('تغییر وضعیت مرخصی با مشکل روبرو شد‌ن', 'error')
          },
          onSuccess: (res) => {
            addToast(' تغییر وضعیت مرخصی با موفقیت انجام گردید ', 'success');
            getAbsenceRefetch()
          },
        }
      )
    }
  };

  const tableData = Absence?.data?.entity?.absences?.map((item) => [
    {
      type: "text",
      payload: `  ${formattedDate(item.endTime)} تا ${formattedDate(
        item.startTime
      )}`,
    },
    { type: "text", payload: item.message ?? "" },
    { type: "text", payload: formattedDate(item.createDate) ?? "" },
    {
      type: "buttons",
      payload: [
        { title: "لغو", onClick: () => changeStatus(item.id, 2) },
        {
          title: "تایید",
          isPrimary: true,
          onClick: () => changeStatus(item.id, 1),
        },
      ],
    },
  ]);

  return (
    <ExpertLayout wrapperClassName="min-h-[51.688rem]" step={4}>
      {!!tableData && <Table tableSections={tableSections} data={tableData} />}
      <Pagination />
    </ExpertLayout>
  );
}
