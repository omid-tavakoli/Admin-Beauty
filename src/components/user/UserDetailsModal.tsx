import { FC } from "react";
import { closeModalHandler } from "../../service/utils/modalHandler";
import Modal from "../Modal";
import { toJalaali } from "../../utils/date";
import { removeAreaCode } from "../../utils/phoneNumberEdit";
import { GetUserAccountResponse } from "../../service/api/users";
import { gatewayUrl } from "../../service/config/variables";
interface Props {
  item: GetUserAccountResponse;
}
const UserDetailsModal: FC<Props> = ({ item }) => {
  const SubmitHandler = () => {
    closeModalHandler("userDetailsModal");
  };

  return (
    <Modal
      id={"userDetailsModal"}
      title="جزییات کاربر"
      textPrimaryBtn="تایید"
      clickHandler={SubmitHandler}
    >
      <div className="flex flex-col w-full h-full gap-y-6 flex-wrap text-black text-xs font-medium">
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2 me-6">
            <span className=" text-black/80">عکس پروفایل</span>
            <img
              src={
                item.picture
                  ? gatewayUrl + item.picture
                  : "images/example-3.png"
              }
              alt="profile"
              className="size-12"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className=" text-black/80 text-xs">نام</span>
            <p className="text-sm">{item.firstName ?? "بدون نام"}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className=" text-black/80">نام خانوادگی</span>
            <p className="text-sm">{item.lastName ?? "بدون نام"}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className=" text-black/80">شماره موبایل</span>
            <p className="text-sm">
              {removeAreaCode(item?.phoneNumber) ?? "بدون موبایل"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col gap-y-2 me-6">
            <span className=" text-black/80">تاریخ ثبت نام در سایت</span>
            <p className="text-sm">{toJalaali(item.signUpDate).date}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default UserDetailsModal;
