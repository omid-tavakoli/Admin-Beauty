import { useState } from "react";
import Tab, { TabProps } from "../../components/Tab";
import BranchInfo from "../../components/Branch/BranchInfo";
import WorkingTime from "../../components/Branch/WorkingTime";
import { useNavigate, useSearchParams } from "react-router-dom";

interface TabBranch {
  id: number;
  name: string;
  isActive: boolean;
  link: string;
}

const CreateBranch = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const branchId = params.get("bi");

  const [Tabs, setTabs] = useState<TabBranch[]>([
    {
      id: 1,
      name: "اطلاعات عمومی",
      isActive: true,
      link: "",
    },
    {
      id: 2,
      name: "ساعت فعالیت ",
      isActive: false,
      link: "",
    },
  ]);

  const [idTab, setIdTab] = useState(Tabs.find((tab) => tab.isActive)?.id || 0);

  const renderComponent = (tab: TabProps["tabs"][0]) => {
    setIdTab(tab.id);
  };

  const switchTab = (e: number, id: string, link: string) => {
    setIdTab(e);
    navigate({ pathname: "/branch/create", search: link });
    const updatedTabs = Tabs.map((tab) => ({
      ...tab,
      isActive: tab.id === e,
    }));
    setTabs(updatedTabs);
  };
  return (
    <section className="relative w-full min-h-[51.688rem] p-6 bg-white mt-6 rounded-lg border border-gray-card-border">
      <p className="text-base  font-semibold  text-black mb-12">
        تعریف شعبه جدید
      </p>
      <Tab
        disable={!branchId}
        onClick={renderComponent}
        tabs={Tabs}
        activeTab={idTab.toString()}
        wrapperClassName="!justify-start gap-x-7"
      />
      {idTab === 2 ? (
        <WorkingTime />
      ) : (
        <BranchInfo submitHandler={(e, id, link) => switchTab(e, id, link)} />
      )}
    </section>
  );
};

export default CreateBranch;
