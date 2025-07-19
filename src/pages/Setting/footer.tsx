import { FC } from "react";
import { Link } from "react-router-dom";
import { SettingProps } from "./Setting";
import { gatewayUrl } from "../../service/config/variables";
interface Props {
  footer: SettingProps["footer"];
}
const Footer: FC<Props> = (props) => {
  const { footer } = props;

  return (
    <section className="max-w-global w-full relative">
      <div className="relative h-auto -order-1 bg-gradient-to-b from-gray-100 to-gray-200 z-10">
        <div className=" flex flex-col gap-5 -end-0 lg:gap-[3.5rem] xl:gap-[4.375rem] lg:flex-row py-[1.688rem] z-10 lg:items-center w-full lg:max-w-5xl lg:justify-end pe-[1.5rem] lg:mx-auto">
          <div className="lg:flex-col w-full lg:w-fit flex justify-end sm:ms-6 lg:ms-0 sm:justify-center lg:items-center">
            <div className=" bg-white size-20 rounded-tl-3xl rounded-br-3xl lg:mx-auto flex items-center justify-center">
              <svg
                width="36"
                height="36"
                className="fill-black stroke-transparent"
              >
                <use href={"/images/icons/landing.svg#crown"}></use>
              </svg>
            </div>
            <div className="w-[8rem] lg:w-full ms-3 flex flex-col my-auto lg:place-items-center mb-0 lg:mt-3">
              <p className="text-[0.938rem] leading-[1.375rem] h-6 font-semibold text-black">
                {/* باشـگاه مشتریـان */}
                {footer?.title1}
              </p>
              <p className="text-[0.813rem] lg:leading-5 leading-[1.125rem] font-normal lg:ms-0 text-black opacity-50">
                {/* تخفیف به اعضای باشگاه */}
                {footer?.description1}
              </p>
            </div>
          </div>
          <div className="lg:flex-col w-full lg:w-fit flex justify-end sm:ms-6 lg:ms-0 sm:justify-center lg:items-center">
            <div className=" bg-white size-20 rounded-tl-3xl rounded-br-3xl lg:mx-auto flex items-center justify-center ">
              <svg
                width="36"
                height="36"
                className="fill-black stroke-transparent"
              >
                <use href={"images/icons/landing.svg#message-text"}></use>
              </svg>
            </div>
            <div className="w-[8rem] lg:w-full ms-3 flex flex-col my-auto lg:place-items-center  mb-0 lg:mt-3">
              <p className="text-[0.938rem] leading-[1.375rem] h-6 font-semibold text-black">
                {/* مشـاوره خدمـات */}
                {footer?.title2}
              </p>
              <p className="text-[0.813rem] lg:leading-5 leading-[1.125rem] font-normal lg:ms-0 text-black opacity-50">
                {/* مشاوره قبل از دریافت خدمات
                 */}
                {footer?.description2}
              </p>
            </div>
          </div>
          <div className=" lg:flex-col w-full lg:w-fit flex justify-end sm:ms-6 lg:ms-0 sm:justify-center lg:items-center">
            <div className=" bg-white size-20 rounded-tl-3xl rounded-br-3xl lg:mx-auto flex items-center justify-center">
              <svg
                width="36"
                height="36"
                className="fill-black stroke-transparent"
              >
                <use href={"images/icons/landing.svg#teacher"}></use>
              </svg>
            </div>
            <div className="w-[8rem] lg:w-full ms-3 flex flex-col my-auto lg:place-items-center mb-0 lg:mt-3">
              <p className="text-[0.938rem] leading-[1.375rem] h-6 font-semibold text-black">
                {/* آمـوزش */}
                {footer?.title3}
              </p>
              <p className="text-[0.813rem] lg:leading-5 leading-[1.125rem] font-normal lg:ms-0 text-black opacity-50">
                {/* ارائه مدرک فنی‌حرفه‌ای و بین‌المللی */}
                {footer?.description3}
              </p>
            </div>
          </div>
          {/* <circle
                height={30}
                className="size-10 bg-gradient-radial from-10% from-indigo-700"
              /> */}
          {/* <div>
                <p>آموزش</p>
                <p className="text-sm">ارائه مدرک فنی‌حرفه‌ای و بین المللی</p>
              </div> */}
        </div>
        <div className="relative lg:max-w-beauty w-full flex flex-row lg:h-[9.125rem] h-fit sm:h-36 my-auto bg-gradient-to-l from-main-primary to-red-500 rounded-br-[4px] lg:rounded-br-[32px] rounded-tl-[4px] lg:rounded-tl-[32px] mx-auto lg:w-[calc(100%-2.5rem)]">
          <img
            width={200}
            height={1000}
            src={"/images/Rectangle.png"}
            alt="banner-img"
            className="z-50 h-[332px] lg:min-h-[337px] absolute bottom-[11.8rem] sm:bottom-[8.938rem] lg:bottom-0 -right-[5.9rem] lg:right-10"
          />
          <div className="lg:ms-72 flex flex-col lg:flex-row sm:my-auto lg:justify-between w-full lg:me-20 py-8 sm:py-0">
            <div className="flex flex-col lg:flex-col text-center items-center">
              <p className="text-white my-2 opacity-80 w-[21rem] leading-5 lg:text-base text-xs font-light">
                آرایشگری نوعی جادو است، با ما این جادو را تجربه کنید
              </p>
              <p className="text-white my-2 w-[21rem] text-xl leading-[1.875rem] lg:text-[1.625rem] font-semibold">
                به راحتـــی نوبت خـودت رو رزرو کن
              </p>
            </div>
            <div className="mt-1 bg-white flex items-center justify-center w-[15.313rem] lg:w-[10.75rem] mx-auto lg:mx-0 lg:my-auto text-nowrap text-sm font-semibold text-main-primary h-10 lg:h-fit lg:px-16 rounded-[2rem] lg:rounded-3xl lg:py-1.5">
              رزرو آنلاین
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row items-center lg:w-full max-w-beauty lg:mx-auto justify-between py-8 lg:py-10 lg:ps-10 lg:pe-14 beauty:ps-5 beauty:pe-10">
        <p className="text-base flex-shrink-0 font-bold lg:text-xl leading-[1.875rem] self-start ps-5 lg:ps-0 text-start mb-5 lg:mb-0 lg:w-[8.813rem] me-10">
          برندهایی که از آنها استفاده می‌کنیم
        </p>
  
        <div className="flex gap-x-5 lg:gap-x-6 xl:gap-x-12 justify-between lg:max-w-4xl w-[calc(100%-2.5rem)] lg:w-full">
          {/* {console.log("images",)} */}
          {
            footer?.brandImages?.map((image) => (
              <div key={image} className="relative w-[7.125rem] h-[2.625rem] ">
                
                <img src={gatewayUrl+image} alt="" />
              </div>
              
            ))}
            
          {/* {footer?.image1?.map((i) => (
            <div key={i} className="relative w-[7.125rem] h-[2.625rem] ">
              <img
                // src={"/images/Catrice-Logo.png"}
                src={i}
                alt=""
              />
            </div>
          ))} */}
          {/* <div className="relative w-[5.5rem] h-[2.625rem]">
            <img
              // src={"/images/NARS_Cosmetics_logo.png"}
              src={footer?.image2}
              alt=""
            />
          </div>
          <div className="relative w-[7.125rem] h-[2.625rem]">
            <img
              src={"/images/Catrice-Logo.png"}
              // src={footer?.image1}
              alt=""
            />
          </div>
          <div className="relative w-[5.5rem] h-[2.625rem] hidden sm:flex">
            <img
              src={"/images/NARS_Cosmetics_logo.png"}
              // src={banner}
              alt=""
            />
          </div>
          <div className="relative w-[7.125rem] h-[2.625rem] hidden sm:flex ">
            <img
              src={"/images/Catrice-Logo.png"}
              // src={banner}
              alt=""
            />
          </div>
          <div className="relative w-[5.5rem] h-[2.625rem] hidden sm:flex">
            <img
              src={"/images/NARS_Cosmetics_logo.png"}
              // src={banner}
              alt=""
            />
          </div> */}
        </div>
      </div>
      <div className="block w-[calc(100%-2.5rem)] mx-auto max-w-beauty custom-divider" />
      <div className="flex flex-wrap lg:flex-nowrap flex-row gap-x-10 sm:gap-x-16 gap-y-8 sm:justify-center max-w-5xl mx-auto py-8 px-10 sm:px-5 lg:px-0 border-black">
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-start sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          خدمات
        </p>
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-center sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          نمونه‌کار
        </p>
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-end sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          درباره ما
        </p>{" "}
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-start sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          مقالات
        </p>
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-center sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          استخدام
        </p>
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(20%-1rem)] lg:w-fit justify-end sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          فروشگاه
        </p>
        <p className="flex items-baseline text-[0.813rem] leading-5 font-normal text-black gap-x-1 w-[calc(33.33%-1.7rem)] sm:w-[calc(33.33%-4rem)] lg:w-fit justify-start sm:justify-center">
          <span className="block h-0.5 w-3 flex-shrink-0 rounded-2xl bg-black opacity-15" />
          آموزش‌ها
        </p>
      </div>

      <div className="block w-[calc(100%-2.5rem)] mx-auto max-w-beauty custom-divider" />

      <div className="bg-gray-200 bottom-0 z-40 absolute max-w-beauty w-full sm:left-1/2 xl:transform sm:-translate-x-1/2">
        {/* <div className="bg-gray-700 w-56 absolute left-12 h-28 rounded-t-3xl -top-[4.813rem] -z-10">
              <Map />
            </div>
            <div className="absolute w-[4.688rem] h-8 left-14 -top-[4.3rem] overflow-hidden">
              <div className="relative w-full h-full border border-pink-primary/30 rounded-3xl">
                <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] px-3 py-2 z-10 rounded-3xl" />
                <span className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-pink-primary text-[0.813rem] leading-[1.125rem] font-semibold z-40">
                  مسیریابی
                </span>
              </div>
            </div> */}

        <div className="flex flex-row z-50 justify-between mx-auto rounded-t-3xl w-full rounded bg-gray-100 py-[0.625rem] px-[1.563rem] sm:p-6">
          <div className="flex flex-row items-start sm:items-center">
            <button
              //   onClick={scrollToTop}
              className="me-3 font-semibold text-[15px] border-none outline-none bg-white hover:underline ring-1 hover:bg-gray-100 ring-gray-100 rounded-xl p-3"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
                />
              </svg>
            </button>
            <p className="hidden sm:flex font-semibold text-[0.625rem] sm:text-xs text-black leading-[1.375rem]">
              تمام حقوق مادی و معنوی سایت متعلق به شرکت سان می‌باشد
            </p>
          </div>
          <div className="flex flex-row gap-x-3 items-end sm:items-center sm:ps-6">
            <button className="font-semibold text-[15px] border-none outline-none  bg-white hover:underline ring-1 hover:bg-gray-100 ring-opacity-20 ring-[#6D48CB] rounded-xl p-2">
              <svg
                height="1.5em"
                width="1.5em"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0004 0.0909424C8.03779 0.0909424 7.66598 0.103897 6.50238 0.156852C5.34105 0.210033 4.54835 0.393897 3.85474 0.66367C3.13726 0.942306 2.52864 1.31503 1.92229 1.92162C1.31549 2.52799 0.942779 3.13662 0.663242 3.8539C0.392795 4.54776 0.20871 5.34071 0.156439 6.50162C0.104395 7.66526 0.0907593 8.03731 0.0907593 11C0.0907593 13.9628 0.103941 14.3334 0.156667 15.4971C0.210074 16.6584 0.393932 17.4512 0.663469 18.1448C0.942324 18.8623 1.31504 19.4709 1.92161 20.0773C2.52773 20.6841 3.13635 21.0578 3.85337 21.3364C4.54744 21.6062 5.34037 21.79 6.50147 21.8432C7.66507 21.8962 8.03665 21.9091 10.9991 21.9091C13.9619 21.9091 14.3326 21.8962 15.4962 21.8432C16.6575 21.79 17.4511 21.6062 18.1452 21.3364C18.8625 21.0578 19.4702 20.6841 20.0763 20.0773C20.6831 19.4709 21.0558 18.8623 21.3353 18.145C21.6035 17.4512 21.7876 16.6582 21.8421 15.4973C21.8944 14.3337 21.9081 13.9628 21.9081 11C21.9081 8.03731 21.8944 7.66549 21.8421 6.50185C21.7876 5.34049 21.6035 4.54776 21.3353 3.85412C21.0558 3.13662 20.6831 2.52799 20.0763 1.92162C19.4695 1.31481 18.8627 0.942079 18.1445 0.66367C17.4491 0.393897 16.6559 0.210033 15.4946 0.156852C14.331 0.103897 13.9606 0.0909424 10.997 0.0909424H11.0004ZM10.0218 2.05685C10.3123 2.0564 10.6363 2.05685 11.0004 2.05685C13.9131 2.05685 14.2583 2.06731 15.4085 2.11958C16.4721 2.16822 17.0493 2.34594 17.4339 2.49526C17.9429 2.69299 18.3059 2.92935 18.6875 3.31117C19.0693 3.69299 19.3056 4.05662 19.5038 4.56571C19.6531 4.94981 19.8311 5.52708 19.8795 6.59071C19.9317 7.74071 19.9431 8.08617 19.9431 10.9975C19.9431 13.9089 19.9317 14.2543 19.8795 15.4043C19.8308 16.468 19.6531 17.0453 19.5038 17.4293C19.3061 17.9384 19.0693 18.3009 18.6875 18.6825C18.3057 19.0644 17.9432 19.3007 17.4339 19.4984C17.0498 19.6484 16.4721 19.8257 15.4085 19.8743C14.2585 19.9266 13.9131 19.938 11.0004 19.938C8.08756 19.938 7.74235 19.9266 6.59238 19.8743C5.52878 19.8253 4.95152 19.6475 4.56676 19.4982C4.05768 19.3005 3.69406 19.0641 3.31225 18.6823C2.93045 18.3005 2.69409 17.9378 2.49591 17.4284C2.3466 17.0443 2.16865 16.4671 2.12024 15.4034C2.06797 14.2534 2.05752 13.908 2.05752 10.9948C2.05752 8.08162 2.06797 7.73799 2.12024 6.58799C2.16888 5.52435 2.3466 4.94708 2.49591 4.56253C2.69363 4.05344 2.93045 3.68981 3.31225 3.30799C3.69406 2.92617 4.05768 2.68981 4.56676 2.49162C4.95129 2.34162 5.52878 2.16435 6.59238 2.11549C7.59871 2.07003 7.9887 2.0564 10.0218 2.05412V2.05685ZM16.8234 3.86821C16.1007 3.86821 15.5144 4.4539 15.5144 5.17685C15.5144 5.89958 16.1007 6.48594 16.8234 6.48594C17.5461 6.48594 18.1325 5.89958 18.1325 5.17685C18.1325 4.45412 17.5461 3.86776 16.8234 3.86776V3.86821ZM11.0004 5.39776C7.90666 5.39776 5.39833 7.90617 5.39833 11C5.39833 14.0939 7.90666 16.6012 11.0004 16.6012C14.0942 16.6012 16.6016 14.0939 16.6016 11C16.6016 7.90617 14.094 5.39776 11.0002 5.39776H11.0004ZM11.0004 7.36367C13.0085 7.36367 14.6367 8.99162 14.6367 11C14.6367 13.0082 13.0085 14.6364 11.0004 14.6364C8.99208 14.6364 7.36418 13.0082 7.36418 11C7.36418 8.99162 8.99208 7.36367 11.0004 7.36367Z"
                  fill="url(#paint0_linear_191_64)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_191_64"
                    x1="10.9994"
                    y1="0.0909424"
                    x2="10.9994"
                    y2="21.9091"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#6D48CB" />
                    <stop offset="0.47" stop-color="#BC32B4" />
                    <stop offset="1" stop-color="#FD5343" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
            <button className="font-semibold text-[15px] border-none outline-none  bg-white hover:underline ring-1 hover:bg-gray-100 ring-opacity-20 ring-[#3CE15A] rounded-xl p-2">
              <svg
                height="1.5em"
                width="1.5em"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.0265 3.69805C18.8125 3.83497 21.4085 4.98384 23.3913 6.96799C25.5064 9.08431 26.6705 11.8975 26.6694 14.8892C26.6668 21.0628 21.641 26.0859 15.4671 26.0859C13.1453 26.0859 11.3003 25.3725 10.109 24.7231L4.17047 26.2801L5.75977 20.4779C4.77944 18.7799 4.26359 16.8538 4.2644 14.8803C4.26688 8.70683 9.29227 3.6842 15.4669 3.6842L16.0265 3.69805ZM10.3842 22.696L10.7242 22.8977C12.1538 23.7456 13.7924 24.1943 15.4632 24.1949H15.467C20.599 24.1949 24.7759 20.02 24.7779 14.8885C24.7789 12.4019 23.8113 10.0637 22.0534 8.30463C20.2954 6.54548 17.9577 5.57613 15.4707 5.57533C10.3348 5.57533 6.15786 9.74981 6.15582 14.8809C6.15512 16.6394 6.64735 18.352 7.5794 19.8336L7.80078 20.1858L6.86017 23.62L10.3842 22.696ZM21.1107 17.5517C21.0407 17.4349 20.8542 17.365 20.5742 17.2249C20.2943 17.0849 18.9182 16.4081 18.6616 16.3146C18.405 16.2214 18.2184 16.1747 18.0318 16.4547C17.8453 16.7348 17.3088 17.365 17.1455 17.5517C16.9823 17.7384 16.819 17.7618 16.5391 17.6217C16.2592 17.4818 15.3573 17.1863 14.2881 16.2331C13.456 15.4913 12.8942 14.5751 12.7309 14.295C12.5677 14.015 12.7135 13.8635 12.8537 13.7241C12.9796 13.5987 13.1336 13.3973 13.2736 13.2339C13.4135 13.0706 13.4601 12.9538 13.5535 12.7672C13.6468 12.5804 13.6001 12.4171 13.5302 12.2771C13.4601 12.137 12.9004 10.7599 12.6671 10.1997C12.4399 9.6542 12.2091 9.72805 12.0373 9.71943C11.8742 9.71135 11.6875 9.70957 11.5009 9.70957C11.3143 9.70957 11.011 9.77954 10.7544 10.0597C10.4979 10.3397 9.77476 11.0166 9.77476 12.3936C9.77476 13.7708 10.7778 15.101 10.9177 15.2878C11.0577 15.4746 12.8915 18.3003 15.6994 19.5122C16.3672 19.8005 16.8886 19.9726 17.2951 20.1015C17.9657 20.3145 18.5758 20.2845 19.0581 20.2124C19.5959 20.1321 20.7142 19.5356 20.9474 18.8822C21.1807 18.2285 21.1807 17.6684 21.1107 17.5517Z"
                  fill="#3CE15A"
                />
              </svg>
            </button>
            <Link
              to={""}
              className="font-semibold text-[15px] border-none outline-none  bg-white hover:underline ring-1 hover:bg-gray-100 ring-opacity-20 ring-[#2BA2D5] rounded-xl p-2"
            >
              <svg
                height="1.5em"
                width="1.5em"
                className="z-50"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.9068 7.01628L4.84543 13.9826C3.61271 14.4772 3.62002 15.1647 4.62074 15.4713L9.1253 16.8773L10.8489 22.1616C11.0584 22.7399 10.9551 22.9693 11.5624 22.9693C12.0311 22.9693 12.2391 22.7556 12.5001 22.5006C12.6661 22.3382 13.6517 21.3799 14.7523 20.3099L19.4378 23.7718C20.3001 24.2475 20.9226 24.0011 21.1373 22.9711L24.213 8.47704C24.528 7.21454 23.7317 6.64188 22.9068 7.01628ZM9.83224 16.5543L19.9856 10.1485C20.4924 9.84109 20.9572 10.0064 20.5756 10.3451L11.8817 18.1892L11.5432 21.7997L9.83224 16.5543Z"
                  fill="#2BA2D5"
                />
              </svg>
            </Link>
          </div>
        </div>
        <p className="justify-center bg-white h-10 flex font-bold text-center mx-auto py-3 text-[10px] sm:hidden">
          تمام حقوق مادی و معنوی سایت متعلق به شرکت سان می‌باشد
        </p>
      </div>
    </section>
  );
};

export default Footer;
