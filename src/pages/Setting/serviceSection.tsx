import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SettingProps } from "./Setting";
import { gatewayUrl } from "../../service/config/variables";

interface Props {
  service: SettingProps["service"];
}
const ServiceSection: FC<Props> = (props) => {
  const { service } = props;
  const [isPlayMovies, setIsPlayMovies] = useState(false);

  return (
    <section>
      <div className="relative xl:w-[85%] w-full pb-9 xl:pb-0 xl:h-[26.25rem] bg-main-primary xl:rounded-se-[32rem] mt-[5.5rem] z-10">
        <div className="noise-background overflow-hidden xl:rounded-se-[32rem] w-full xl:h-[26.25rem] h-full  opacity-5 absolute" />
        <div className="flex flex-col xl:flex-row xl:pe-[390px] relative xl:px-[7.5rem] px-5 items-center h-full">
        <div className="">
        <div className="relative w-fit mx-auto ">
          <h2 className="xl:text-4xl text-2xl font-semibold mx-auto">
            {service?.title}{" "}
          </h2>
          <svg className="fill-[url(#star-gradient-svg)] absolute -top-8 xl:-left-8 -left-4  w-5 h-5 xl:w-8 xl:h-8 ">
            <use href={"/assets/images/icons/landing.svg#primary-star"}></use>
            <defs>
              <linearGradient
                id="star-gradient-svg"
                x1="16.5"
                y1="0"
                x2="16.5"
                y2="33"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.255208" stopColor="var(--secondary)" />
                <stop offset="1" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="text-sm font-medium mt-5 text-center px-5 xl:px-0">
          {service?.titleDes}
        </p>
        </div>
          <div className="relative order-3 xl:order-1 w-full xl:w-fit mt-6 xl:mt-0">
            <svg
              width="27"
              height="27"
              className="fill-[url(#blue-star-gradient-svg)] absolute -top-3 right-0 hidden xl:block"
            >
              <use to={"/images/icons/landing.svg#blue-star"}></use>
              <defs>
                <linearGradient
                  id="blue-star-gradient-svg"
                  x1="13.5"
                  y1="0"
                  x2="13.5"
                  y2="27"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.255208" stop-color="#B9DFEC" />
                  <stop offset="1" stop-color="#6BDCFF" />
                </linearGradient>
              </defs>
            </svg>
            <p
              // italiana classname
              className={`${""} text-white text-[2.5rem] text-center hidden xl:block `}
            >
              {/* Beauty */}
              {service?.name}
            </p>
            <div className="xl:w-40 w-full h-[2px] white-line-gradient-90" />
            <div className="flex items-center xl:justify-around justify-center py-2 gap-5 xl:gap-0">
              <Link to={service?.instaLik ?? ""} target="_blank">
                <svg width="30" height="30" className="fill-white">
                  <use to={"/images/icons/landing.svg#white-instagram1"}></use>
                </svg>
              </Link>
              <Link to={service?.whatLink ?? ""} target="_blank">
                <svg width="30" height="30" className="fill-white">
                  <use
                    to={"public/images/icons/landing.svg#white-whatsapp"}
                  ></use>
                </svg>
              </Link>
              <Link to={service?.telLink ?? ""} target="_blank">
                <svg width="30" height="30" className="fill-white">
                  <use to={"/images/icons/landing.svg#white-telegram"}></use>
                </svg>
              </Link>
            </div>
            <div className="xl:w-40 w-full h-0.5 white-line-gradient-270" />
            <div className="h-10 w-full xl:mt-10 mt-5 flex items-center justify-center text-sm font-semibold text-main-primary xl:text-black rounded-3xl border border-gray-100 bg-white">
              رزرو آنلاین
            </div>
          </div>
          <p
            //   ${italiana.className}
            className={`${""} text-white text-[2.5rem] mt-4 text-center order-2 xl:hidden `}
          >
            {service?.name}
            Beauty
          </p>
          <p className="text-white text-sm l max-w-[25.8rem] xl:ms-9 text-center xl:text-start order-2 xl:order-1 leading-7 xl:leading-5">
            {/* سالن زیبایی سان با ارائه خدمات مختلف از جمله رنگ مو، مدل مو، میکاپ،
            خدمات ناخن، خدمات مراقبت از پوست و ... سعی در ارتقای سطح کیفی این
            صنعت داشته است و همچنین استفاده از کامل ترین و پیشرفته ترین تجهیزات
            زیبایی همیشه حس خوبی را برای کاربران خود به ارمغان آورده است. سالن
            زیبایی سان با گسترش شعبه های خود در داخل و خارج از کشور تجربه ای
            متفاوت را به ارمغان می آورد. */}
            {service?.description}
          </p>
          <div className="relative xl:absolute xl:z-10 xl:top-9 w-full xl:-left-20 flex items-center justify-center rounded-es-[2.5rem] rounded-se-[2.5rem] overflow-hidden  order-1 xl:order-2 mt-6 xl:mt-0 xl:w-[28.5rem] xl:h-[21.6rem] max-h-[calc(100vw/2)] video-white-border">
            <video
              onClick={() => setIsPlayMovies((pre) => !pre)}
              id="salon-movies"
              className="w-full h-full object-cover "
              onPause={() => setIsPlayMovies(false)}
            >
              <source src={gatewayUrl + service?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className={` video-primary-gradient absolute top-0 h-full w-full z-20 rounded-es-[2rem] rounded-se-[2rem] ${
                isPlayMovies && "!hidden"
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 z-30 rounded-lg absolute top-1/2 transform  -translate-y-1/2 bg-white bg-opacity-20 cursor-pointer ${
                isPlayMovies && "!hidden"
              }`}
              onClick={() => setIsPlayMovies(true)}
            >
              <svg height="21" width="21" className="fill-white ">
                <use to={"/images/icons/landing.svg#white-play"}></use>
              </svg>
            </div>
          </div>
          <svg
            height="68"
            width="43"
            className="fill-black stroke-transparent rotate-90 absolute top-[0.625rem] -left-[6.75rem] z-0 hidden xl:block"
          >
            <use to={"/images/icons/landing.svg#dots"}></use>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
