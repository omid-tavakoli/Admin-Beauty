import { useEffect, useState } from "react";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import ExpertLayout from "../../../components/Expert/ExpertLayout";
import Input from "../../../theme/Input";
import Button from "../../../theme/Button";
import { useGet, useMutate } from "../../../hooks/useFetch";
import { addExpertValidation } from "../../../service/Validation/Index";
import {
  addNewExpert,
  getBranch,
  getOneExpert,
} from "../../../service/api/Expert";
import IconInput from "../../../theme/IconInput/IconInput";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toEnDigit, toGregorian, toJalaali } from "../../../utils/date";
import { addCommas, p2e, removeCommas } from "../../../utils/priceHandler";
import { addAreaCode, removeAreaCode } from "../../../utils/phoneNumberEdit";

export default function GeneralInformation() {
  const [params] = useSearchParams();
  const idUser = params.get("ui");
  const { data: resOneExpert } = useGet(
    getOneExpert,
    ["getOneExpert"],
    { enabled: !!idUser },
    `${idUser}`
  );
  const { data } = useGet(getBranch, ["getBranch"], {});
  const branchs = data?.data?.entity ?? [];
  const navigate = useNavigate();
  interface DateFace {
    selectBoxBranch: any[];
    firstName: string;
    lastName: string;
    salonId: string;
    nationalCode: string;
    phoneNumber: string;
    salary: string;
    address: string;
    startDate: DayValue;
    role: any;
  }
  const [inputValue, setInputValue] = useState<DateFace>({
    selectBoxBranch: [],
    firstName: "",
    lastName: "",
    salonId: "04bf92e8-f722-4b86-ed7a-08dc8e152a0c",
    nationalCode: "",
    phoneNumber: "",
    salary: "",
    address: "",
    startDate: null,
    role: { id: "2", title: "کارشناس" },
  });
  const [validationError, setValidationError] = useState({
    selectBoxBranch: "",
    firstName: "",
    lastName: "",
    salonId: "",
    nationalCode: "",
    phoneNumber: "",
    salary: "",
    address: "",
    startDate: "",
  });

  const roleList = [
    { id: "2", title: "کارشناس" },
    { id: "1", title: "مدیریت" },
  ];

  const { mutate: AddNewExpert, isPending: AddNewExpertLoading } =
    useMutate(addNewExpert);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "salary") {
      const convertedValue = p2e(value);
      const valueWithoutCommas = removeCommas(convertedValue);
      formattedValue = addCommas(valueWithoutCommas);
    }
    setInputValue((prev) => ({ ...prev, [name]: formattedValue }));
    validationHandler(name, formattedValue);
  };
  const validationHandler = (
    inputName?: string,
    fieldValue?: string | ListItem
  ) => {
    const serviceValidation = addExpertValidation.safeParse(
      inputName
        ? { ...inputValue, [inputName]: fieldValue }
        : { ...inputValue, startDate: inputValue?.startDate }
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          selectBoxBranch: "",
          firstName: "",
          lastName: "",
          salonId: "",
          nationalCode: "",
          phoneNumber: "",
          salary: "",
          address: "",
          startDate: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        serviceValidation?.error?.errors.forEach((err) => {
          getError = { ...getError, [err.path[0]]: err.message };
        });
        setValidationError(getError);
      } else {
        const getErrorItem = serviceValidation?.error?.errors.find(
          (error) => inputName === error.path[0]
        );
        setValidationError((pre) => ({
          ...pre,
          ...(getErrorItem
            ? { [getErrorItem.path[0]]: getErrorItem.message }
            : { [inputName ?? ""]: "" }),
        }));
      }
    }
    return serviceValidation.success;
  };

  useEffect(() => {
    let selectedBranch: any = [];
    const dataEdit = resOneExpert?.data?.entity;
    dataEdit?.map((item) => {
      branchs.forEach((branch) => {
        item.branchIds?.forEach((id) => {
          if (id === branch.id) {
            selectedBranch.push({ id: id, title: branch.title });
          }
        });
      });
      const startDateJalaali = toJalaali(item.startDate);
      const dataEditLoop: DateFace = {
        firstName: item.firstName,
        lastName: item.lastName,
        address: item.address,
        nationalCode: item.nationalCode,
        selectBoxBranch: selectedBranch,
        phoneNumber: removeAreaCode(item.phoneNumber)!,
        salary: addCommas(item.salary?.toString()),
        salonId: inputValue.salonId,
        startDate: {
          year: +toEnDigit(startDateJalaali.year),
          month: +toEnDigit(startDateJalaali.month.numeric),
          day: +toEnDigit(startDateJalaali.day.numeric),
        },
        role: {
          id: item.role[0].toString(),
          title: item.role[0] === 2 ? "کارشناس" : "مدیریت",
        },
      };
      console.log("item.role", item.role);
      setInputValue(dataEditLoop);
    });
  }, [resOneExpert, branchs]);

  console.log("expert status : ", inputValue.role.title, inputValue.role.id);

  const addExpert = () => {
    if (validationHandler()) {
      const date = toGregorian(
        inputValue?.startDate?.year,
        inputValue?.startDate?.month,
        inputValue?.startDate?.day
      );
      if (idUser) {
        AddNewExpert(
          {
            ...inputValue,
            phoneNumber: addAreaCode(inputValue?.phoneNumber)!,
            salary: removeCommas(inputValue.salary),
            id: idUser,
            startDate: `${date?.year}-${date?.month
              .toString()
              .padStart(2, "0")}-${date?.day?.toString()?.padStart(2, "0")}`,
            BranchIds: inputValue.selectBoxBranch?.map((item) => item.id),
            role: +inputValue.role.id,
          },
          {
            onError: (error) => {},
            onSuccess: (res) => {
              navigate(`/expert/service?ui=${idUser}`);
            },
          }
        );
      } else {
        AddNewExpert(
          {
            ...inputValue,
            phoneNumber: addAreaCode(inputValue?.phoneNumber)!,
            salary: removeCommas(inputValue.salary),
            startDate: `${date?.year}-${date?.month
              ?.toString()
              ?.padStart(2, "0")}-${date?.day?.toString()?.padStart(2, "0")}`,
            BranchIds: inputValue.selectBoxBranch.map((item) => item.id),
            role: +inputValue.role.id,
          },
          {
            onError: (error) => {},
            onSuccess: (res) => {
              navigate(`/expert/service?ui=${res.data.entity.id}`);
            },
          }
        );
      }
    }
  };

  const selectBoxHandler = (item: ListItem) => {
    setInputValue((pre) => {
      const getSelectedIndex = pre.selectBoxBranch.findIndex(
        (branch) => branch.id === item.id
      );
      if (getSelectedIndex === -1) {
        return { ...pre, selectBoxBranch: [...pre.selectBoxBranch, item] };
      }
      return {
        ...pre,
        selectBoxBranch: pre.selectBoxBranch.filter(
          (filterBranch) => item.id !== filterBranch.id
        ),
      };
    });
  };

  return (
    <ExpertLayout step={1}>
      <div className="space-y-6">
        <div className="flex items-start gap-x-6">
          <div className="flex flex-col gap-y-2">
            <SelectBox
              inputProps={{
                name: "selectBoxBranch",
              }}
              wrapperClassName="!w-[244px]"
              list={branchs?.map((branch) => ({
                title: branch.title ?? "",
                id: branch.id ?? "",
              }))}
              selectedItem={inputValue.selectBoxBranch}
              onSelect={selectBoxHandler}
              byCheckBox
              placeHolder="انتخاب شعبه"
              multiSelect
            />
            <span className="text-main-primary text-xs">
              {validationError.selectBoxBranch}
            </span>
          </div>
          <SelectBox
            inputProps={{
              name: "selectBoxRole",
            }}
            wrapperClassName="!w-[244px]"
            list={roleList}
            selectedItem={inputValue.role}
            onSelect={(e) => {
              setInputValue((pre) => ({
                ...pre,
                role: { id: e.id, title: e.title },
              }));
            }}
            byCheckBox
          />
        </div>
        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-2">
            <Input
              inputProps={{
                value: inputValue.firstName,
                onChange: (e) => handleChangeValue(e),
                name: "firstName",
              }}
              label="نام"
              wrapperClassName="w-[15rem]"
            />
            <span className="text-main-primary text-xs">
              {validationError.firstName}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              inputProps={{
                value: inputValue.lastName,
                onChange: (e) => handleChangeValue(e),
                name: "lastName",
              }}
              label="نام  خانوادگی"
              wrapperClassName="w-[15rem]"
            />
            <span className="text-main-primary text-xs">
              {validationError.lastName}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              inputProps={{
                value: inputValue.nationalCode,
                onChange: (e) => handleChangeValue(e),
                name: "nationalCode",
                maxLength : 10,
              }}
              label="کد ملی"
              wrapperClassName="w-[15rem]"
            />
            <span className="text-main-primary text-xs">
              {validationError.nationalCode}
            </span>
          </div>
        </div>
        <div className="flex  gap-x-6">
          <div className="flex flex-col gap-y-2">
            <Input
              inputProps={{
                value: inputValue.phoneNumber,
                onChange: (e) => handleChangeValue(e),
                name: "phoneNumber",
                maxLength : 11
              }}
              label="شماره موبایل"
              wrapperClassName="w-[15rem]"
            />
            <span className="text-main-primary text-xs">
              {validationError.phoneNumber}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="w-[31.5rem]">
              <Input
                inputProps={{
                  value: inputValue.address,
                  onChange: (e) => handleChangeValue(e),
                  name: "address",
                }}
                label="آدرس"
              />
            </div>
            <span className="text-main-primary text-xs">
              {validationError.address}
            </span>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-2">
            <DatePicker
              value={inputValue.startDate as any}
              onChange={(e) => {
                setInputValue((pre) => ({
                  ...pre,
                  startDate: e,
                }));
              }}
              shouldHighlightWeekends
              locale="fa"
              renderInput={({ ref }) => (
                <Input
                  ref={ref as any}
                  inputProps={{
                    readOnly: true,
                    value: inputValue?.startDate
                      ? `${inputValue?.startDate?.year}-${inputValue?.startDate?.month}-${inputValue?.startDate?.day}`
                      : "",
                  }}
                  label="تاریخ شروع به کار"
                  wrapperClassName="w-60"
                />
              )}
              inputPlaceholder="Select a day"
              colorPrimary="#eb1086"
            />
            <span className="text-main-primary text-xs">
              {validationError.startDate}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="w-60">
              <IconInput
                inputProps={{
                  value: addCommas(inputValue.salary),
                  onChange: (e) => {
                    handleChangeValue({
                      ...e,
                      target: {
                        ...e.target,

                        value: removeCommas(e.target.value),
                        name: "salary",
                      },
                    });
                  },
                }}
                itemChildren={"تومان"}
                itemPosition="left"
                label="حقوق ثابت"
                border="false"
              />
            </div>
            <span className="text-main-primary text-xs">
              {validationError.salary}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <Button
          className="disabled:opacity-50"
          onClick={addExpert}
          disabled={AddNewExpertLoading}
        >
          {AddNewExpertLoading ? (
            <span className="loading loading-spinner loading-sm mx-3"></span>
          ) : (
            "ثبت اطلاعات"
          )}
        </Button>
      </div>
    </ExpertLayout>
  );
}
