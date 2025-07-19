import React, { FC } from "react";
import Tab from "../Tab";

interface IProps {
  wrapperClassName?: string;
  children?: React.ReactNode;
  step: number;
}

const SmsLayout: FC<IProps> = ({ children, wrapperClassName = "", step }) => {
  const myTabs = [
    {
      id: 1,
      name: "ارسال تکی",
      link: "/sms/singel",
      isActive: false,
    },
    {
      id: 2,
      name: "ارسال گروهی",
      link: "/sms/group",
      isActive: false,
    },
    {
      id: 3,
      name: "ارسال همگانی",
      link: "/sms/public",
      isActive: false,
    },
  ];
  myTabs.forEach((i) => {
    if (i.id == step) {
      i.isActive = true;
    }
  });

  return (
    <section
      className={`relative w-full p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm ${wrapperClassName}`}
    >
      <p className="text-base font-semibold text-black mb-6">کارشناسان</p>
      <Tab tabs={myTabs} />
      {children}
    </section>
  );
};

export default SmsLayout;
