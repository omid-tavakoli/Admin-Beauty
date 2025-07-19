import { useEffect, useState } from "react";
import Modal from "../Modal";
import Pagination from "../Table/Pagination";
import { useSearchParams } from "react-router-dom";
import { useGet, useMutate } from "../../hooks/useFetch";
import { createSms, getAllUser } from "../../service/api/sms";
import { openModalHandler } from "../../service/utils/modalHandler";
import Table from "../Table";
import { TableSection } from "../Table/TableSections";

export default function SelectUserModal() {
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      allUserRefetch();
    }, 2);
  }, [getPage]);
  const tableSections: TableSection[] = [
    { title: "عکس" },
    { title: "نام" },
    { title: "نام خانوادگی" },
    { title: "شماره موبایل" },
    { title: "آدرس" },
  ];
  const searchHandler = (search : any) => {
    setSearch(search);
    setTimeout(() => {
      allUserRefetch();
    }, 2);
  }
  const { data: allUser, refetch: allUserRefetch } = useGet(
    getAllUser,
    ["getAllUser"],
    { enabled: page !== "0" },
    { index: page, size: "4", value: search }
  ); 
  const clickHandler = () => { }
  console.log(allUser)
  const tableData = allUser?.data?.entity?.map((item) => [
    { type: "selectBox" , payload: ""  },
    { type: "pic" , payload: item.picture ?? ""  },
    { type: "text", payload: item.firstName ?? "" },
    { type: "text", payload: item.lastName ?? "" },
    { type: "text", payload: item.phoneNumber ?? "" },
  ]);
  return (
    <Modal
      id={"selectUser"}
      title="لیست کاربران"
      textPrimaryBtn="تایید"
      clickHandler={clickHandler}
    >
      <div className="flex flex-col">
        <div className="relative mb-4">
          <span
            onClick={() => searchHandler && searchHandler(searchValue)}
            className="flex items-center justify-center w-9 h-9 p-2 absolute top-5 -translate-y-2/4 right-1  rounded-xl "
          >
            <svg
              width="20"
              height="20"
              className="fill-black stroke-transparent cursor-pointer"
            >
              <use href={"/images/icons/panel.svg#search"}></use>
            </svg>
          </span>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
            className="w-[15rem] ps-[3.25rem] bg-white h-[2.5rem] border border-gray-card-border p-2 pb-3 rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-sm text-sm leading-[1.313rem] font-medium placeholder:text-black/50 outline-0"
            placeholder="جست و جو"
          />
        </div>
        {!!tableData && <Table tableSections={tableSections} data={tableData} />}
        <Pagination 
         index={allUser?.data?.index}
         size={allUser?.data?.size}
         totalCount={allUser?.data?.totalCount}
        />
      </div>
    </Modal>
  )
}
