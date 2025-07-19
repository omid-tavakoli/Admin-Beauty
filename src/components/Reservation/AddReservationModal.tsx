import { useEffect, useState } from "react";

import Modal from "../Modal";
import Badge from "../../theme/Badge";
import { toJalaali } from "../../utils/date";
import { phoneSplitter } from "../../utils/phone";
import {
  closeModalHandler,
  openModalHandler,
} from "../../service/utils/modalHandler";
import SeeDetailsModal from "./SeeDetailsModal";
import { useUserRole } from "../../hooks/useUserRole";
import { addCommas } from "../../utils/priceHandler";

const AddReservationModal = (props: any) => {
  const { role } = useUserRole();
  const [data, setData] = useState<any>();
  console.log(data);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const checkOutHandler = () => {
    openModalHandler("seeDetailModal");
    closeModalHandler("seeDetailsModal");
  };
  const cancelReserveHandler = () => {
    openModalHandler("cancelReservationModal");
    closeModalHandler("seeDetailsModal");
  };

  const stepHandler = (step: number) => {
    if (step === 0) return { step, message: "پیش رزرو", status: "pending" };
    if (step === 1)
      return { step, message: "درخواست پرداخت", status: "pending" };
    if (step === 2) return { step, message: "پرداخت شده", status: "pending" };
    if (step === 3) return { step, message: "لغو شده", status: false };
    if (step === 4)
      return { step, message: "کنسل شده به همراه عودت وجه", status: false };
    if (step === 5)
      return { step, message: "کنسل شده با ادمین", status: false };
    if (step === 6) return { step, message: "تائید شده", status: true };
    if (step === 7) return { step, message: "لغو شده", status: false };
    if (step === 8) return { step, message: "نهایی شده", status: true };
  };
  return (
    <Modal
      id={"seeDetailsModal"}
      title="جزئیات رزرو"
      clickHandler={checkOutHandler}
      textPrimaryBtn={role == "Admin" ? "تسویه حساب" : undefined}
      textSecondaryBtn={role == "Admin" ? "لغو رزرو" : undefined}
      classSecondaryBtn="bg-white text-main-primary border border-main-primary"
      clickSecondaryHandler={cancelReserveHandler}
    >
      <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2 me-7">
            <span className="text-xs">نام مشتری</span>
            <p className="text-sm">{`${
              data?.firstName !== null && data?.lastName !== null
                ? `${data?.firstName} ${data?.lastName}`
                : "بدون‌نام"
            }`}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">شماره موبایل</span>
            <p className="text-sm">{`0${phoneSplitter(data?.phoneNumber)}`}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">تاریخ رزرو</span>
            <p className="text-sm">{toJalaali(data?.date).date}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">ساعت رزرو</span>
            <p className="text-sm">{toJalaali(data?.date).time}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2 me-7">
            <span className="text-xs">نام کارشناس</span>
            <p className="text-sm">{`${data?.personnelName}${data?.personnelLastName}`}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">خدمت</span>
            <p className="text-sm">{data?.serviceName}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">شعبه</span>
            <p className="text-sm">{data?.branchName}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2 me-7">
            <span className="text-xs">مبلغ بیعانه</span>
            <p className="text-sm">{`${addCommas(
              data?.prePay?.toLocaleString()
            )} تومان`}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">وضعیت پرداخت</span>
            <Badge
              status={stepHandler(data?.step)?.status}
              className={`!w-full px-1 h-6 text-xs font-bold`}
            >
              {stepHandler(data?.step)?.message}
            </Badge>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs">شماره پیگیری</span>
            <p className="text-sm">{data?.transactionTrackingCode ?? "-"}</p>
          </div>
        </div>
      </div>
      <SeeDetailsModal data={data} />
    </Modal>
  );
};

export default AddReservationModal;
