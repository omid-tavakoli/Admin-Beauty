import { useState } from "react";
import SelectBox from "../../theme/SelectBox";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const pastDay = [
  { id: "0", title: "1 روز گذشته" },
  { id: "1", title: "روز گذشته 2" },
  { id: "2", title: "روز گذشته 3" },
  { id: "3", title: "روز گذشته 4" },
  { id: "4", title: "روز گذشته 5" },
];
const day = [
  { id: "0", title: "1 روز" },
  { id: "1", title: "روز 2" },
  { id: "2", title: "روز 3" },
  { id: "3", title: "روز 4" },
  { id: "4", title: "روز 5" },
];
const data = [
  {
    name: "روز 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "روز 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "روز 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "روز 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "روز 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "روز 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "روز 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Dashboard = () => {
  const lines = [
    { id: "0", title: "لاین 1" },
    { id: "1", title: "لاین 2" },
    { id: "2", title: "لاین 3" },
    { id: "3", title: "لاین 4" },
    { id: "4", title: "لاین 5" },
  ];
  // export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState<{
    id: string;
    title: string;
  }>();
  const [selectedPastDay, setSelectedPastDay] = useState<{
    id: string;
    title: string;
  }>();
  // return (
  //   <section className="flex flex-col w-full bg-gray-200 p-10 overflow-y-auto ">
  //     <div className="w-full min-w-max flex flex-row justify-between">
  //       <div>
  //         <h3 className="text-black text-[1.5rem] font-semibold">
  //           {" "}
  //           داشبورد(مدیریت)
  //         </h3>
  //         <p className="text-black text-xs font-medium opacity-60 pt-3">
  //           پنل سطح طلایی
  //         </p>
  //       </div>
  //       <div className="min-w-44">
  //         <SelectBox
  //           list={pastDay}
  //           placeHolder="انتخاب روز"
  //           selectedItem={selectedPastDay}
  //           onSelect={(item: { id: string; title: string }) =>
  //             setSelectedPastDay({
  return (
    <section className="flex flex-col w-full bg-gray-200 py-8">
      <div className="w-full min-w-max flex justify-between">
        <div>
          <h3 className="text-black text-[1.5rem] font-semibold">
            داشبورد(مدیریت)
          </h3>
          <p className="text-black text-xs font-medium opacity-60 pt-3">
            پنل سطح طلایی
          </p>
        </div>
        <div className="min-w-44 self-end">
          <SelectBox
            list={lines}
            placeHolder="انتخاب لاین"
            selectedItem={selectedDay}
            onSelect={(item: { id: string; title: string }) =>
              setSelectedDay({
                id: item?.id,
                title: item?.title,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {Array.from({ length: 4 }).map((item, index) => (
          <div
            key={index}
            className="bg-white mt-6 border border-gray-card-border p-6 rounded-xl w-[13.2rem] h-44"
          >
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-black text-base font-medium opacity-80 pb-2">
                  نوبت‌ها موفق
                </p>
                <p className=" text-black text-base font-medium">+5000</p>
              </div>
              <div className="flex justify-center items-center size-10 border border-gray-card-border p-1 rounded-lg">
                <svg width="24" height="24">
                  <use href={"/images/icons/trendingUp.svg#trendingUp"}></use>
                </svg>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center pt-9">
              <svg width="24" height="24">
                <use href={"/images/icons/trendingUp.svg#trendingUp"}></use>
              </svg>
              <p className="text-green-primary text-xs font-medium">50%</p>
              <p className="text-black opacity-80 text-xs font-medium ms-3">
                پیشرفت نسبت به ماه گذشته
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white mt-6 border border-gray-card-border p-6 rounded-2xl">
        <div className="w-full min-w-max flex flex-row justify-between">
          <h3 className="text-black text-base font-medium"> روند فروش</h3>
          <div className="min-w-20">
            <SelectBox
              list={day}
              placeHolder="روز"
              selectedItem={selectedDay}
              onSelect={(item: { id: string; title: string }) =>
                setSelectedDay({
                  id: item?.id,
                  title: item?.title,
                })
              }
            />
          </div>
        </div>
        <div className="w-full h-[20rem] pt-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#EB1086" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
          <div>
            {/* <div className="bg-white mt-6 border border-gray-card-border p-5 w-fit">
              jkhjhjh
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
//  {/* } */}
