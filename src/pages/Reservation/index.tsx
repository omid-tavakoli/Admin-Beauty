import { useEffect, useState } from "react";
import TableHeader from "../../components/TableHeader";
import SelectBox, { ListItem } from "../../theme/SelectBox";
import { TableSection } from "../../components/Table/TableSections";
import Pagination from "../../components/Table/Pagination";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

import Input from "../../theme/Input";

import Table from "../../components/Table";
import { useSearchParams } from "react-router-dom";
import { openModalHandler } from "../../service/utils/modalHandler";
import SeeDetailsModal from "../../components/Reservation/SeeDetailsModal";
import AddReservationModal from "../../components/Reservation/AddReservationModal";
import { useGet } from "../../hooks/useFetch";
import { getReserves, ReservationStatus } from "../../service/api/Reserve";
import { toGregorian, toJalaali } from "../../utils/date";
import CancelReservationModal from "../../components/Reservation/CancelReservationModal";
import ChangeTurnModal from "../../components/Reservation/ChangeTurnModal";
import { phoneSplitter } from "../../utils/phone";
import {
  getDataBranches,
  getDataCategories,
  getDataServices,
} from "../../service/api/Services";
import { getPersonnel } from "../../service/api/Expert";
import { useUserRole } from "../../hooks/useUserRole";

//! Interfaces
interface InputValue {
  expert: { id: string; title: string };
  startTime: DayValue | undefined;
  endTime: DayValue | undefined;
  branch: any[];
  service: any[];
  branchUserId: string | undefined;
  step: any;
}

export default function Index() {
  //! states
  let [searchParams] = useSearchParams();
  const { role } = useUserRole();
  const [page, setPage] = useState("1");
  const [reserveInfo, setReserveInfo] = useState({});
  const getPage = searchParams.get("page") ?? "1";
  const [search, setSearch] = useState("");

  const [inputValue, setInputValue] = useState<InputValue>({
    expert: { id: "", title: "" },
    startTime: undefined,
    endTime: undefined,
    branch: [],
    service: [],
    branchUserId: undefined,
    step: [
      ReservationStatus.PreReserve,
      ReservationStatus.RequestToOrder,
      ReservationStatus.Paid,
    ],
  });

  //! Request
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

  const {
    data: reserve,
    refetch: getReserveRefetch,
    isFetching: reserveFetching,
  } = useGet(
    getReserves,
    ["getReserves"],
    { enabled: page !== "0" },
    {
      index: page,
      value: search,
      size: "10",
      BrancheIds: inputValue.branch.map((e: any) => e.id) ?? undefined,
      // From: `${startDate?.year}-${startDate?.month}-${startDate?.day}`,
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
      BranchUserId: inputValue.expert.id ?? undefined,
      ServiceIds: inputValue.service.map((e: any) => e.id) ?? undefined,
      Step: inputValue.step ?? undefined,
    }
  );

  const { data: servicesData, refetch: getServicesRefetch } = useGet(
    getDataServices,
    ["getDataServices"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "20",
    }
  );

  const { data: categories, refetch: getCategoriesRefetch } = useGet(
    getDataCategories,
    ["getDataCategory"],
    {},
    {}
  );
  const { data: branches, refetch: getBranchesRefetch } = useGet(
    getDataBranches,
    ["getDataBranches"],
    {}
  );

  const { data: experts, refetch: getPersonnelRefetch } = useGet(
    getPersonnel,
    ["getPersonnel"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );

  //! Handlers
  const selectBoxHandler = (
    item: ListItem,
    name: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e) {
      setInputValue((prev: any) => {
        const updatedValue = e?.target?.checked
          ? [...(Array.isArray(prev[name]) ? prev[name] : []), item]
          : (Array.isArray(prev[name]) ? prev[name] : []).filter(
              (prevItem: any) => prevItem.id !== item.id
            );
        return { ...prev, [name]: updatedValue };
      });
    } else {
      setInputValue((prev) => ({ ...prev, [name]: item }));
    }
  };
  const selectBoxHandler2 = (item: ListItem, name: string) => {
    setInputValue((prev) => ({ ...prev, [name]: item }));
  };

  const deleteFilterHandler = () => {
    setTimeout(() => {
      getReserveRefetch();
    }, 2);
    setInputValue({
      expert: { id: "", title: "" },
      startTime: undefined,
      endTime: undefined,
      branch: [],
      service: [],
      branchUserId: "",
      step: [
        ReservationStatus.PreReserve,
        ReservationStatus.RequestToOrder,
        ReservationStatus.Paid,
      ],
    });
  };

  //! UseEffects

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getReserveRefetch();
    }, 2);
  }, [getPage]);

  useEffect(() => {
    setTimeout(() => {
      getReserveRefetch();
    }, 2);
  }, [inputValue]);

  //! Table Data Handler
  const tableData = reserve?.data?.entity?.map((item) => [
    {
      type: "text",
      payload: `${
        item.firstName !== null && item.lastName !== null
          ? `${item.firstName} ${item.lastName}`
          : "بدون‌نام"
      }`,
    },
    { type: "text", payload: toJalaali(item.date).date },
    { type: "text", payload: toJalaali(item.date).time },
    { type: "text", payload: item.serviceName },
    {
      type: "text",
      payload: `${item.personnelName} ${item.personnelLastName}`,
    },
    { type: "text", payload: item.branchName },
    {
      type: "text",
      payload: `0${phoneSplitter(item?.phoneNumber)}`,
    },
    {
      type: "dropDownAction",
      payload: [
        {
          title: "مشاهده جزئیات",
          onClick: () => {
            openModalHandler("seeDetailsModal");
            setReserveInfo(item);
          },
        },
        role === "Admin"
          ? {
              title: "تسویه حساب",
              onClick: () => {
                openModalHandler("seeDetailModal");
                setReserveInfo(item);
              },
            }
          : undefined,
        role === "Admin"
          ? {
              title: "لغو نوبت",
              onClick: () => {
                openModalHandler("cancelReservationModal");
                setReserveInfo(item);
              },
            }
          : undefined,
        role === "Admin"
          ? {
              title: "جابجایی نوبت",
              onClick: () => {
                openModalHandler("changeTurnModal");
                setReserveInfo(item);
              },
            }
          : undefined,
      ],
    },
  ]);

  const tableSections: TableSection[] = [
    { title: "نام مشتری" },
    { title: "تاریخ" },
    { title: "ساعت" },
    { title: "خدمت" },
    { title: "نام کارشناس" },
    { title: "شعبه" },
    { title: "شماره موبایل" },
    { title: "عملیات" },
  ];

  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black  ">نوبت‌ها</p>
      <TableHeader
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getReserveRefetch();
          }, 2);
        }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex mt-6 gap-x-4">
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
                    placeholder: "از تاریخ و ساعت",
                  }}
                  wrapperClassName="w-32 text-sm w-60"
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
                    placeholder: "تا تاریخ و ساعت",
                  }}
                  wrapperClassName="w-32 text-sm w-60"
                />
              )}
              calendarPopperPosition="bottom"
              inputPlaceholder="انتخاب تاریخ"
              colorPrimary="#eb1086"
            />
          </div>
          <div className="w-full flex mt-6 gap-x-4">
            <SelectBox
              list={branches?.data.entity}
              selectedItem={inputValue.branch}
              onSelect={(item, e) => selectBoxHandler(item, "branch", e)}
              wrapperClassName="!w-[240px] !z-10000"
              byCheckBox
              multiSelect
              placeHolder="شعبات"
            />
            <SelectBox
              list={servicesData?.data.entity?.map((item) => ({
                id: item.id ?? "",
                title: item.title ?? "",
              }))}
              onSelect={(item, e) => selectBoxHandler(item, "service", e)}
              selectedItem={inputValue.service}
              wrapperClassName="!w-[240px] !z-10000"
              byCheckBox
              multiSelect
              placeHolder="خدمات"
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
      <section>
        <ul
          className={`flex w-full items-start h-[2.4rem] mb-6 mx-auto border-b-2 border-gray-card-border`}
        >
          <li
            onClick={() => {
              setInputValue((pre) => ({
                ...pre,
                step: [
                  ReservationStatus.PreReserve,
                  ReservationStatus.RequestToOrder,
                  ReservationStatus.Paid,
                ],
              }));
              setTimeout(() => {
                getReserveRefetch();
              }, 2);
            }}
            // onClick={() => handleTabClick(tab.id)}
            className={`min-w-[6.25rem] tab-items text-center ${inputValue.step.map(
              (item: any) =>
                item === ReservationStatus.PreReserve &&
                ReservationStatus.RequestToOrder &&
                ReservationStatus.Paid
                  ? "text-main-primary after:!w-full before:!w-full"
                  : "text-black/40"
            )}`}
          >
            درحال انجام
          </li>

          <li
            onClick={() => {
              setInputValue((pre) => ({
                ...pre,
                step: [ReservationStatus.Accepted, ReservationStatus.finish],
              }));
              setTimeout(() => {
                getReserveRefetch();
              }, 2);
            }}
            // onClick={() => handleTabClick(tab.id)}
            className={`min-w-[6.25rem] tab-items text-center ${inputValue.step.map(
              (item: any) =>
                item === ReservationStatus.Accepted && ReservationStatus.finish
                  ? "text-main-primary after:!w-full before:!w-full"
                  : "text-black/40"
            )}`}
          >
            انجام شده
          </li>
          <li
            onClick={() => {
              setInputValue((pre) => ({
                ...pre,
                step: [
                  ReservationStatus.Canceled,
                  ReservationStatus.CanceledWithCashBack,
                  ReservationStatus.CanceledByAdmin,
                  ReservationStatus.Rejected,
                ],
              }));
              setTimeout(() => {
                getReserveRefetch();
              }, 2);
            }}
            // onClick={() => handleTabClick(tab.id)}
            className={`min-w-[6.25rem] tab-items text-center ${inputValue.step.map(
              (item: any) =>
                item === ReservationStatus.Canceled &&
                ReservationStatus.CanceledWithCashBack &&
                ReservationStatus.CanceledByAdmin &&
                ReservationStatus.Rejected
                  ? "text-main-primary after:!w-full before:!w-full"
                  : "text-black/40"
            )}`}
          >
            لغو شده
          </li>
        </ul>
      </section>
      {inputValue.step.map((item: Number) =>
        item === ReservationStatus.PreReserve &&
        ReservationStatus.RequestToOrder &&
        ReservationStatus.Paid ? (
          <Table
            data={tableData ?? []}
            loading={reserveFetching}
            tableSections={tableSections}
            wrapperClassName="h-[calc(100%-13rem)]"
          />
        ) : undefined
      )}

      {inputValue.step.map((item: Number) =>
        item === ReservationStatus.Accepted && ReservationStatus.finish ? (
          <Table
            data={tableData ?? []}
            loading={reserveFetching}
            tableSections={tableSections}
            wrapperClassName="max-h-[calc(100%-13rem)]"
          />
        ) : undefined
      )}
      {inputValue.step.map((item: Number) =>
        item === ReservationStatus.Canceled &&
        ReservationStatus.CanceledWithCashBack &&
        ReservationStatus.CanceledByAdmin &&
        ReservationStatus.Rejected ? (
          <Table
            data={tableData ?? []}
            loading={reserveFetching}
            tableSections={tableSections}
            wrapperClassName="max-h-[calc(100%-13rem)]"
          />
        ) : undefined
      )}
      <Pagination
        index={reserve?.data?.index}
        size={reserve?.data?.size}
        totalCount={reserve?.data?.totalCount}
      />
      <AddReservationModal data={reserveInfo} />
      <CancelReservationModal data={reserveInfo} />
      <SeeDetailsModal data={reserveInfo} />
      <ChangeTurnModal data={reserveInfo} refetch={getReserveRefetch} />
    </section>
  );
}
