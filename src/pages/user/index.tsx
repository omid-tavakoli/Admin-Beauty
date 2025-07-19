import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGet } from "../../hooks/useFetch";
import { openModalHandler } from "../../service/utils/modalHandler";
import Pagination from "../../components/Table/Pagination";
import Table from "../../components/Table";
import { TableSection } from "../../components/Table/TableSections";
import TableHeader from "../../components/TableHeader";

import { removeAreaCode } from "../../utils/phoneNumberEdit";
import UserDetailsModal from "../../components/user/UserDetailsModal";
import {
  GetUserAccountResponse,
  getUserAccountAllQuery,
} from "../../service/api/users";

const tableSections: TableSection[] = [
  { title: "عکس" },
  { title: "نام" },
  { title: "نام خانوادگی" },
  { title: "شماره‌موبایل" },
  { title: "عملیات" },
];

const User = () => {
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("0");
  const [search, setSearch] = useState("");
  const [item, setItem] = useState<GetUserAccountResponse>({
    firstName: "",
    isActive: false,
    lastName: "",
    password: "",
    phoneNumber: "",
    picture: "",
    signUpDate: "",
    id: "",
    address: "",
    userName: "",
  });

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getUserRefetch();
    }, 2);
  }, [getPage]);

  const {
    data: userData,
    refetch: getUserRefetch,
    isLoading: userDataLoading,
    isFetching: userDataFetching,
  } = useGet(
    getUserAccountAllQuery,
    ["userDetailsModal"],
    { enabled: page !== "0" },
    { index: page, size: "10", value: search }
  );

  const tableData = userData?.data?.entity?.map((item) => [
    {
      type: "svg",
      className: "bg-gray-100",
      payload: `images/icons/user.svg#account`,
    },
    { type: "text", payload: item.firstName ?? "بدون نام" },
    { type: "text", payload: item.lastName ?? "بدون نام" },
    {
      type: "text",
      payload: removeAreaCode(item?.phoneNumber) ?? "بدون شماره",
    },
    {
      type: "buttons",
      payload: [
        {
          title: "مشاهد جزییات",
          onClick: () => {
            setItem(item);
            openModalHandler("userDetailsModal");
          },
          isPrimary: true,
        },
      ],
    },
  ]);

  return (
    <section className="relative w-full h-[calc(100%-3rem)] p-6 bg-white mt-6 rounded-lg border border-gray-card-border">
      <p className="text-base font-semibold text-black mb-6">لیست کاربران</p>
      <TableHeader
        onClickBtn={() => openModalHandler("userDetailsModal")}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getUserRefetch();
          }, 2);
        }}
      />
      <Table
        tableSections={tableSections}
        data={tableData}
        loading={userDataFetching}
        wrapperClassName="h-[calc(100%-9rem)]"
      />
      <Pagination
        index={userData?.data?.index}
        size={userData?.data?.size}
        totalCount={userData?.data?.totalCount}
      />
      <UserDetailsModal item={item} />
    </section>
  );
};
export default User;
