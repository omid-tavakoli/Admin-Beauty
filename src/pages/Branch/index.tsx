import { useNavigate, useSearchParams } from "react-router-dom";
import TableHeader from "../../components/TableHeader";
import Badge from "../../theme/Badge";
import { deleteBranch, getDataBranch } from "../../service/api/Branch/Branch";
import { useGet, useMutate } from "../../hooks/useFetch";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import AlertBox from "../../components/AlertBox/AlertBox";
import { useEffect, useState } from "react";
import { useToast } from "../../utils/ToastContext";
import { removeCatching } from "../../service/api/catching";

const Branch = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState("");

  const {
    data: branches,
    refetch: getBranchRefetch,
    isLoading: branchesLoading,
  } = useGet(
    getDataBranch,
    ["getDataBranch"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getBranchRefetch();
    }, 2);
  }, [getPage]);

  const { mutate: deleteBranchMutate } = useMutate(deleteBranch);
  const { mutate: removeCatchingMutate } = useMutate(removeCatching);
  const Branches = branches?.data?.entity;
  const deleteHandler = (id: string) => {
    openModalHandler("line-warning-alert");
    setSelectItem(id);
  };
  const editHandler = (id: string) => {
    navigate(`/branch/create?bi=${id}`);
  };
  return (
    <>
      <section className="relative w-full min-h-[51.688rem]   mt-6 rounded-lg border   !mb-0">
        <div className="bg-white border-gray-card-border p-6">
          <p className="text-base font-semibold text-black ">شعبات</p>
          <TableHeader
            title="شعبه جدید"
            onClickBtn={() => navigate("/branch/create")}
            searchHandler={(search) => {
              setSearch(search);
              setTimeout(() => {
                getBranchRefetch();
              }, 2);
            }}
          />
        </div>
        {branchesLoading && (
          <>
            {new Array(6).fill("").map((_, i) => (
              <>
                <div
                  key={i}
                  className="skeleton w-full h-[4.8rem] flex items-center mt-6 rounded-lg justify-between px-6"
                />
              </>
            ))}
          </>
        )}
        {Branches &&
          Branches.map((branch, i) => (
            <div
              key={i}
              className="w-full h-[4.8rem] flex items-center bg-white mt-6 rounded-lg justify-between px-6"
            >
              <div className="flex items-center">
                <svg
                  width={15}
                  height={15}
                  className="stroke-[#292D32]  fill-none me-1"
                >
                  <use href={"/images/icons/panel.svg#branch"} />
                </svg>
                <p>شعبه :{branch.title}</p>
                <span>
                  {branch.isOrigin ? (
                    <Badge
                      children={"اصلی"}
                      status={true}
                      className="!w-12 !h-6 !mr-1.5"
                    />
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className=" flex items-center">
                <p className="me-1">وضعیت:</p>
                <Badge status={branch.status == 0 ? false : true}>
                  {branch.status == 0 ? "غیر فعال" : "فعال"}
                </Badge>
                <span
                  className="flex items-center ms-9 me-4 justify-center bg-main-secondary w-9 h-9 rounded-lg cursor-pointer"
                  onClick={() => deleteHandler(branch.id)}
                >
                  <svg width="20" height="20">
                    <use href={`images/icons/panel.svg#delete`}></use>
                  </svg>
                </span>
                <span
                  className="flex items-center justify-center bg-yellow-secondary w-9 h-9 rounded-lg cursor-pointer"
                  onClick={() => editHandler(branch.id)}
                >
                  <svg width="20" height="20">
                    <use href={`images/icons/panel.svg#edit`}></use>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        <AlertBox
          id="line-warning-alert"
          status="warning"
          text="درصورت حذف، تمامی نوبت‌های این شعبه لغو می‌شوند، آیا مطمئن هستید؟"
          title="حذف لاین"
          onCancel={() => {
            closeModalHandler("line-warning-alert");
            setSelectItem("");
          }}
          onSubmit={() => {
            deleteBranchMutate(selectItem, {
              onSuccess() {
                removeCatchingMutate("reservation/branches");
                setTimeout(() => {
                  addToast(
                    "شعبه و تمامی نوبت های شعبه با موفقیت حذف گردید ",
                    "success"
                  );
                  getBranchRefetch();
                }, 2);
              },
              onError() {
                addToast("حذف شعبه با مشکل روبرو شد", "error");
              },
            });
            closeModalHandler("line-warning-alert");
            setSelectItem("");
          }}
        />
      </section>
    </>
  );
};

export default Branch;
