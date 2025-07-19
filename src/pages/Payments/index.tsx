import React, { useEffect, useState } from "react";
import TableHeader from "../../components/TableHeader";
import SelectBox, { ListItem } from "../../theme/SelectBox";
import { getPersonnel } from "../../service/api/Expert";
import { useGet, useMutate } from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import TableSections, {
  TableSection,
} from "../../components/Table/TableSections";
import { deletePayment, getPayments } from "../../service/api/Payments";
import Input from "../../theme/Input";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { toGregorian } from "../../utils/date";
import { addCommas } from "../../utils/priceHandler";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import EditPaymentModal from "../../components/Payment/EditPaymentModal";
import Pagination from "../../components/Table/Pagination";
import AlertBox from "../../components/AlertBox/AlertBox";
import { deleteLine } from "../../service/api/Category";
import { useToast } from "../../utils/ToastContext";
import CheckoutModal from "../../components/Expert/Checkout/CheckoutModal";

export default function Payments() {
  let [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const getPage = searchParams.get("page") ?? "1";
  const [selectItem, setSelectItem] = useState("");
  const { addToast } = useToast();
  const [data, setData] = useState<any>();

  interface InputValueTypes {
    expert: { id: string; title: string };
    startTime: DayValue | undefined;
    endTime: DayValue | undefined;
  }

  const [inputValue, setInputValue] = useState<InputValueTypes>({
    expert: { id: "", title: "" },
    startTime: undefined,
    endTime: undefined,
  });
  const tableSections: TableSection[] = [
    { title: "نام", width: "" },
    { title: "نام‌خانوادگی", width: "" },
    { title: "شرح", width: "" },
    { title: "بدهکار", width: "" },
    { title: "بستانکار", width: "" },
    { title: "مانده", width: "" },
    { title: "عملیات", width: "" },
  ];

  const startDate =
    inputValue.startTime !== undefined
      ? toGregorian(
          inputValue?.startTime?.year,
          inputValue?.startTime?.month,
          inputValue?.startTime?.day
        )
      : undefined;

  const endDate =
    inputValue.endTime !== undefined
      ? toGregorian(
          inputValue?.endTime?.year,
          inputValue?.endTime?.month,
          inputValue?.endTime?.day
        )
      : undefined;

  const { mutate: deletePaymentMutate } = useMutate(deletePayment);

  const {
    data: paymentsData,
    refetch: getPaymentsRefetch,
    isLoading: paymentsDataLoading,
  } = useGet(
    getPayments,
    ["getPayments"],
    {},
    {
      index: page,
      size: "10",
      value: search,
      BranchUserId: inputValue.expert.id,
      From: `${
        startDate?.year !== undefined
          ? `${startDate.year}-${startDate?.month}-${startDate?.day}`
          : ""
      }`,
      To: `${
        endDate?.year !== undefined
          ? `${endDate.year}-${endDate?.month}-${endDate?.day}`
          : ""
      }`,
    }
  );

  const tableData = paymentsData?.data?.entity?.map((item: any) => [
    {
      type: "text",
      payload: item.name ?? "بدون‌نام",
    },
    { type: "text", payload: item.lastName ?? "بدون‌نام" },
    { type: "text", payload: item.description ?? "---" },
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
              setData(item);
            }
          },
        },
      ],
    },
  ]);

  const { data: experts, refetch: getPersonnelRefetch } = useGet(
    getPersonnel,
    ["getPersonnel"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
    }
  );

  const deleteFilterHandler = () => {
    setInputValue({
      expert: { id: "", title: "" },
      startTime: undefined,
      endTime: undefined,
    });
    setTimeout(() => {
      getPaymentsRefetch();
    }, 2);
  };

  const selectBoxHandler2 = (item: ListItem, name: string) => {
    setInputValue((prev) => ({ ...prev, [name]: item }));
  };

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getPaymentsRefetch();
    }, 2);
  }, [getPage]);

  useEffect(() => {
    setTimeout(() => {
      getPaymentsRefetch();
    }, 2);
  }, [inputValue]);

  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black  ">حقوق و دستمزد</p>
      <TableHeader
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
            getPaymentsRefetch();
          }, 2);
        }}
      >
        <div className="w-full flex items-end justify-between">
          <div className="w-full flex gap-x-2 mt-6">
            <SelectBox
              list={
                experts?.data?.entity?.map((expert) => ({
                  id: expert.id,
                  title: `${expert.firstName} ${expert.lastName}`,
                })) ?? []
              }
              onSelect={(item) => selectBoxHandler2(item, "expert")}
              selectedItem={inputValue.expert}
              wrapperClassName="!w-[240px] !z-[10000]"
              byCheckBox
              placeHolder="انتخاب کارشناس"
            />
            <DatePicker
              value={inputValue.startTime as any}
              onChange={(e) => {
                setInputValue((pre) => ({
                  ...pre,
                  startTime: e,
                }));
              }}
              locale="fa"
              renderInput={({ ref }) => (
                <Input
                  inputClassName="!h-10 placeholder:text-black hover:cursor-pointer "
                  ref={ref as any}
                  inputProps={{
                    readOnly: true,
                    value: inputValue.startTime
                      ? `${inputValue.startTime?.year}-${inputValue.startTime?.month}-${inputValue.startTime?.day}`
                      : "",
                    placeholder: "از تاریخ",
                  }}
                  wrapperClassName="w-32 text-sm w-6.25"
                />
              )}
              calendarPopperPosition="bottom"
              inputPlaceholder="انتخاب تاریخ"
              colorPrimary="#eb1086"
            />
            <DatePicker
              value={inputValue.endTime as any}
              onChange={(e) => {
                setInputValue((pre) => ({
                  ...pre,
                  endTime: e,
                }));
              }}
              locale="fa"
              renderInput={({ ref }) => (
                <Input
                  inputClassName="!h-10 placeholder:text-black hover:cursor-pointer"
                  ref={ref as any}
                  inputProps={{
                    readOnly: true,
                    value: inputValue.endTime
                      ? `${inputValue.endTime?.year}-${inputValue.endTime?.month}-${inputValue.endTime?.day}`
                      : "",
                    placeholder: "تا تاریخ",
                  }}
                  wrapperClassName="w-32 text-sm w-6.25"
                />
              )}
              calendarPopperPosition="bottom"
              inputPlaceholder="انتخاب تاریخ"
              colorPrimary="#eb1086"
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
      </TableHeader>
      {!!tableData && (
        <Table
          tableSections={tableSections}
          data={tableData}
          loading={paymentsDataLoading}
          wrapperClassName="h-[calc(100%-9rem)]"
        />
      )}
      <Pagination
        index={paymentsData?.data?.index}
        size={paymentsData?.data?.size}
        totalCount={paymentsData?.data?.totalCount}
      />
      <AlertBox
        id="doc-warning-alert"
        status="warning"
        text="آیا از حذف سند اطمینان دارید؟"
        title="حذف سند"
        onCancel={() => {
          closeModalHandler("doc-warning-alert");
          setSelectItem("");
        }}
        onSubmit={() => {
          deletePaymentMutate(selectItem, {
            onSuccess() {
              setTimeout(() => {
                addToast("سند با موفقیت ثبت شد", "success");
                getPaymentsRefetch();
              }, 2);
            },
            onError() {
              addToast("حذف سند با مشکل روبرو شد", "error");
            },
          });
          closeModalHandler("doc-warning-alert");
          setSelectItem("");
        }}
      />

      <EditPaymentModal refetch={getPaymentsRefetch} data={data} />
      <CheckoutModal />
    </section>
  );
}
