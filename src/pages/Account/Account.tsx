import SelectBox, { ListItem } from "../../theme/SelectBox";
import TableHeader from "../../components/TableHeader";
import Table from "../../components/Table";
import { openModalHandler } from "../../service/utils/modalHandler";
import { useEffect, useState } from "react";
import {
  accountAccept,
  accountReject,
  deleteAccount,
  getAccount,
  GetAccountResponse,
} from "../../service/api/Account/Account";
import { useGet, useMutate } from "../../hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../../utils/ToastContext";
import { TableSection } from "../../components/Table/TableSections";
import Pagination from "../../components/Table/Pagination";
import SeeDetailsAccount from "../../components/Account/SeeDetailsAccount";
import { useUserRole } from "../../hooks/useUserRole";
import AddBankAccountModal from "../../components/BankAccount/AddBankAccountModal";

const statusList = [
  { id: "0", title: "غیرفعال" },
  { id: "1", title: "فعال" },
];

export default function Account() {
  const { addToast } = useToast();
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<GetAccountResponse>();
  const [selectItem, setSelectItem] = useState<ListItem>({ id: "", title: "" });
  const { role } = useUserRole();

  const tableSections: TableSection[] =
    role === "Admin"
      ? [
          { title: "نام" },
          { title: "شماره حساب" },
          { title: "بانک" },
          { title: "وضعیت" },
          { title: "عملیات" },
        ]
      : role === "Personnel"
      ? [
          { title: "شماره حساب", width: "26" },
          { title: "شماره شبا", width: "30" },
          { title: "بانک", width: "20" },
          { title: "وضعیت", width: "27" },
          { title: "عملیات", width: "53" },
        ]
      : [];

  const { mutate: rejectMutate } = useMutate(accountReject);
  const { mutate: acceptMutate } = useMutate(accountAccept);
  const { mutate: deleteMutate } = useMutate(deleteAccount);

  const {
    data: Accounts,
    refetch: getAccountsRefetch,
    isLoading: AccountsDataLoading,
  } = useGet(
    getAccount,
    ["getAccount"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      value: search,
      isActive: selectItem?.id ?? null,
    }
  );

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getAccountsRefetch();
    }, 2);
  }, [getPage]);

  const selectBoxHandler = (item: ListItem) => {
    setSelectItem(item);
    setTimeout(() => {
      getAccountsRefetch();
    }, 2);
  };

  const tableData = Accounts?.data?.entity?.map((item) => [
    {
      type: role === "Admin" ? "text" : "",
      payload: role === "Admin" && `${item.userFirstName}${item.userLastName}`,
    },
    { type: "text", payload: item.accountId ?? "" },
    {
      type: role === "Personnel" ? "text" : "",
      payload: role === "Personnel" && item.shabaNumber,
    },
    { type: "text", payload: item.bankName ?? "" },
    {
      type: "badge",
      payload: item.status == 2 ? false : true,
      title: item.status == 2 ? "رد شده" : "تایید شده",
    },
    {
      type: "dropDownAction",
      payload: [
        role === "Admin"
          ? {
              title: "مشاهده جزئیات",
              onClick: () => {
                openModalHandler("SeeDetailsAccount");
                setData(item);
              },
            }
          : undefined,
        role === "Admin"
          ? {
              title: "لغو",
              onClick: () => {
                rejectMutate(
                  { id: item.id },
                  {
                    onSuccess() {
                      setTimeout(() => {
                        addToast("لغو حساب با موفقیت انجام گردید ", "success");
                        getAccountsRefetch();
                      }, 2);
                    },
                    onError() {
                      addToast("لغو حساب با مشکل روبرو گردید ", "error");
                    },
                  }
                );
              },
            }
          : undefined,
        role === "Admin"
          ? {
              title: "تایید",
              onClick: () => {
                acceptMutate(
                  { id: item.id },
                  {
                    onSuccess() {
                      setTimeout(() => {
                        addToast(
                          "تایید حساب با موفقیت انجام گردید ",
                          "success"
                        );
                        getAccountsRefetch();
                      }, 2);
                    },
                    onError() {
                      addToast("تایید حساب با مشکل روبرو گردید ", "error");
                    },
                  }
                );
              },
            }
          : undefined,
        role === "Personnel"
          ? {
              title: "ویرایش ",
              onClick: () => {
                openModalHandler("newBankAccountRegistrationModal");
                setData(item);
              },
            }
          : undefined,
        role === "Personnel"
          ? {
              title: "حذف حساب",
              onClick: () => {
                deleteMutate(item.id, {
                  onSuccess() {
                    setTimeout(() => {
                      addToast("حذف حساب با موفقیت انجام گردید ", "success");
                      getAccountsRefetch();
                    }, 2);
                  },
                  onError() {
                    addToast("حذف حساب با مشکل روبرو گردید ", "error");
                  },
                });
              },
            }
          : undefined,
      ],
    },
  ]);
  const deleteFilterHandler = () => {
    setSelectItem({ id: "", title: "" });
    setTimeout(() => {
      getAccountsRefetch();
    }, 2);
  };

  return (
    <section className="relative w-full bg-white h-[calc(100%-3rem)] my-6 rounded-lg border border-gray-card-border p-4 !mb-0">
      <p className="text-base font-semibold text-black">حساب‌ها</p>
      <TableHeader
        onClickBtn={() => openModalHandler("newBankAccountRegistrationModal")}
        title={`${role === "Personnel" ? " افزودن حساب " : ""}`}
        searchHandler={(search) => {
          setSearch(search);
          setTimeout(() => {
            getAccountsRefetch();
          }, 2);
        }}
      >
        <div className="w-full flex mt-6">
          <SelectBox
            wrapperClassName="!w-[244px] "
            list={statusList}
            selectedItem={selectItem}
            onSelect={(item) => selectBoxHandler(item)}
            byCheckBox
            placeHolder="انتخاب وضعیت"
          />
          <span
            onClick={deleteFilterHandler}
            className={`flex items-center justify-center w-10 h-10 ms-4 border rounded-xl `}
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
          loading={AccountsDataLoading}
          wrapperClassName="h-[calc(100%-9rem)]"
        />
      )}
      <Pagination
        WrapperClassName="!w-fit !absolute bottom-4 left-2/4 -translate-x-2/4"
        index={Accounts?.data?.index}
        size={Accounts?.data?.size}
        totalCount={Accounts?.data?.totalCount}
      />
      <SeeDetailsAccount data={data} />
      <AddBankAccountModal
        data={data}
        setData={setData}
        getAccountsRefetch={() => getAccountsRefetch()}
      />
    </section>
  );
}
