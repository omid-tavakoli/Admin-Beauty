import { useEffect, useState } from "react";
import SelectBox, { ListItem } from "../../theme/SelectBox";
import TableHeader from "../../components/TableHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Table/Pagination";
import Table from "../../components/Table";
import { TableSection } from "../../components/Table/TableSections";
import { useGet, useMutate } from "../../hooks/useFetch";
import { deleteService, getDataServices } from "../../service/api/Services";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import AlertBox from "../../components/AlertBox/AlertBox";
import { getCategories } from "../../service/api/Category";
import { addCommas } from "../../utils/priceHandler";
import { useToast } from "../../utils/ToastContext";
import { useUserRole } from "../../hooks/useUserRole";
import PersonnelEditServices from "./personnel/EditModal";

const statusList = [
  { id: "0", title: "غیرفعال" },
  { id: "1", title: "فعال" },
];

const tableSections: TableSection[] = [
  { title: "عکس", width: "" },
  { title: "خدمت", width: "" },
  { title: "لاین", width: "" },
  { title: "مبلغ بیعانه", width: "" },
  { title: "وضعیت", width: "" },
  { title: "عملیات", width: "" },
];
export default function Services() {
  const { addToast } = useToast();
  const { role, user } = useUserRole();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState("");

  const [inputValue, setInputValue] = useState({
    lines: { id: "0", title: "" },
    status: { id: "", title: "" },
  });

  const { data: categories, refetch: getCategoriesRefetch } = useGet(
    getCategories,
    ["getDataCategory"],
    {},
    {}
  );

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getServicesRefetch();
    }, 2);
  }, [getPage]);

  const {
    data: servicesData,
    refetch: getServicesRefetch,
    isFetching: servicesDataLoading,
  } = useGet(
    getDataServices,
    ["getDataServices"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      value: search,
      isActive:
        inputValue?.status?.id === ""
          ? null
          : inputValue?.status?.id === "1"
          ? "true"
          : "false",
      serviceCategoryId: inputValue.lines.id !== "0" ? inputValue.lines.id : "",
      personnelService: role === "Personnel",
    }
  );

  const { mutate: deleteServiceMutate } = useMutate(deleteService);

  const tableData = servicesData?.data?.entity?.map((item) => [
    {
      type: "svg",
      className: "fill-black ",
      payload: `images/icons/services.svg#${item.icon}`,
    },
    { type: "text", payload: item.title ?? "" },
    { type: "text", payload: item.categoryTitle ?? "" },
    {
      type: "text",
      payload: `${addCommas(item?.prepay?.toString() ?? "0")}  تومان  `,
    },
    {
      type: "badge",
      payload: item.isActive ?? false,
      title: item.isActive ? "فعال " : "غیرفعال",
    },
    {
      type: "action",
      id: item.id,
      payload: [
        role === "Admin"
          ? {
              type: "delete",
              payload: (id?: string) => {
                if (id) {
                  openModalHandler("service-warning-alert");
                  setSelectItem(id);
                }
              },
            }
          : undefined,
        {
          type: "edit",
          className: "bg-yellow-secondary",
          payload: (id?: string) => {
            if (id) {
              if (role === "Admin") {
                navigate(`/services/information?si=${id}`);
              }
              setSelectItem(id);
              openModalHandler("personnelEditTime");
            }
          },
        },
      ],
    },
  ]);

  const deleteFilterHandler = () => {
    setInputValue({
      lines: { id: "0", title: "" },
      status: { id: "", title: "" },
    });
    setTimeout(() => {
      getServicesRefetch();
    }, 2);
  };

  const selectBoxHandler = (item: ListItem, name: string) => {
    setInputValue((prev) => ({ ...prev, [name]: item }));
    setTimeout(() => {
      getServicesRefetch();
    }, 2);
  };

  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black">خدمات</p>
      <TableHeader
        title="ثبت خدمت جدید"
        onClickBtn={() => navigate("/services/Information")}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getServicesRefetch();
          }, 2);
        }}
      >
        <div className="w-full flex gap-x-4 mt-6">
          <SelectBox
            inputProps={{
              name: "selectLine",
            }}
            wrapperClassName="!w-[244px] "
            list={
              categories?.data?.entity?.map((item) => ({
                id: item.id ?? "",
                title: item.title ?? "",
              })) ?? []
            }
            selectedItem={inputValue.lines}
            onSelect={(item) => selectBoxHandler(item, "lines")}
            byCheckBox
            placeHolder="انتخاب لاین"
          />
          <SelectBox
            inputProps={{
              name: "selectLine",
            }}
            wrapperClassName="!w-[244px] "
            list={statusList ?? []}
            selectedItem={inputValue.status}
            onSelect={(item) => selectBoxHandler(item, "status")}
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
      </TableHeader>
      {!!tableData && (
        <Table
          tableSections={tableSections}
          data={tableData}
          loading={servicesDataLoading}
          wrapperClassName="h-[calc(100%-9rem)]"
        />
      )}
      <Pagination
        WrapperClassName="!w-fit !absolute bottom-4 left-2/4 -translate-x-2/4"
        index={servicesData?.data?.index}
        size={servicesData?.data?.size}
        totalCount={servicesData?.data?.totalCount}
      />
      {role === "Personnel" && (
        <PersonnelEditServices
          serviceId={selectItem}
          onCloseModal={() => {
            setSelectItem("");
          }}
        />
      )}
      <AlertBox
        id="service-warning-alert"
        status="warning"
        text="درصورت حذف، تمامی نوبت‌های این سرویس لغو می‌شوند، آیا مطمئن هستید؟"
        title="حذف سرویس"
        onCancel={() => {
          closeModalHandler("service-warning-alert");
          setSelectItem("");
        }}
        onSubmit={() => {
          deleteServiceMutate(selectItem, {
            onSuccess() {
              setTimeout(() => {
                addToast(
                  "خدمت و تمامی نوبت های خدمت با موفقیت حذف گردید ",
                  "success"
                );
                getServicesRefetch();
              }, 2);
            },
            onError() {
              addToast("حذف خدمت با مشکل روبرو شد", "error");
            },
          });
          closeModalHandler("service-warning-alert");
          setSelectItem("");
        }}
      />
    </section>
  );
}
