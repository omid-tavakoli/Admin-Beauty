import { FC, useEffect, useState } from "react";

import { addTipValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import Badge from "../../theme/Badge";
import { toJalaali } from "../../utils/date";
import { phoneSplitter } from "../../utils/phone";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { useMutate } from "../../hooks/useFetch";
import { cancelReserve } from "../../service/api/Reserve";
import { useToast } from "../../utils/ToastContext";

const CancelReservationModal = (props: any) => {
  const [data, setData] = useState<any>();
  const { addToast } = useToast()
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const { mutate: cancelReserveMutate } = useMutate(cancelReserve);

  const addService = () => {
    cancelReserveMutate({
      ReservationId: data?.id,
    },{onSuccess(){
      addToast('لغو نوبت با موفقیت انجام گردید ', 'success');
      closeModalHandler("cancelReservationModal");
    } ,
    onError(){
      addToast('لغو نوبت با مشکل روبرو شد' , 'error')  
    }});
  };
  const cancelReserveHandler = () => {
    closeModalHandler("cancelReservationModal");
  };
  return (
    <Modal
      id={"cancelReservationModal"}
      title="لغو رزرو"
      clickHandler={addService}
      textPrimaryBtn="مطمعنم!"
      textSecondaryBtn="انصراف"
      classSecondaryBtn="bg-white text-main-primary border border-main-primary"
      clickSecondaryHandler={cancelReserveHandler}
      wrapperClassName="!w-[29.5rem]"
    >
      <div className="flex flex-col w-full  h-full gap-y-6 flex-wrap">
        <p className="text-[16px] w-full font-medium">
          {`
          آیا از لغو رزرو خانم ${data?.personnelName}${
            data?.personnelLastName
          } در تاریخ ${toJalaali(data?.date).date} مطمئن هستید؟
           `}
        </p>
      </div>
    </Modal>
  );
};

export default CancelReservationModal;
