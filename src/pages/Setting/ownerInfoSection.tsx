import { FC } from "react";
import { SettingProps } from "./Setting";
import { gatewayUrl } from "../../service/config/variables";

interface Props {
  ownerInfo: SettingProps["ownerInfo"];
}
const OwnerInfoSection: FC<Props> = (props) => {
  const { ownerInfo } = props;

  return (
    <section className="max-w-full justify-between lg:mt-44 mt-11 lg:flex lg:px-[7.5rem] pb-9 px-5">
      <div className="relative m-auto w-full max-w-[300px] xl:max-w-[21.3rem] sm:mx-auto lg:mx-0 h-[20.8rem]  bg-main-primary rounded-ss-[7.5rem] rounded-ee-[7.5rem]">
        <img
          alt=""
          className="z-40 w-fit h-96 xl:h-[28rem] xl:w-[32rem] absolute bottom-0 "
          width={500}
          height={500}
          //   objectFit="contain"
          src={gatewayUrl + ownerInfo?.image}
        />
        <div className="pink-gradient absolute -bottom-24 left-0 lg:-left-24 w-[19rem] h-[19rem] z-10 rounded-full blur-2xl	" />
      </div>
      <div className="lg:ms-16 text-center lg:text-start">
        <svg
          width="32"
          height="52"
          className="fill-black stroke-transparent hidden lg:block"
        >
          <use href={"assets/imgs/icons/landing.svg#dots"}></use>
        </svg>
        <p className="text-sm font-medium text-pink-primary mt-6">
          {/* مدیــــر سالن */}
          {ownerInfo?.jobPosition}
        </p>
        <h2 className="text-[2rem] font-semibold mt-2 text-black">
          {/* بانو فریال سلیمانی */}
          {ownerInfo?.title}
        </h2>
        <p className="z-40 text-sm font-medium mt-2 text-black">
          {ownerInfo?.description}
          {/* فریال سلمانی متولد مرداد 1364 در شیراز است. تحصیلات خود را در تهران به
          پایان رساند و سپس با معدل عالی وارد دانشگاه شد و در دانشگاه هنر به
          تحصیل در رشته نقاشی پرداخت. اشتیاق او به هنر در دوران نوجوانی او را پس
          از فارغ التحصیلی از دانشگاه به سمت فعالیت های مرتبط با هنر سوق داد و
          خیلی زود در بازار دکوراسیون داخلی شروع به کار کرد.{" "} */}
        </p>
      </div>
    </section>
  );
};
export default OwnerInfoSection;
