import { useEffect, useState } from "react";

import Modal from "../Modal";
import Badge from "../../theme/Badge";
import { toJalaali } from "../../utils/date";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { addCommas } from "../../utils/priceHandler";

const ViewDetailsModal = (props: any) => {
  const [data, setData] = useState<any>();
  // console.log("data in modal", data);
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  const checkOutHandler = () => {
    closeModalHandler("ViewDetailsModal");
  };

  return (
    <Modal
      id={"ViewDetailsModal"}
      title="جزئیات سند"
      clickHandler={checkOutHandler}
      textPrimaryBtn="تایید"
    >
      <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">شرح</span>
            <p className="text-sm">{data?.description}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col gap-y-2 w-[9.375rem]">
            <span className="text-xs">تاریخ</span>
            <p className="text-sm">
              {toJalaali(data?.date)?.date && toJalaali(data?.date)?.date}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 me-7 w-[9.375rem]">
            <span className="text-xs">مبلغ</span>
            <p
              className={`text-sm ${
                data?.type ? "text-green-primary" : "text-danger-primary"
              }`}
            >{`${data?.amount?.toString()}${data?.type ? "+" : "-"} تومان`}</p>
          </div>
          <div className="flex flex-col gap-y-2 w-[9.375rem]">
            <span className="text-xs">نوع تراکنش</span>
            <Badge status={data?.type} className={`font-bold !pb-0`}>
              {data?.type ? "واریز" : "برداشت"}
            </Badge>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDetailsModal;
