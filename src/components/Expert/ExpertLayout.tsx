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
    link: "/expert/information",
    isActive: false,
    lock: true,
  },
  {
    id: 2,
    name: "تعریف خدمت",
    link: "/expert/service",
    isActive: false,
    lock: true,
  },
  {
    id: 3,
    name: "حقوق و دستمزد",
    link: "/expert/salary",
    isActive: false,
    lock: true,
  },
  {
    id: 4,
    name: "مرخصی",
    link: "/expert/vacations",
    isActive: false,
    lock: true,
  },
];
const ExpertLayout: FC<IProps> = (props) => {
  const [params] = useSearchParams();
  const expertId = params.get("ui");

  return (
    <section
      className={`relative w-full p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm ${props.wrapperClassName}`}
    >
      <p className="text-base font-semibold text-black mb-6">کارشناسان</p>
      <Tab tabs={myTabs} disable={!expertId} />
      {props.children}
    </section>
  );
};

export default ExpertLayout;
