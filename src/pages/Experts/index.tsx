import { useNavigate, useSearchParams } from "react-router-dom";
import TableHeader from "../../components/TableHeader";
import Pagination from "../../components/Table/Pagination";
import { useGet, useMutate } from "../../hooks/useFetch";
import { deletePersonnel, getPersonnel } from "../../service/api/Expert";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import { useEffect, useState } from "react";
import AlertBox from "../../components/AlertBox/AlertBox";
import { useToast } from "../../utils/ToastContext";

export default function Experts() {
  const { addToast } = useToast()
  const navigate = useNavigate();
  function onSubmit() {
    navigate("/expert/information");
  }
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState("");

  const {
    data: data,
    refetch: getPersonnelRefetch,
    isLoading,
  } = useGet(
    getPersonnel,
    ["getPersonnel"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getPersonnelRefetch();
    }, 2);
  }, [getPage]);
  const { mutate: deletePersonnelMutate } = useMutate(deletePersonnel);
  const Personnel = data?.data?.entity;

  const deleteHandler = (id: string) => {
    setSelectItem(id);
    openModalHandler("line-warning-alert");
  };
  const editHandler = (id: string) => {
    navigate(`/expert/information?ui=${id}`);
  };
  return (
    <section className="relative w-full min-h-[51.688rem] p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
      <p className="text-base font-semibold text-black mb-6">کارشناسان</p>
      <TableHeader
        onClickBtn={onSubmit}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getPersonnelRefetch();
          }, 2);
        }}
        title="ثبت کارشناس جدید"
      />
      {isLoading && (
        <div className="space-y-6">
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
          <div className="skeleton h-[5.125rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
        </div>
      )}
      <div className="flex flex-col gap-y-6">
        {Personnel?.map((expert, i) => (
          <div
            className="flex justify-between items-center rounded-lg border border-gray-card-border p-4"
            key={i}
          >
            <div className="flex items-center gap-x-6">
              <div className="w-12 h-12">
                <img src={expert.picture} alt="profile" />
              </div>
              <div>نام: {`${expert.firstName} ${expert.lastName}`}</div>
            </div>
            <div className="flex gap-x-[72px] items-center">
              <div className="flex gap-x-2 items-center">
                <div>وضعیت:</div>
                <div className="bg-green-50 text-green-500 rounded-full w-[100px] h-[33px] center">
                  {expert.isActive == true ? "فعال" : "غیرفعال"}
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <div
                  className="w-9 h-9 rounded-lg bg-red-50 center cursor-pointer"
                  onClick={() => deleteHandler(expert.id)}
                >
                  <svg width="20" height="20">
                    <use href={"images/icons/panel.svg#delete"}></use>
                  </svg>
                </div>
                <div
                  className="w-9 h-9 rounded-lg bg-yellow-50 center cursor-pointer"
                  onClick={() => editHandler(expert.id)}
                >
                  <svg width="20" height="20">
                    <use href={"images/icons/panel.svg#edit"}></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        index={data?.data?.index}
        size={data?.data?.size}
        totalCount={data?.data?.totalCount}
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
          deletePersonnelMutate(selectItem, {
            onSuccess() {
              setTimeout(() => {
                addToast(' کارشناس و تمامی نوبت هایش با موفقیت حذف گردید' , 'success')   
                getPersonnelRefetch();
              }, 2);
            },
            onError(){
              addToast('حذف کارشناس با مشکل روبرو شد' , 'error')   
            }
          });
          closeModalHandler("line-warning-alert");
          setSelectItem("");
        }}
      />
    </section>
  );
}
