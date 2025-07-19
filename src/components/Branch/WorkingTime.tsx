import { useEffect, useState } from "react";
import SelectBox, { ListItem } from "../../theme/SelectBox";
import ModalTime from "../ModalTime/ModalTime";
import { PickerValue } from "react-mobile-picker";
import Button from "../../theme/Button";
import { useGet, useMutate } from "../../hooks/useFetch";
import {
  addNewWorkTime,
  getOneWorkingTime,
} from "../../service/api/Branch/Branch";
import { useNavigate, useSearchParams } from "react-router-dom";

interface WorkingTimeType {
  selected: ListItem;
  startTime: PickerValue;
  endTime: PickerValue;
}
type Holidays = { id: string; dayOfWeek: string }[];
export const splitter = (text: string, num: number) => {
  return text.split(":")[num];
};
const Vacation = [
  { id: "0", dayOfWeek: "شنبه" },
  { id: "1", dayOfWeek: "یکشنبه" },
  { id: "2", dayOfWeek: "دوشنبه" },
  { id: "3", dayOfWeek: "سه شنبه" },
  { id: "4", dayOfWeek: "چهارشنبه" },
  { id: "5", dayOfWeek: "پنج شنبه" },
  { id: "6", dayOfWeek: "جمعه" },
  { id: "7", dayOfWeek: "تعطیلی های رسمی" },
];
const Days = [
  { id: "0", title: "شنبه" },
  { id: "1", title: "یکشنبه" },
  { id: "2", title: "دوشنبه" },
  { id: "3", title: "سه شنبه" },
  { id: "4", title: "چهارشنبه" },
  { id: "5", title: "پنج شنبه" },
  { id: "6", title: "جمعه" },
];
const WorkingTime = () => {
  const [params] = useSearchParams();
  const branchId = params.get("bi");
  const [selected, setSelected] = useState<ListItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<Holidays>([
    { id: "6", dayOfWeek: "جمعه" },
  ]);
  const navigate = useNavigate();
  const { mutate: addNewWorkTimeBranch, isPending: addWorkingTimeLoading } =
    useMutate(addNewWorkTime);
  const [error, setError] = useState<string>();
  const [WorkingTime, setWorkingTime] = useState<WorkingTimeType[]>([]);

  const [ShowPickerStart, setShowPickerStart] = useState(false);

  const [pickerValue, setPickerValue] = useState({
    hours: "09",
    minutes: "00",
  });

  const openPickerStart = () => {
    setShowPickerStart(true);
  };
  const submitHandler = () => {
    setShowPickerStart(false);
  };
  const [ShowpickerEnd, setShowpickerEnd] = useState(false);

  const [pickerValueEnd, setPickerValueEnd] = useState({
    hours: "23",
    minutes: "00",
  });
  const openPickerEnd = () => {
    setShowpickerEnd(true);
  };
  const submitHandlerEnd = () => {
    setShowpickerEnd(false);
  };

  const { data: resOneWorkingTime } = useGet(
    getOneWorkingTime,
    ["getOneWorkingTime"],
    { enabled: !!branchId },
    `${branchId}`
  );
  useEffect(() => {
    if (resOneWorkingTime) {
      const oneWorkTime = resOneWorkingTime?.data?.entity?.workingTimes;
      let createWorkingTimes: WorkingTimeType[] = [];
      let createHolidays: Holidays = [];

      oneWorkTime.forEach((work: any) => {
        if (work.isClosedCompletely) {
          const vacationApi = Vacation.find(
            (item) => item.id == work.dayOfWeek
          );
          !!vacationApi && createHolidays.push(vacationApi);
        } else {
          const dayOfWeek: any = Days.find(
            (e) => e.id === work.dayOfWeek?.toString()
          );
          createWorkingTimes.push({
            selected: dayOfWeek,
            startTime: {
              hours: splitter(work.from, 0),
              minutes: splitter(work.from, 1),
            },
            endTime: {
              hours: splitter(work.to, 0),
              minutes: splitter(work.to, 1),
            },
          });
        }
      });
      setSelectedDay(createHolidays);
      setWorkingTime(createWorkingTimes);
    }
  }, [resOneWorkingTime]);

  const addHanadler = () => {
    const startDate = new Date(
      null!,
      null!,
      null!,
      +pickerValue.hours,
      +pickerValue.minutes
    ).getTime();
    const endDate = new Date(
      null!,
      null!,
      null!,
      +pickerValueEnd.hours,
      +pickerValueEnd.minutes
    ).getTime();
    const createCustomWorkingTime = selected.map((day) => ({
      selected: day,
      startTime: pickerValue,
      endTime: pickerValueEnd,
    }));
    if (selected.length) {
      if (!(startDate >= endDate)) {
        setWorkingTime((pre) => [...pre, ...createCustomWorkingTime]);
        setError("");
      } else {
        setError("ساعت شروع نباید دیر تر از ساعت پایان باشد");
      }
      setSelected([]);
    } else {
      setError("فیلد روزهای هفته رو پر کنید ");
    }
  };
  const deleteHandler = (index: number) => {
    const copyVacation = [...WorkingTime];
    copyVacation.splice(index, 1);
    setWorkingTime(copyVacation);
  };

  const addNew = () => {
    if (WorkingTime.length) {
      const Holidays = selectedDay.map((vacation) => {
        return { dayOfWeek: +vacation.id };
      });
      const WorkingDate = WorkingTime.map((work) => ({
        startTime: `${work.startTime.hours}:${work.startTime.minutes}:00`,
        endTime: `${work.endTime.hours}:${work.endTime.minutes}:00`,
        dayOfWeek: +work.selected?.id,
      }));

      let isHolidaysExistInWorkingTime = false;
      WorkingDate.forEach((workingTime) => {
        Holidays.forEach((holiday) => {
          if (holiday.dayOfWeek === workingTime.dayOfWeek) {
            isHolidaysExistInWorkingTime = true;
            setError("شعبه نمیتواند در یک زمان هم باز هم بسته باشد ");
          }
        });
      });

      !isHolidaysExistInWorkingTime &&
        addNewWorkTimeBranch(
          {
            WorkingDate,
            Holidays,
            BranchId: branchId ?? "",
          },
          {
            onError: (error) => {
              console.log(error);
            },
            onSuccess: (res) => {
              navigate("/branch");
            },
          }
        );
    } else {
      setError("حتما باید  ساعت های کاری شعبه وارد شود");
    }
  };
  const selectBoxHandler = (day: ListItem) => {
    setSelected((pre) => {
      const findSelectedDay = pre.findIndex(
        (selectedDay) => day.id === selectedDay.id
      );
      if (findSelectedDay !== -1) {
        return [...pre.filter((filterDay) => filterDay.id !== day.id)];
      }
      return [...pre, day];
    });
  };
  return (
    <div>
      <div className="relative border border-gray-card-border rounded-lg py-6 px-4 text-sm">
        <span className="absolute -top-2 bg-white px-1">
          ساعت های کاری شعبه
        </span>
        <div className="flex items-end gap-x-6">
          <SelectBox
            label="روزهای هفته*"
            wrapperClassName="!w-[15rem]"
            list={Days}
            selectedItem={selected}
            byCheckBox
            onSelect={selectBoxHandler}
            multiSelect
          />
          <div
            className="relative flex justify-center items-center border custom-border border-gray-card-border w-60 h-10 text-sm"
            onClick={openPickerStart}
          >
            <span className="absolute -top-6 right-0">انتخاب ساعت*</span>
            <span className="absolute right-2.5 text-xs">از</span>
            <div className="flex gap-x-2">
              <span>{pickerValue.minutes}</span>
              <span>:</span>
              <span>{pickerValue.hours}</span>
              {ShowPickerStart && (
                <ModalTime
                  pickerValue={pickerValue}
                  setPickerValue={setPickerValue}
                  submitHandler={submitHandler}
                  closeModal={submitHandler}
                />
              )}
            </div>
          </div>
          <div
            className="relative flex justify-center items-center border custom-border border-gray-card-border w-60 h-10 text-sm"
            onClick={openPickerEnd}
          >
            <span className="absolute right-2.5 text-xs">تا</span>
            <div className="flex gap-x-2">
              <span>{pickerValueEnd.minutes}</span>
              <span>:</span>
              <span>{pickerValueEnd.hours}</span>
              {ShowpickerEnd && (
                <ModalTime
                  pickerValue={pickerValueEnd}
                  setPickerValue={setPickerValueEnd}
                  submitHandler={submitHandlerEnd}
                  closeModal={submitHandlerEnd}
                />
              )}
            </div>
          </div>
          <Button className="w-9 h-9 !p-0" onClick={addHanadler}>
            <svg width={"24px"} height={"24px"} className="">
              <use href="/images/icons/panel.svg#plus"></use>
            </svg>
          </Button>
        </div>
        <div>
          {WorkingTime.map((work, i) => (
            <div>
              <div className="flex gap-x-7 mt-6">
                <div
                  key={i}
                  className="flex justify-between bg-[#fafafa] w-full rounded-lg py-2 px-4"
                >
                  <div>{work.selected.title}</div>
                  <div>
                    {work.startTime.minutes} : {work.startTime.hours}
                    <span className="mx-2">الی</span>
                    {work.endTime.minutes} : {work.endTime.hours}
                  </div>
                </div>
                <div>
                  <Button
                    className="w-9 h-9 !p-0 bg-white border border-main-primary"
                    onClick={() => deleteHandler(i)}
                  >
                    <svg width={"24px"} height={"24px"} className="">
                      <use href="/images/icons/panel.svg#delete24"></use>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <span className="block text-red-600 text-xs mt-2">{error}</span>
        </div>
      </div>
      <div className="relative border border-gray-card-border rounded-lg py-6 mt-6 text-sm">
        <span className="absolute -top-2 bg-white px-1">روزهای تعطیل شعبه</span>
        <div className="flex flex-wrap justify-start px-6 gap-x-6 gap-y-5">
          {Vacation?.map((item) => (
            <div dir="rtl" key={item?.id} className="flex">
              <div className="flex flex-wrap text-center">
                <div
                  tabIndex={0}
                  key={item?.id}
                  onClick={() => {
                    setSelectedDay((prev) => {
                      const selectedCloseDay = selectedDay?.findIndex(
                        (day) => day.id === item.id
                      );
                      if (selectedCloseDay !== -1) {
                        return [
                          ...prev.filter(
                            (filterDay) => filterDay.id !== item.id
                          ),
                        ];
                      }
                      return [
                        ...prev,
                        {
                          id: item?.id,
                          dayOfWeek: item?.dayOfWeek,
                        },
                      ];
                    });
                  }}
                  className={`min-w-48 flex items-center justify-center text-sm leading-[1.625rem] font-medium 
                    text-black h-[2.375rem] py-[0.375rem] px-4 cursor-pointer transition-all duration-[600ms] border border-gray-card-border rounded-lg
                    ${
                      selectedDay?.some((prev) => prev.id === item.id)
                        ? "!border-main-primary !shadow-md"
                        : "hover:!shadow-md !rounded-lg"
                    }      
                     `}
                >
                  {item?.dayOfWeek}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex  justify-end gap-x-3 mt-6">
        <Button className="bg-white text-main-primary border border-main-primary">
          لغو
        </Button>
        <Button onClick={addNew} disabled={addWorkingTimeLoading}>
          {" "}
          {addWorkingTimeLoading ? (
            <span className="loading loading-spinner loading-xs mx-3"></span>
          ) : (
            "ثبت"
          )}{" "}
        </Button>
      </div>
    </div>
  );
};

export default WorkingTime;
