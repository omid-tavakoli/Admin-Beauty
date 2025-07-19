import { useEffect, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import { openModalHandler } from "../../../service/utils/modalHandler";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import { useGet } from "../../../hooks/useFetch";
import { getTransActions } from "../../../service/api/Wallet";
import { useSearchParams } from "react-router-dom";
import Table from "../../../components/Table";
import { TableSection } from "../../../components/Table/TableSections";
import Pagination from "../../../components/Table/Pagination";
import { addCommas } from "../../../utils/priceHandler";
import { toJalaali } from "../../../utils/date";
import ViewDetailsModal from "../../../components/Wallet/ViewDetailsModal";
import AddBankAccountModal from "../../../components/BankAccount/AddBankAccountModal";

export default function PersonnelWallet() {
  let [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const getPage = searchParams.get("page") ?? "1";
  const [selectItem, setSelectItem] = useState("");
  const [data, setData] = useState<any>();

  const [inputValue, setInputValue] = useState({
    status: { id: "", title: "" },
  });
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getTransActionRefetch();
    }, 2);
  }, [getPage]);

  const statusList = [
    { id: "1", title: "برداشت" },
    { id: "2", title: "واریز" },
  ];

  useEffect(() => {
    setTimeout(() => {
      getTransActionRefetch();
    }, 2);
  }, [inputValue.status]);

  const selectBoxHandler2 = (item: ListItem, name: string) => {
    setInputValue((prev) => ({ ...prev, [name]: item }));
  };

  const deleteFilterHandler = () => {
    setInputValue({
      status: { id: "", title: "" },
    });
    setTimeout(() => {
      getTransActionRefetch();
    }, 2);
  };

  const {
    data: transActionData,
    refetch: getTransActionRefetch,
    isLoading: transActionDataLoading,
  } = useGet(
    getTransActions,
    ["getTransActions"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      value: search,
      type: +inputValue.status.id,
    }
  );

  const tableSections: TableSection[] = [
    { title: "شرح", width: "" },
    { title: "مبلغ", width: "" },
    { title: "تاریخ", width: "" },
    { title: "نوع ترانکش", width: "" },
    { title: "عملیات", width: "" },
  ];

  const tableData = transActionData?.data?.entity?.transactions?.map(
    (item: any) => [
      {
        type: "text",
        payload: item.description ?? "بدون‌نام",
        // width: "10%",
      },
      {
        type: "text",
        payload:
          item.type === 0
            ? `${addCommas(item?.amount?.toString() ?? "0")}  تومان  `
            : `${addCommas(item?.amount?.toString() ?? "0")}  تومان  `,
        className: item.type ? `text-green-primary` : "text-danger-primary",
      },
      {
        type: "text",
        payload: toJalaali(item.date).date,
      },
      {
        type: "badge",
        payload: item.type ? true : false,
        title: item.type ? "واریز" : "برداشت",
      },

      {
        type: "buttons",
        id: item.id,
        payload: [
          {
            title: "نمایش جزییات",
            onClick: () => {
              // openModalHandler("newBankAccountRegistrationModal");
              openModalHandler("ViewDetailsModal");

              setData(item);
            },
            isPrimary: true,
          },
        ],
      },
    ]
  );

  console.log("transActionData ----- ", transActionData);

  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black  ">حقوق و دستمزد</p>
      <TableHeader
        title="درخواست برداشت از حساب"
        secondaryTitleBtn="خروجی اکسل"
        buttonIcon={
          <svg
            width="16"
            height="16"
            className="fill-main-primary stroke-transparent cursor-pointer ms-1"
          >
            <use href={"/images/icons/payment.svg#export"}></use>
          </svg>
        }
        onSecondaryClickBtn={() => {
          openModalHandler("ViewDetailsModal");
        }}
        onClickBtn={() => {
          openModalHandler("newBankAccountRegistrationModal");
        }}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getTransActionRefetch();
          }, 2);
        }}
      >
        <div className="w-full flex items-end justify-between">
          <div className="w-full flex gap-x-2 mt-6">
            <SelectBox
              list={statusList ?? []}
              onSelect={(item) => selectBoxHandler2(item, "status")}
              selectedItem={inputValue.status}
              wrapperClassName="!w-[240px] !z-[10000]"
              byCheckBox
              placeHolder="انتخاب وضعیت"
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
        </div>
      </TableHeader>
      {!!tableData && (
        <Table
          tableSections={tableSections}
          data={tableData}
          loading={transActionDataLoading}
          wrapperClassName="max-h-[calc(100%-9rem)]"
        />
      )}
      <Pagination
        index={transActionData?.data?.index}
        size={transActionData?.data?.size}
        totalCount={transActionData?.data?.totalCount}
      />
      <AddBankAccountModal
        data={data}
        setData={setData}
        getAccountsRefetch={() => getTransActionRefetch()}
      />
      <ViewDetailsModal data={data} />
    </section>
  );
}
