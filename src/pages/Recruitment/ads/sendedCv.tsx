import TableHeader from "../../../components/TableHeader";
import { TableSection } from "../../../components/Table/TableSections";

const tableSections: TableSection[] = [
  { title: "عکس" },
  { title: "لاین" },
  { title: "وضعیت" },
  { title: "عملیات" },
];

const SendedCV = () => {
  // const { data } = useGet(getCategories, ["getDataCategory"], {});

  // let [searchParams, setSearchParams] = useSearchParams();

  // const tableData = data?.data?.entity
  //   ?.slice(data?.data?.entity?.length - 4, data?.data?.entity.length)
  //   ?.map((item:any) => [
  //     { type: "svg", payload: item.icon ?? "" },
  //     { type: "text", payload: item.title ?? "" },
  //     { type: "badge", payload: item.isActive ?? false },
  //     {
  //       type: "action",
  //       payload: [
  //         { type: "delete", payload: () => console.log("delete") },
  //         { type: "edit", payload: () => console.log("edit") },
  //       ],
  //     },
  //   ]);

  return (
    <section className="relative w-[calc(100%-26.875rem)] min-h-[51.688rem] p-6 bg-white mt-6 rounded-lg border border-gray-card-border">
      <p className="text-base font-semibold text-black mb-6">
        لیست رزومه‌های ارسالی
      </p>
      <TableHeader
      // title="ثبت "
      // onClickBtn={() => openModalHandler("newServiceRegistrationModal")}
      />
      {/* {!!tableData && <Table tableSections={tableSections} data={tableData} />}
      <Pagination
        index={data?.data?.index}
        size={data?.data?.size}
        totalCount={data?.data?.totalCount}
      /> */}
      {/* <NewServiceModal /> */}
    </section>
  );
};

export default SendedCV;
