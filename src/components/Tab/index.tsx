import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface TabProps {
  tabs: {
    id: number;
    name: string;
    link?: string;
    isActive?: boolean;
    lock?: boolean;
  }[];
  activeTab?: string;
  disable?: boolean;
  wrapperClassName?: string;
  onClick?: (tab: TabProps["tabs"][0]) => void;
}

const Tab: FC<TabProps> = (props) => {
  const { tabs, wrapperClassName, onClick, activeTab, disable } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const allParams = searchParams.toString();
  const currentUrl = window.location.pathname.toLocaleLowerCase();

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (!disable) {
      if (tab?.link) navigate({ pathname: tab?.link, search: allParams });
      onClick?.(tab);
    }
  };

  return (
    <ul
      className={`flex w-full items-start justify-between h-[2.4rem] mb-6 mx-auto border-b-2 border-gray-card-border ${wrapperClassName}`}
    >
      {tabs?.map((tab) => (
        <div
          key={tab?.id}
          onClick={() => {
            handleTabClick(tab);
          }}
          className={`min-w-[6.25rem] tab-items text-center ${
            currentUrl === tab?.link || activeTab === tab?.id.toString()
              ? "text-main-primary after:!w-full before:!w-full"
              : "text-black/40"
          }`}
        >
          {tab?.name}
        </div>
      ))}
    </ul>
  );
};

export default Tab;
