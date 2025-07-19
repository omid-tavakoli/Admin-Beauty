import { FC } from "react";
import { SettingProps } from "./Setting";
import { gatewayUrl } from "../../service/config/variables";
interface props {
  introduction: SettingProps["introduction"];
}
const IntroSection: FC<props> = (props) => {
  const { introduction } = props;
  return (
    <section className="flex flex-col lg:flex-row max-w-full px-5 beauty:px-0 mx-auto mt-10 lg:mt-24 lg:justify-between">
      <div className="lg:w-2/5 w-full order-2 lg:order-1 mt-5 lg:mt-0">
        <h1 className="font-semibold text-center leading-10 lg:text-start text-[25px] ps-2 lg:text-[2.25rem] mt-2 lg:mt-5 text-black">
          {/* سالن زیبایی و آکادمی زیبایی سان بیوتی */}
          {introduction?.title}
        </h1>
        <p className="font-medium text-sm w-full lg:text-base ps-2 text-center lg:text-start mt-3 text-black">
          {/* ارائه دهنده متنوع ترین خدمات در محیط آرام و حرفه‌ای با مجرب‌ترین و
          متخصص‌ترین در حوزه زیبایی با مدرک بین‌المللی */}
          {introduction?.description}
        </p>
        <div className="flex items-center mt-6 lg:mt-11 gap-2 ps-2 w-full max-w-80 mx-auto lg:max-w-beauty lg:mx-0  ">
          <div className="h-10 w-full lg:w-[6.25rem] flex items-center justify-center text-white text-sm rounded-3xl bg-main-primary">
            رزرو آنلاین
          </div>
          <div className="h-10 w-full lg:w-[7.6rem] flex items-center lg:font-medium font-bold justify-center text-sm text-black rounded-3xl border border-gray-100 bg-white">
            مشاهده خدمات
          </div>
        </div>
        <p className="lg:mt-20 mt-8 text-sm text-blak">
          برای مشاهده نمونه‌کارها و احوالات مارا در اینستاگرام همراهی کنید
        </p>
        <div className="flex items-center lg:mt-4 lg:my-0 my-2 ms-5">
          <div className="relative w-14 h-14 bg-gradient-to-r from-pink-600 to-indigo-700 rounded-full flex items-center justify-center overflow-hidden ">
            <div className="flex items-center justify-center w-[3.375rem] h-[3.375rem] bg-orange-100 rounded-full text-[0.6rem]">
              {/* Beauty */}
              {introduction?.instaTitle}
            </div>
          </div>
          <div className="ms-3  ">
            <p className="text-sm font-semibold ">
              {introduction?.instaId}
              {/* chaeilbeauty_Tehran */}
            </p>
            <p className="text-xs">
              <span className="font-semibold"> 1.9M </span>
              Followers
            </p>
          </div>
        </div>
      </div>

      <div className="grid order-1 lg:order-2 justify-items-start lg:justify-items-center grid-rows-1 grid-cols-2 lg:grid-cols-2 gap-3">
        <img
          alt=""
          className="h-[14rem] object-cover rounded-se-[6rem] rounded-es-[6rem] justify-self-end lg:justify-self-auto"
          width={232}
          height={226}
          // src={"/public/images/example-3.png"}
          src={gatewayUrl + introduction?.image1}
        />
        <img
          alt=""
          className="h-[14rem] object-cover rounded-ee-[6rem] rounded-ss-[6rem]"
          width={232}
          height={226}
          // src={"/public/images/example-3.png"}
          src={gatewayUrl + introduction?.image2}
        />
        <img
          alt=""
          className="hidden h-[14rem] lg:block object-cover rounded-ss-[6rem] rounded-ee-[6rem]"
          width={232}
          height={226}
          // src={"/public/images/example-3.png"}
          src={gatewayUrl + introduction?.image3}
        />
        <img
          alt=""
          className="hidden h-[14rem] lg:block object-cover rounded-se-[6rem] rounded-es-[6rem]"
          width={232}
          height={226}
          // src={"/public/images/example-3.png"}
          src={gatewayUrl + introduction?.image4}
        />
      </div>
    </section>
  );
};
export default IntroSection;
