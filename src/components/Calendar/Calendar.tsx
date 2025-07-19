import { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  DaySectionDesktopSkeleton,
  DaySectionMobileSkeleton,
} from "../Skeleton/DaySectionSkeleton";
import HourSectionSkeleton from "../SelectUser/HourSectionSkeleton";
import { useGet, useMutate } from "../../hooks/useFetch";
import { reservationTimes } from "../../service/api/Reserve";
import { addCommas } from "../../utils/priceHandler";
import { toJalaali } from "../../utils/date";

import { useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "بهمن",
  "اسفند",
];
interface SelectTimeCardProps {
  userInfo?: any;
  data: any;
}
const SelectTimeCard: FC<SelectTimeCardProps> = (props) => {
  const {
    data: reservationTimesData,
    isLoading,
    refetch: getReservationTimesData,
  } = useGet(
    reservationTimes,
    ["reservationTimes"],
    { enabled: !!props.data?.details },
    {
      BranchId: props.data?.details?.[0].branchId,
      Services: [
        {
          userServiceId: props.data?.details?.[0].serviceId,

          branchUserId: props.data?.details?.[0].branchUserId,
        },
      ],
      From: new Date(props.data?.date),
      ToleranceToRelaxTimePerMinute: 0,
      To: new Date(
        new Date(props.data?.date).getTime() + 30 * 24 * 60 * 60 * 1000
      ),
    }
  );

  const { mutate: reservationTimesMutate } = useMutate(reservationTimes);
  const [selectedMonth, setSelectedMonth] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();
  const [selectedHour, setSelectedHour] = useState("");
  const currentMonth = toJalaali(new Date()).month.persian;
  const currentDay = toJalaali(new Date()).day.persian;
  useLayoutEffect(() => {
    if (!!reservationTimesData?.data?.entity?.freeTimes) {
      setSelectedDay(
        Object.keys(reservationTimesData?.data?.entity?.freeTimes ?? [])[0]
      );
    }
  }, [reservationTimesData?.data?.entity]);

  useEffect(() => {
    if (props.data?.date) {
      setSelectedMonth(props.data?.date);
      setSelectedDay(props.data?.date);
      setSelectedHour(props.data.date);
    }
  }, [props.data]);

  return (
    <div className="w-full h-full">
      <section className="flex flex-col sm:flex-row gap-4 w-full h-full max-w-[58.125rem] mx-auto sm:h-[32.5rem] sm:px-5">
        <div className="hidden shrink-0 sm:flex flex-col w-[14.375rem] h-full bg-white border border-card-border pt-[1.125rem] pb-3 rounded-2xl">
          <p className="text-base leading-[1.625rem] font-bold text-black ps-4">
            انتخاب تقویم
          </p>
          <div className="relative w-full mt-[1.625rem] mb-[1.25rem]">
            <Swiper
              className="w-full"
              modules={[Navigation, EffectFade]}
              navigation={{
                nextEl: ".calendar-navigation-next",
                prevEl: ".calendar-navigation-prev",
                disabledClass: "disabled-swiper-navigation",
              }}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              initialSlide={months.indexOf(currentMonth)}
              onInit={(e: any) => {
                setSelectedMonth(months[e?.activeIndex]);
              }}
              onActiveIndexChange={(e: any) =>
                setSelectedMonth(months[e?.activeIndex])
              }
            >
              {!selectedMonth ? (
                <div className="skeleton w-[3.75rem] mx-auto h-[1.375rem] rounded-lg" />
              ) : (
                months.map((month, i) => (
                  <SwiperSlide
                    key={i}
                    className="text-center text-black text-sm leading-[1.375rem] font-bold"
                  >
                    {month === currentMonth ? currentMonth : month}
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            <div className="calendar-navigation-next absolute left-2.5 top-2/4 -translate-y-2/4 z-20 cursor-pointer">
              <img
                src={"/images/icons/arrow-left2.svg"}
                alt=""
                width={18}
                height={18}
              />
            </div>
            <div className="calendar-navigation-prev absolute right-2.5 top-2/4 -translate-y-2/4 z-20 cursor-pointer">
              <img
                src={"/images/icons/arrow-left2.svg"}
                alt=""
                className="rotate-180"
                width={18}
                height={18}
              />
            </div>
          </div>
          <ul
            dir="ltr"
            className={`flex flex-col px-[0.375rem] mx-1 h-[25rem] ${
              selectedDay ? "overflow-y-auto" : "overflow-hidden"
            } custom-scrollBar`}
          >
            {!selectedDay
              ? new Array(10)
                  .fill("")
                  .map((skeleton) => <DaySectionDesktopSkeleton />)
              : Object.keys(
                  reservationTimesData?.data?.entity?.freeTimes ?? []
                )?.map((day, i) => (
                  <li
                    dir="rtl"
                    onClick={() => setSelectedDay(day)}
                    className={`group flex justify-between last-of-type:!mb-0 px-3 py-[0.625rem] rounded-lg transition-all duration-300 ${
                      day === selectedDay && "bg-main-primary shadow-md"
                    } hover:bg-main-primary hover:shadow-md cursor-pointer`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`text-[0.688rem] leading-[0.875rem] font-normal text-black/40 transition-[text] duration-300 group-hover:text-white/60 ${
                          day === selectedDay && "!text-white/60"
                        }`}
                      >
                        {toJalaali(selectedMonth).month.persian}
                      </span>
                      <span
                        className={`${
                          day === selectedDay && "text-white"
                        } text-sm leading-[1.375rem] font-semibold text-black transition-[color] duration-300 group-hover:text-white`}
                      >
                        {toJalaali(day).day.persian}
                      </span>
                    </div>
                    <span
                      className={`transition-[color] duration-300 group-hover:text-white ${
                        day === selectedDay && "text-white"
                      }`}
                    >
                      {toJalaali(day).day.numeric}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-2 sm:gap-y-4 w-full h-full px-5 sm:px-0">
          <p className="text-sm font-semibold text-danger-500 rounded-xl py-[0.625rem] bg-danger-50 text-center">
            10 دقیقه مهلت دارید تا مراحل رزرو را تکمیل کنید در غیر این صورت نوبت
            شما لغو خواهد شد
          </p>
          <div className="flex gap-x-2 sm:gap-x-4 w-full">
            <div className="flex flex-col items-center justify-start sm:items-start overflow-hidden h-20 w-1/3 py-[0.875rem] px-3 sm:px-[1.125rem] bg-white border border-card-border rounded-xl sm:rounded-2xl">
              <p className="text-black/50 text-xs sm:text-sm font-medium mb-2 ">
                خدمت زیبایی
              </p>
              {isLoading ? (
                <div className="skeleton w-full h-[1.375rem] rounded-lg" />
              ) : (
                <p className="text-black text-[0.813rem] sm:text-base leading-5 font-semibold line-clamp-2 break-all">
                  {reservationTimesData?.data?.entity?.serviceTitle ?? ""}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:items-start overflow-hidden h-20 w-1/3 py-[0.875rem] px-3 sm:px-[1.125rem] bg-white border border-card-border rounded-xl sm:rounded-2xl">
              <p className="text-black/50 text-xs sm:text-sm font-medium mb-2">
                آرایشگر
              </p>
              {isLoading ? (
                <div className="skeleton w-full h-[1.375rem] rounded-lg" />
              ) : (
                <p className="text-black text-[0.813rem] sm:text-base leading-5 font-semibold line-clamp-2 break-all">
                  {(reservationTimesData?.data?.entity?.branchUserFirstName &&
                    !isLoading) ??
                    "فرقی ندارد"}
                  {`${
                    reservationTimesData?.data?.entity?.branchUserFirstName ??
                    ""
                  } ${
                    reservationTimesData?.data?.entity?.branchUserLastName ?? ""
                  }`}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:items-start overflow-hidden h-20 w-1/3 py-[0.875rem] px-3 sm:px-[1.125rem] bg-white border border-card-border rounded-xl sm:rounded-2xl">
              <p className="text-black/50 text-xs sm:text-sm font-medium mb-2">
                بیعانه
              </p>
              {isLoading ? (
                <div className="skeleton w-full h-[1.375rem] rounded-lg" />
              ) : (
                <p className="text-black text-[0.813rem] sm:text-base leading-5 font-semibold line-clamp-2 break-all">
                  {addCommas(
                    reservationTimesData?.data?.entity?.prepay.toString() ?? ""
                  )}
                  تومان
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 h-[6.625rem] sm:hidden flex-col bg-white pt-[0.625rem] pb-4 px-[0.875rem] border border-card-border rounded-xl sm:rounded-2xl">
            <div className="w-full h-fit self-start flex items-center justify-between mb-auto">
              <p className="text-sm leading-[1.625rem] font-bold text-black">
                انتخاب از تقویم
              </p>
              <span className="text-[0.813rem] leading-[1.313rem] font-semibold text-main-primary">
                مشاهده تقویم
              </span>
            </div>
            <div className="relative w-full h-full">
              <Swiper
                className="w-full"
                modules={[Navigation, EffectFade]}
                navigation={{
                  nextEl: ".mobile-calendar-navigation-next",
                  prevEl: ".mobile-calendar-navigation-prev",
                  disabledClass: "disabled-swiper-navigation",
                }}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                initialSlide={months.indexOf(currentDay)}
                onInit={(e: any) => {
                  setSelectedDay(
                    Object.keys(
                      reservationTimesData?.data?.entity?.freeTimes ?? []
                    )[e?.activeIndex]
                  );
                }}
                onActiveIndexChange={(e: any) =>
                  setSelectedDay(
                    Object.keys(
                      reservationTimesData?.data?.entity?.freeTimes ?? []
                    )[e?.activeIndex]
                  )
                }
                centerInsufficientSlides
                centeredSlides
                centeredSlidesBounds
              >
                {!selectedDay || isLoading ? (
                  <DaySectionMobileSkeleton />
                ) : (
                  Object.keys(
                    reservationTimesData?.data?.entity?.freeTimes ?? []
                  )?.map((day, i) => (
                    <SwiperSlide
                      key={i}
                      className="text-center text-black text-sm leading-[1.375rem] font-bold"
                    >
                      <div className="flex flex-col items-start gap-y-1 w-20 mx-auto">
                        <span className="text-black/65 text-xs leading-[0.875rem] font-normal">
                          {toJalaali(day).month.persian}
                        </span>
                        <p className="text-[0.938rem] leading-[1.375rem] text-black font-semibold">
                          {toJalaali(day).day.persian}
                          <span className="text-[1.125rem] leading-[1.375rem] text-black font-semibold ms-1">
                            {toJalaali(day).day.numeric}
                          </span>
                        </p>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>

              <div className="mobile-calendar-navigation-next cursor-pointer absolute left-0 top-2/4 z-10 -translate-y-2/4 ">
                <span className="text-sm leading-[0.875rem] text-black font-normal">
                  روز بعد
                </span>
                <img
                  className="inline align-middle"
                  src={"/images/icons/arrow-Right3.svg"}
                  alt=""
                  width={18}
                  height={18}
                />
              </div>
              <div className="mobile-calendar-navigation-prev cursor-pointer absolute right-0 top-2/4 z-10 -translate-y-2/4">
                <img
                  className="inline align-middle -rotate-180"
                  src={"/images/icons/arrow-Right3.svg"}
                  alt=""
                  width={18}
                  height={18}
                />
                <span className="text-sm leading-[0.875rem] text-black font-normal">
                  روز قبل
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-full pb-12 pt-5 sm:pb-10 bg-white border border-card-border rounded-2xl mb-24 sm:mb-0">
            {!selectedDay || isLoading ? (
              <div className="skeleton w-3/5 sm:w-2/5 h-6 rounded-lg mx-[1.125rem]" />
            ) : (
              <div className="flex items-center mx-[1.125rem] gap-x-0.5">
                <span className="text-black text-sm font-medium">
                  انتخاب ساعت برای تاریخ
                </span>
                <span>{toJalaali(selectedDay).day?.persian}</span>
                <span>{toJalaali(selectedDay).day?.numeric}</span>
                <span>{toJalaali(selectedMonth).month.persian}</span>
              </div>
            )}
            <div
              dir="ltr"
              className="flex flex-col mx-1 px-[0.875rem] gap-y-5 sm:gap-y-[2.25rem] mt-[1.125rem] bg-white h-full sm:h-full sm:max-h-[calc(100%-2.438rem)] sm:overflow-y-auto sm:custom-scrollBar"
            >
              <div
                dir="rtl"
                className="grid grid-cols-[repeat(3,1fr)] sm:grid-cols-[repeat(auto-fill,minmax(82px,1fr))] gap-x-3 gap-y-3 text-center"
              >
                {isLoading ? (
                  <HourSectionSkeleton />
                ) : (
                  reservationTimesData?.data?.entity?.freeTimes[
                    selectedDay
                  ]?.map((hour, index) => (
                    <div
                      tabIndex={0}
                      key={index}
                      onClick={() => setSelectedHour(hour.from)}
                      className={`flex items-center justify-center text-sm leading-[1.625rem] font-medium text-black h-[2.625rem] sm:h-[2.375rem] py-[0.375rem] px-4 cursor-pointer transition-all duration-[600ms] border border-card-border ${
                        selectedHour === hour.from &&
                        "border-main-primary shadow-md"
                      } hover:border-main-primary hover:shadow-md rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm`}
                    >
                      {toJalaali(hour.from).time}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectTimeCard;
