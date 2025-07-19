import { useEffect, useState } from "react";
import ServicesLayout from "../../../components/Services/ServicesLayout";
import Button from "../../../theme/Button";
import Pagination from "../../../components/Table/Pagination";
import AddTipModal from "../../../components/Services/AddTipModal";
import {
  closeModalHandler,
  openModalHandler,
} from "../../../service/utils/modalHandler";
import { useSearchParams } from "react-router-dom";
import { useGet, useMutate } from "../../../hooks/useFetch";
import {
  GetDataTipsResponse,
  deleteTips,
  getDataTips,
} from "../../../service/api/Services";
import AlertBox from "../../../components/AlertBox/AlertBox";
import { useToast } from "../../../utils/ToastContext";

export default function Information() {
  const { addToast } = useToast();
  let [searchParams] = useSearchParams();
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [selectItem, setSelectItem] = useState<string | undefined>("");
  const [data, setData] = useState<GetDataTipsResponse[]>();
  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getTipsRefetch();
    }, 2);
  }, [getPage]);

  const {
    data: tipsData,
    refetch: getTipsRefetch,
    isLoading,
  } = useGet(
    getDataTips,
    ["getDataTips"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      type: "1",
      serviceId: serviceId,
    }
  );

  const { mutate: deleteTipMutate } = useMutate(deleteTips);

  const deleteHandler = (cardId: string | undefined) => {
    setSelectItem(cardId);
    openModalHandler("tip-warning-alert");
  };

  const editHandler = (cardId: string | undefined) => {
    const filteredData = tipsData?.data?.entity?.filter(
      (data) => data.id === cardId
    );
    setData(filteredData);
    setSelectItem(cardId);
    openModalHandler("addTipModal");
  };

  return (
    <>
      <ServicesLayout step={2} wrapperClassName="!mb-0">
        <div className="flex justify-end mb-6">
          <Button onClick={() => openModalHandler("addTipModal")}>
            ثبت نکته جدید
          </Button>
        </div>
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
          {tipsData?.data?.entity?.length != 0 ? (
            tipsData?.data?.entity?.map((card, index) => (
              <div className="" key={card.id}>
                <div className="flex justify-between items-center rounded-lg border border-gray-card-border p-4">
                  <div className="flex items-center gap-x-6">
                    <div className="ms-[20px] !max-w-[25rem] line-clamp-2">
                      {card.name}
                    </div>
                  </div>
                  <div className="flex gap-x-[72px] items-center">
                    <div className="flex gap-x-2 items-center">
                      <div>وضعیت:</div>
                      {card.isActive ? (
                        <div className="bg-green-50 text-green-500 rounded-full w-[100px] h-[33px] center">
                          فعال
                        </div>
                      ) : (
                        <div className="bg-red-50 text-red-500 rounded-full w-[100px] h-[33px] center">
                          غیر فعال
                        </div>
                      )}
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <div
                        className="w-9 h-9 rounded-lg bg-red-50 center cursor-pointer"
                        onClick={() => deleteHandler(card?.id)}
                      >
                        <svg width="20" height="20">
                          <use href={"/images/icons/panel.svg#delete"}></use>
                        </svg>
                      </div>
                      <div
                        className="w-9 h-9 rounded-lg bg-yellow-50 center cursor-pointer"
                        onClick={() => editHandler(card?.id)}
                      >
                        <svg width="20" height="20">
                          <use href={"/images/icons/panel.svg#edit"}></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="font-bold">نکته ای برای این سرویس وجود ندارد !</h2>
          )}

          {/* End Map Tips */}
        </div>
        <AlertBox
          id="tip-warning-alert"
          status="warning"
          text="آیا از حذف نکته مطمئن هستید؟"
          title="حذف نکته"
          onCancel={() => {
            closeModalHandler("tip-warning-alert");
            setSelectItem("");
          }}
          onSubmit={() => {
            deleteTipMutate(selectItem, {
              onSuccess() {
                setTimeout(() => {
                  addToast("نکته با موفقیت حذف گردید ", "success");
                  getTipsRefetch();
                }, 2);
              },
              onError() {
                addToast("حذف نکته با مشکل روبرو شد", "error");
              },
            });
            closeModalHandler("tip-warning-alert");
            setSelectItem("");
          }}
        />

        <Pagination
          index={tipsData?.data?.index}
          size={tipsData?.data?.size}
          totalCount={tipsData?.data?.totalCount}
        />
      </ServicesLayout>
      <AddTipModal
        refetch={() =>
          setTimeout(() => {
            getTipsRefetch();
          }, 2)
        }
        data={data}
      />
    </>
  );
}
