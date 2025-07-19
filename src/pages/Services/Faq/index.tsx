import { useEffect, useState } from "react";
import ServicesLayout from "../../../components/Services/ServicesLayout";
import Button from "../../../theme/Button";
import Pagination from "../../../components/Table/Pagination";
import {
  closeModalHandler,
  openModalHandler,
} from "../../../service/utils/modalHandler";
import AddFaqModal from "../../../components/Services/AddFaqModal";
import { useSearchParams } from "react-router-dom";
import {
  GetDataFaqsResponse,
  deleteFaqs,
  getDataFaqs,
} from "../../../service/api/Services";
import { useGet, useMutate } from "../../../hooks/useFetch";
import AlertBox from "../../../components/AlertBox/AlertBox";
import { useToast } from "../../../utils/ToastContext";

export interface CardInfo {
  id?: string;
  name?: string;
  displayName?: string;
  isActive?: boolean;
  type?: number;
  value?: string;
  answer?: string;
}

export default function Faq() {
  const { addToast } = useToast()
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  const getPage = params.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [selectItem, setSelectItem] = useState<string | undefined>("");
  const [data, setData] = useState<GetDataFaqsResponse[] | CardInfo>();

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      getFaqsRefetch();
    }, 2);
  }, [getPage]);

  const { data: faqsData, refetch: getFaqsRefetch  , isLoading} = useGet(
    getDataFaqs,
    ["getDataFaqs"],
    { enabled: page !== "0" },
    {
      index: page,
      size: "10",
      type: "0",
      serviceId,
    }
  );

  const { mutate: deleteFaqMutate } = useMutate(deleteFaqs);

  const deleteHandler = (cardId: string | undefined) => {
    setSelectItem(cardId);
    openModalHandler("faq-warning-alert");
  };

  const editHandler = (cardId?: string) => {
    const filteredData = faqsData?.data?.entity?.filter(
      (data) => data.id === cardId
    );
    setData(filteredData);
    openModalHandler("addFaqModal");
    setSelectItem(cardId);
  };

  return (
    <>
      <ServicesLayout step={3} wrapperClassName="!mb-0">
        <div className="flex justify-end mb-6">
          <Button onClick={() => openModalHandler("addFaqModal")}>
            ثبت سوالات متداول
          </Button>
        </div>
        {isLoading &&
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
        }
        <div className="space-y-6">
          {/* Start Map Tips */}
          {faqsData?.data?.entity?.length != 0 ? (
            faqsData?.data?.entity?.map((card, index) => (
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
                        className="w-9 h-9 rounded-lg bg-red-50 center hover:cursor-pointer"
                        onClick={() => deleteHandler(card?.id)}
                      >
                        <svg width="20" height="20">
                          <use href={"/images/icons/panel.svg#delete"}></use>
                        </svg>
                      </div>
                      <div
                        className="w-9 h-9 rounded-lg bg-yellow-50 center hover:cursor-pointer"
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
            <h2 className="font-bold">سوالی برای این سرویس وجود ندارد !</h2>
          )}
          {/* End Map Tips */}
        </div>
        <Pagination
          index={faqsData?.data?.index}
          size={faqsData?.data?.size}
          totalCount={faqsData?.data?.totalCount}
        />
      </ServicesLayout>
      <AlertBox
        id="faq-warning-alert"
        status="warning"
        text="آیا از حذف سوال مطمئن هستید؟"
        title="حذف سوال"
        onCancel={() => {
          closeModalHandler("faq-warning-alert");
          setSelectItem("");
        }}
        onSubmit={() => {
          deleteFaqMutate(selectItem, {
            onSuccess() {
              setTimeout(() => {
                addToast('سوال متداول با موفقیت حذف گردید ', 'success');
                getFaqsRefetch();
              }, 2);
              closeModalHandler("faq-warning-alert");
              setSelectItem("");
            },
            onError(){
              addToast('حذف سوال متداول با مشکل روبرو شد' , 'error')   
            },
          });
        }}
      />
      <AddFaqModal
        data={data}
        refetch={() =>
          setTimeout(() => {
            getFaqsRefetch();
          }, 2)
        }
      />
    </>
  );
}
