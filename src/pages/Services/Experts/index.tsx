import { useRef, useState } from "react";
import ServicesLayout from "../../../components/Services/ServicesLayout";
import Pagination from "../../../components/Table/Pagination";
import { useGet } from "../../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { getDataExperts } from "../../../service/api/Services";

export default function Experts() {
  const newServiceRegistrationRef = useRef<HTMLDialogElement | null>(null);
  let [searchParams] = useSearchParams();
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [search, setSearch] = useState("");
  const [selectItem, setSelectItem] = useState<string | undefined>("");
  const {
    data: expertsData,
    refetch: getExpertsRefetch,
    isLoading,
  } = useGet(
    getDataExperts,
    ["getDataExperts"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      serviceId: serviceId,
    }
  );

  return (
    <>
      <ServicesLayout step={4} wrapperClassName="!mb-0">
        {isLoading && (
          <div className="space-y-6">
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
            <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
          </div>
        )}
        <div className="space-y-6">
          {/* Start Map Tips */}
          {expertsData?.data?.entity?.length != 0 ? (
            expertsData?.data?.entity?.map((card) => (
              <div className="">
                <div className="flex justify-between items-center rounded-lg border border-gray-card-border p-4">
                  <div className="flex items-center gap-x-12">
                    <div className="">{`نام: ${card?.firstName} ${card?.lastName}`}</div>
                    <div className="">{`شماره موبایل: ${card?.phoneNumber}`}</div>
                  </div>
                  <div className="flex gap-x-[72px] items-center">
                    <div className="flex gap-x-2 items-center">
                      <div>وضعیت:</div>
                      {card.isActive ? (
                        <div className="bg-green-50 text-green-500 rounded-full w-[100px] h-[33px] center">
                          فعال
                        </div>
                      ) : (
                        <div className="bg-red-500 text-red-500 rounded-full w-[100px] h-[33px] center">
                          غیر فعال
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="font-bold">کارشناسی برای این سرویس وجود ندارد !</h2>
          )}

          {/* End Map Tips */}
        </div>
        <Pagination />
      </ServicesLayout>
    </>
  );
}
