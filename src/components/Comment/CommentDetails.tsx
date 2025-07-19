
import { closeModalHandler } from "../../service/utils/modalHandler";
import Badge from "../../theme/Badge";
import Modal from "../Modal";

const CommentDetails = (props: any) => {

//   return (
//     <Modal
//     id={"CommentDetails"}
//     title="جزئیات دیدگاه"
//     clickHandler={() => closeModalHandler("CommentDetails")}
//     textPrimaryBtn="تایید"
//   >
//     <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
//       <div className="flex items-center gap-x-8">
//         <div className="flex flex-col gap-y-2 me-7">
//           <span className="text-xs">نام مشتری</span>
//           <p className="text-sm">{`${
//             data?.firstName !== null && data?.lastName !== null
//               ? `${data?.firstName} ${data?.lastName}`
//               : "بدون‌نام"
//           }`}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">شماره موبایل</span>
//           <p className="text-sm">{`0${phoneSplitter(data?.phoneNumber)}`}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">تاریخ رزرو</span>
//           <p className="text-sm">{toJalaali(data?.date).date}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">ساعت رزرو</span>
//           <p className="text-sm">{toJalaali(data?.date).time}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-x-8">
//         <div className="flex flex-col gap-y-2 me-7">
//           <span className="text-xs">نام کارشناس</span>
//           <p className="text-sm">{`${data?.personnelName}${data?.personnelLastName}`}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">خدمت</span>
//           <p className="text-sm">{data?.serviceName}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">شعبه</span>
//           <p className="text-sm">{data?.branchName}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-x-8">
//         <div className="flex flex-col gap-y-2 me-7">
//           <span className="text-xs">مبلغ بیعانه</span>
//           <p className="text-sm">{`${data?.prePay?.toLocaleString()} تومان`}</p>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">وضعیت پرداخت</span>
//           {data?.step ? (
//             <Badge
//               status={true}
//               className="w-[2.938rem] h-6 text-xs font-bold"
//             >
//               موفق
//             </Badge>
//           ) : (
//             <Badge
//               status={false}
//               className="w-[2.938rem] h-6 text-xs font-bold"
//             >
//               ناموفق
//             </Badge>
//           )}
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <span className="text-xs">شماره پیگیری</span>
//           <p className="text-sm">{data?.transactionTrackingCode}</p>
//         </div>
//       </div>
//     </div>
//     <SeeDetailsModal data={data} />
//   </Modal>
//   );
};

export default CommentDetails;
