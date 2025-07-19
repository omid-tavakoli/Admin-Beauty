import { FC } from "react";
import { closeModalHandler } from "../../service/utils/modalHandler";
import Badge from "../../theme/Badge";
import Modal from "../Modal";
import { GetAllSmsResponse } from "../../service/api/sms";
import { formattedDate } from "../../pages/Experts/Vacations/Vacations";
import { toJalaali } from "../../utils/date";

interface IProps {
    data : GetAllSmsResponse | undefined
}

const SmsDetailsModal: FC<IProps> = (props) => {
    const { data } = props;
    const datePersion = toJalaali(data?.date)
    const SubmitHandler = () => {
        closeModalHandler('SmsDetailsModal')
    }
    return (
        <Modal
            id={"SmsDetailsModal"}
            title="جزئیات پیامک"
            textPrimaryBtn="تایید"
            clickHandler={SubmitHandler}
        >
            <div className="flex flex-col w-full h-full gap-y-6 flex-wrap text-black text-xs">
                <div className="flex items-center gap-x-8">
                    <div className="flex flex-col gap-y-2 me-6">
                        <span className=" text-black/80">نام مشتری</span>
                        <p className="text-sm">{data?.firstName} {data?.lastName}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className=" text-black/80">شماره موبایل</span>
                        <p className="text-sm">{data?.phoneNumber}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className=" text-black/80">تاریخ رزرو</span>
                        <p className="text-sm">{datePersion.date}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className=" text-black/80">ساعت ارسال</span>
                        <p className="text-sm">{datePersion.time}</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-8">
                    <div className="flex flex-col gap-y-2 me-6">
                        <span className=" text-black/80">متن پیامک</span>
                        <p className="text-sm">{data?.message}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className=" text-black/80">وضعیت ارسال</span>

                        <Badge status={true} className="h-7  font-bold">ارسال شده</Badge>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
 export default SmsDetailsModal