import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AlertBox from "../../components/AlertBox/AlertBox";
import NewServiceModal from "../../components/Lines/NewServiceModal";
import Table from "../../components/Table";
import Pagination from "../../components/Table/Pagination";
import { TableSection } from "../../components/Table/TableSections";
import TableHeader from "../../components/TableHeader";
import { useGet, useMutate } from "../../hooks/useFetch";
import { deleteLine, getCategories } from "../../service/api/Category";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import { useToast } from "../../utils/ToastContext";

const tableSections: TableSection[] = [
  { title: "عکس" },
  { title: "لاین" },
  { title: "وضعیت" },
  { title: "عملیات" },
];

const Lines = () => {
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const { addToast } = useToast()
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getCategoriesRefetch();
    }, 2);
  }, [getPage]);

  const {
    data: categories,
    refetch: getCategoriesRefetch,
    isFetching: categoriesLoading,
  } = useGet(
    getCategories,
    ["getDataCategory"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );
  const { mutate: deleteLineMutate } = useMutate(deleteLine);

  const tableData = categories?.data?.entity?.map((item) => [
    {
      type: "svg",
      className: "fill-none stroke-black",
      payload: `images/icons/lines.svg#${item.icon}`,
    },
    { type: "text", payload: item.title ?? "" },
    {
      type: "badge",
      payload: item.isActive ?? false,
      title: item.isActive ? "فعال " : "غیرفعال",
    },
    {
      type: "action",
      id: item.id,
      payload: [
        {
          type: "delete",
          payload: (id?: string) => {
            if (id) {
              openModalHandler("line-warning-alert");
              setSelectItem(id);
            }
          },
        },
        {
          type: "edit",
          className: "bg-yellow-secondary",
          payload: (id?: string) => {
            if (id) {
              setSelectItem(id);
              openModalHandler("newServiceRegistrationModal");
            }
          },
        },
      ],
    },
  ]);
  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black mb-6">لاین‌ ها</p>
      <TableHeader
        title="ثبت لاین جدید"
        onClickBtn={() => openModalHandler("newServiceRegistrationModal")}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getCategoriesRefetch();
          }, 2);
        }}
      />
      <Table
        tableSections={tableSections}
        data={tableData}
        loading={categoriesLoading}
        wrapperClassName="h-[calc(100%-9rem)]"
      />
      <Pagination
        index={categories?.data?.index}
        size={categories?.data?.size}
        totalCount={categories?.data?.totalCount}
      />
      <NewServiceModal
        selectedItem={categories?.data?.entity?.find(
          (cat) => cat.id === selectItem
        )}
        refetch={
          page === "1" || selectItem !== "" ? getCategoriesRefetch : undefined
        }
        emptyCloseModal={() => setSelectItem("")}
      />
      <AlertBox
        id="line-warning-alert"
        status="warning"
        text="درصورت حذف، تمامی نوبت‌های این لاین لغو می‌شوند، آیا مطمئن هستید؟"
        title="حذف لاین"
        onCancel={() => {
          closeModalHandler("line-warning-alert");
          setSelectItem("");
        }}
        onSubmit={() => {
          deleteLineMutate(selectItem, {
            onSuccess() {
              setTimeout(() => {
                addToast('لاین و تمامی نوبت های لاین با موفقیت حذف گردید ', 'success');
                getCategoriesRefetch();
              }, 2);
            },
            onError(){
              addToast('حذف لاین با مشکل روبرو شد' , 'error')   
            }
          });
          closeModalHandler("line-warning-alert");
          setSelectItem("");
        }}
      />
    </section>
  );
};

export default Lines;
