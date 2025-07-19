import Pagination from "../../../components/Table/Pagination";
import TableHeader from "../../../components/TableHeader";
import ExpertLayout from "../../../components/Expert/ExpertLayout";
import {
  closeModalHandler,
  openModalHandler,
} from "../../../service/utils/modalHandler";
import Table from "../../../components/Table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGet, useMutate } from "../../../hooks/useFetch";
import { getSalaryPersonnel } from "../../../service/api/Expert";
import { deletePayment } from "../../../service/api/Payments";
import EditPaymentModal from "../../../components/Payment/EditPaymentModal";
import AlertBox from "../../../components/AlertBox/AlertBox";
import { useToast } from "../../../utils/ToastContext";
import { addCommas } from "../../../utils/priceHandler";
import Checkout from "../../../components/Expert/Checkout/CheckoutModal";

export default function Salary() {
  const { addToast } = useToast();
  const tabList = [
    { title: "شرح" },
    { title: "بدهکار" },
    { title: "بستانکار" },
    { title: "مانده" },
    { title: "عملیات" },
  ];
  interface EditSalaryType {
    id: string;
    amount: string;
    description: string;
    type: number;
    lastName: string;
    name: string;
  }
  let [params] = useSearchParams();
  const idUser = params.get("ui");
  const getPage = params.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<EditSalaryType>();
  const [selectItem, setSelectItem] = useState("");

  const {
    data: salaryPersonnel,
    refetch: salaryPersonnelRefetch,
    isFetching: salaryPersonnelLoading,
  } = useGet(
    getSalaryPersonnel,
    ["getSalaryPersonnel"],
    { enabled: !!idUser },
    { index: page, size: "10", value: search, branchUserId: idUser }
  );
  const { mutate: deletePaymentMutate } = useMutate(deletePayment);

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      salaryPersonnelRefetch();
    }, 2);
  }, [getPage]);

  const tableData = salaryPersonnel?.data?.entity?.map((item) => [
    { type: "text", payload: item.description ?? "" },
    {
      type: "text",
      payload:
        item.type == 0 &&
        `${addCommas(item?.amount?.toString() ?? "0")}  تومان  `,
      className: "text-danger-primary",
    },
    {
      type: "text",
      payload:
        item.type == 1 &&
        `${addCommas(item?.amount?.toString() ?? "0")}  تومان  `,
      className: "text-green-primary",
    },
    {
      type: "text",
      payload: `${addCommas(item?.remaining?.toString() ?? "0")}  تومان  `,
    },
    {
      type: "action",
      id: item.id,
      payload: [
        {
          type: "edit",
          className: "bg-yellow-secondary",
          payload: (id?: string) => {
            if (id) {
              openModalHandler("editPaymentModal");
              setData({
                id: item.id,
                amount: item.amount.toString(),
                description: item.description,
                type: item.type,
                lastName: item.lastName,
                name: item.name,
              });
            }
          },
        },
      ],
    },
  ]);

  return (
    <ExpertLayout wrapperClassName="min-h-[51.688rem]" step={3}>
      <TableHeader
        wrapperClassName="!mb-4"
        title="تسویه حساب"
        secondaryTitleBtn="ثبت سند جدید"
        onSecondaryClickBtn={() => {
          openModalHandler("editPaymentModal");
        }}
        onClickBtn={() => {
          openModalHandler("checkout");
        }}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            salaryPersonnelRefetch();
          }, 2);
        }}
      />
      <div className="flex justify-end mb-11">
        <button className="button-primary bg-white text-main-primary border border-main-primary flex items-center gap-1">
          خروجی اکسل
          <svg
            width="16"
            height="16"
            className="fill-main-primary stroke-transparent cursor-pointer"
          >
            <use href={"/images/icons/payment.svg#export"}></use>
          </svg>
        </button>
      </div>
      <Table
        tableSections={tabList}
        data={tableData}
        loading={salaryPersonnelLoading}
        wrapperClassName="h-[calc(100%-9rem)]"
      />
      <Pagination />
      <Checkout />
      <EditPaymentModal
        refetch={salaryPersonnelRefetch}
        data={data}
        selectPersonnel={false}
        branchUserId={idUser ?? ""}
      />
    </ExpertLayout>
  );
}
