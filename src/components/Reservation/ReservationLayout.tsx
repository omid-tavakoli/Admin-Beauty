import React, { FC } from "react";
import Tab from "../Tab";

interface IProps {
  wrapperClassName?: string;
  children?: React.ReactNode;
  step: number;
}

const ReservationLayout: FC<IProps> = ({
  children,
  wrapperClassName = "",
  step,
}) => {
  const myTabs = [
    {
      id: 1,
      name: "در حال انجام",
      link: "/reservation",
      isActive: false,
    },
    {
      id: 2,
      name: "انجام شده",
      link: "/reservation/done",
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
      className={`relative w-full bg-white mt-4 border-gray-card-border text-sm    ${wrapperClassName}`}
    >
      <Tab tabs={myTabs} wrapperClassName="!mb-[2.094rem] !justify-normal " />
      {children}
    </section>
  );
};

export default ReservationLayout;
