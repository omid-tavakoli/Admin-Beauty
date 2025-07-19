import React, { FC } from "react";
import Tab from "../Tab";
import { useSearchParams } from "react-router-dom";

interface IProps {
  wrapperClassName?: string;
  children?: React.ReactNode;
  step: number;
}
const myTabs = [
  {
    id: 1,
    name: "اطلاعات عمومی",
    link: "/services/information",
    isActive: false,
    lock: true,
  },
  {
    id: 2,
    name: "نکته",
    link: "/services/tip",
    isActive: false,
    lock: true,
  },
  {
    id: 3,
    name: "سوالات متداول",
    link: "/services/faq",
    isActive: false,
    lock: true,
  },
  {
    id: 4,
    name: "کارشناسان",
    link: `${"/services/experts"}`,
    isActive: false,
    lock: true,
  },
  {
    id: 5,
    name: "سئو",
    link: `${"/services/seo"}`,
    isActive: false,
    lock: true,
  },
];
const ServicesLayout: FC<IProps> = (props) => {
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  return (
    <section
      className={`relative w-full p-6 bg-white mt-6 
        rounded-lg border border-gray-card-border text-sm ${props.wrapperClassName}`}
    >
      <p className="text-base font-semibold text-black mb-6">تعریف خدمت</p>
      <Tab
        tabs={myTabs}
        wrapperClassName="!mb-[2.094rem]"
        disable={!serviceId}
      />
      {props.children}
    </section>
  );
};

export default ServicesLayout;
