import Button from "../../theme/Button";
import { openModalHandler } from "../../service/utils/modalHandler";
import DiscountModal from "../../components/SettingModal/Discount/DiscountModal";
import HeadIntroModal from "../../components/SettingModal/HeadChange/HeadChangeModal";
import ManagementInfo from "../../components/SettingModal/ManagementInfo/ManagementInfoModal";
import FooterModal from "../../components/SettingModal/Footer/FooterModal";
import Input from "../../theme/Input";
import { getDataSetting, postDataSetting } from "../../service/api/setting";
import { useMutate } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import IntroSection from "./introSection";
import Footer from "./footer";
import DiscountBanner from "./discountBanner";
import OwnerInfoSection from "./ownerInfoSection";
import ServiceIntro from "../../components/SettingModal/Intro/IntroModal";
import { templateKey } from "../../service/config/variables";
import { removeCatching } from "../../service/api/catching";
import Seo from "./seo";
import { useToast } from "../../utils/ToastContext";
import ServiceSection from "./serviceSection";

export interface SettingProps {
  discount?: { discount: string; discountDecs: string };
  introduction?: {
    title?: string;
    description?: string;
    instaTitle?: string;
    instaId?: string;
    isActive?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
  };
  ownerInfo?: {
    title?: string;
    description?: string;
    jobPosition?: string;
    image?: string;
  };
  service?: {
    title?: string;
    titleDes?: string;
    name?: string;
    description?: string;
    telLink?: string;
    whatLink?: string;
    instaLik?: string;
    video: string;
  };
  footer?: {
    title1?: string;
    description1?: string;
    title2?: string;
    description2?: string;
    title3?: string;
    description3?: string;
    brandImages?: string[];
  };
  setting: {
    primaryColor: string;
    secondaryColor: string;
    primaryColorRgb: string;
    secondaryColorRgb: string;
  };
}

export default function Setting() {
  const { addToast } = useToast();

  const [item, setItem] = useState<SettingProps>({
    discount: { discount: "", discountDecs: "" },
    introduction: {
      title: "",
      isActive: "",
      description: "",
      instaTitle: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    },
    ownerInfo: {
      title: "",
      description: "",
      jobPosition: "",
      image: "",
    },
    service: {
      video: "",
      description: "",
      instaLik: "",
      name: "",
    },
    footer: {
      description1: "",
      description2: "",
      description3: "",
      brandImages: [],
      title2: "",
      title1: "",
      title3: "",
    },
    setting: {
      primaryColor: "",
      secondaryColor: "",
      primaryColorRgb: "",
      secondaryColorRgb: "",
    },
  });
  const { mutate: postSetting, isPending: postSettingLoading } =
    useMutate(postDataSetting);
  const { mutate: settingMutate } = useMutate(getDataSetting);
  const { mutate: removeCatchingMutate } = useMutate(removeCatching);

  useEffect(() => {
    settingMutate(templateKey, {
      onSuccess(data) {
        decodeSetting(data.data.entity?.settings?.[0].value ?? "");

        // decodeSetting
      },
    });
  }, []);

  const decodeSetting = (item: string) => {
    try {
      const JsonSetting = JSON.parse(item);
      setItem(JsonSetting);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addSetting = () => {
    postSetting(
      { Key: templateKey, value: JSON.stringify(item) },
      {
        onSuccess() {
          addToast("تغیرات با موفقیت ثبت شد.", "success");
          removeCatchingMutate("/");
        },
        onError() {
          addToast("مشکلی پیش آمده است لطفا چند لحظه بعد تلاش کنید.", "error");
        },
      }
    );
  };
  const hexToRgb = (color: string) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return `${r} , ${g} , ${b}`;
  };
  return (
    <section className="relative w-fit">
      <div className=" p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
        <p className="text-base font-semibold text-black mb-6 tracking-tight">
          تنظیمات
        </p>
        <div className="flex flex-col w-full items-end gap-y-4 mb-6">
          <Button
            className="w-fit bg-white border border-main-primary text-main-primary"
            onClick={() => openModalHandler("DiscountModal")}
          >
            ویرایش
          </Button>

          <DiscountBanner discount={item.discount} />
          <DiscountModal
            selectedItem={item.discount}
            handleData={(e) =>
              setItem({
                ...item,
                discount: {
                  discount: e?.discount || item.discount?.discount || "",
                  discountDecs: e?.discountDecs || "",
                },
              })
            }
          />
        </div>
        <div className="flex flex-col w-full items-end gap-y-4 mb-6">
          <Button
            className="bg-white border w-fit border-main-primary text-main-primary"
            onClick={() => openModalHandler("HeadChangeModal")}
          >
            ویرایش
          </Button>
          <IntroSection introduction={item.introduction} />
          <HeadIntroModal
            selectedItem={item.introduction}
            handleData={(e) =>
              setItem({
                ...item,
                introduction: {
                  description: e?.description || "",
                  image1: e?.image1 || "",
                  image2: e?.image2 || "",
                  image3: e?.image3 || "",
                  image4: e?.image4 || "",
                  instaTitle: e?.instaTitle || "",
                  instaId: e?.instaId || "",
                  isActive: e?.isActive || "",
                  title: e?.title || "",
                },
              })
            }
          />
        </div>
        <div className="flex flex-col items-end gap-y-4 mb-6">
          <Button
            className="bg-white border border-main-primary text-main-primary"
            onClick={() => openModalHandler("ManagementInfoModal")}
          >
            ویرایش
          </Button>
          <OwnerInfoSection ownerInfo={item.ownerInfo} />
          <ManagementInfo
            selectedItem={item.ownerInfo}
            handleData={(e) =>
              setItem({
                ...item,
                ownerInfo: {
                  description: e?.description || "",
                  title: e?.title || "",
                  image: e?.image || "",
                  jobPosition: e?.jobPosition || "",
                },
              })
            }
          />
        </div>
        <div className="flex flex-col items-end gap-y-4 mb-6">
          <Button
            className="bg-white border border-main-primary text-main-primary"
            onClick={() => openModalHandler("IntroModal")}
          >
            ویرایش
          </Button>
          <ServiceSection service={item.service} />
          <ServiceIntro
            selectedItem={item.service}
            handleData={(e) =>
              setItem({
                ...item,
                service: {
                  description: e?.description || "",
                  video: e?.video || "",
                  instaLik: e?.instaLik || "",
                  name: e?.name || "",
                  telLink: e?.telLink || "",
                  whatLink: e?.whatLink || "",
                  title: e?.title || "",
                  titleDes: e?.titleDes || "",
                },
              })
            }
          />
        </div>
        <div className="flex flex-col items-end gap-y-4 mb-6">
          <Button
            className="bg-white border border-main-primary text-main-primary"
            onClick={() => openModalHandler("FooterModal")}
          >
            ویرایش
          </Button>
          <Footer footer={item.footer} />
          <FooterModal
            selectedItem={item.footer}
            handleData={(e) =>
              setItem({
                ...item,
                footer: {
                  brandImages: e?.brandImages || [],
                  description1: e?.description1 || "",
                  description2: e?.description2 || "",
                  description3: e?.description3 || "",
                  title1: e?.title1 || "",
                  title2: e?.title2 || "",
                  title3: e?.title3 || "",
                },
              })
            }
          />
        </div>
        <Button
          disabled={postSettingLoading}
          isLoading={postSettingLoading}
          onClick={addSetting}
        >
          ثبت تغییرات در سایت
        </Button>
      </div>

      <div className="p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
        <span className="text-sm text-black">انتخاب رنگ اصلی </span>
        <div className="flex gap-x-4 mt-6">
          <div className="relative">
            <Input
              inputClassName="!w-11 !h-11 !p-1 !rounded-lg "
              inputProps={{
                type: "color",
                value: item?.setting?.primaryColor,
                onChange: (e) =>
                  setItem((pre) => ({
                    ...pre,
                    setting: {
                      ...pre.setting,
                      primaryColor: e.target.value,
                      primaryColorRgb: hexToRgb(e.target.value),
                    },
                  })),
              }}
            />
          </div>
        </div>
        <span className=" text-sm text-black">انتخاب رنگ ثانویه </span>
        <div className="flex gap-x-4 mt-6">
          <div className="relative">
            <Input
              inputClassName="!w-11 !h-11 !p-1 !rounded-lg "
              inputProps={{
                type: "color",
                value: item?.setting?.secondaryColor,
                onChange: (e) => {
                  console.log(e.target);

                  setItem((pre) => ({
                    ...pre,
                    setting: {
                      ...pre.setting,
                      secondaryColor: e.target.value,
                      secondaryColorRgb: hexToRgb(e.target.value),
                    },
                  }));
                },
              }}
            />
          </div>
        </div>
        <Button
          onClick={addSetting}
          disabled={postSettingLoading}
          isLoading={postSettingLoading}
          className="mt-6"
        >
          ثبت تغییرات در سایت
        </Button>
      </div>
      <Seo />

      <div className="p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
        <span className="text-sm text-black">تعیین زمان لغو رزرو </span>
        <div className="flex gap-x-4 mt-6">
          <div className="relative">
            <Input
              label="زمان لغو رزرو"
              inputClassName="w-[240px]"
              inputProps={{
                type: "number",
              }}
            />
          </div>
        </div>
        <p className="flex flex-row py-5 text-xs font-medium text-black opacity-60">
          <span>
            <svg
              width="16"
              height="16"
              className="fill-black opacity-60 stroke-black me-1.5"
            >
              <use href={"images/icons/landing.svg#warning"}></use>
            </svg>
          </span>{" "}
          برای لغو رزرو تا 24 ساعت قبل بیعانه بازگشت داده می‌شود اگر 24 ساعت
          کمتر شد مبلغ بازگشت داد نمی‌شود
        </p>

        <Button className="mt-6">ثبت تغییرات در سایت</Button>
      </div>
    </section>
  );
}
