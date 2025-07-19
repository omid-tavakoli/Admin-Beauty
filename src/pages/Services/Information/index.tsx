import { useEffect, useState } from "react";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import ServicesLayout from "../../../components/Services/ServicesLayout";
import Input from "../../../theme/Input";
import TextArea from "../../../theme/TextArea";
import Button from "../../../theme/Button";
import RadioButton from "../../../theme/RadioButton";
import { addServiceValidation } from "../../../service/Validation/Index";
import { useGet, useMutate } from "../../../hooks/useFetch";
import {
  createService,
  getDataBranches,
  getServiceDetails,
  updateService,
} from "../../../service/api/Services";
import { openModalHandler } from "../../../service/utils/modalHandler";
import ModalIcon from "../../../components/Services/IconModal";
import IconInput from "../../../theme/IconInput";
import { useSearchParams } from "react-router-dom";
import ModalTime from "../../../components/ModalTime/ModalTime";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../service/api/Category";
import { addCommas, p2e, removeCommas } from "../../../utils/priceHandler";
export default function Information() {
  let [editBranch, setEditBranch] = useState<ListItem>();
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  const [selected, setSelected] = useState<ListItem[]>([]);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({
    hours: "00",
    minutes: "00",
  });
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<InputValueTypes>({
    title: "",
    lines: { id: "", title: "" },
    branch: [],
    discount: "",
    deposit: "",
    time: "",
    isActive: "false",
    description: "",
    discountDescription: "",
    avatar: "",
  });
  const [validationError, setValidationError] = useState({
    title: "",
    lines: "",
    branch: "",
    discount: "",
    deposit: "",
    time: "",
    isActive: "",
    description: "",
    discountDescription: "",
    avatar: "",
  });

  interface InputValueTypes {
    title: string;
    lines: ListItem;
    branch: ListItem[];
    discount: string;
    deposit: string;
    time: string;
    isActive: string;
    description: string;
    discountDescription: string;
    avatar: string;
  }

  //! Requests

  const { data: categories, refetch: getCategoriesRefetch } = useGet(
    getCategories,
    ["getDataCategory"],
    {},
    { index: "1", size: "50" }
  );

  const { data: branches, refetch: getBranchesRefetch } = useGet(
    getDataBranches,
    ["getDataBranches"],
    {}
  );

  const { data: serviceDetails, refetch: getServiceDetailsRefetch } = useGet(
    getServiceDetails,
    ["getServiceDetails"],
    { enabled: !!serviceId },
    {
      serviceId,
    }
  );

  const { mutate: createServiceMutate, isPending: addServiceLoading } =
    useMutate(createService);
  const { mutate: updateServiceMutate, isPending: updateServiceLoading } =
    useMutate(updateService);

  //! UseEffects

  useEffect(() => {
    let filteredIds: any = [];
    if (serviceId) {
      if (serviceDetails?.data) {
        if (branches?.data) {
          branches?.data?.entity?.forEach((item: any) => {
            if (serviceDetails?.data?.entity?.branchIds.includes(item.id)) {
              filteredIds.push(item);
            }
          });
          setSelected(filteredIds);
        }
      }
    }
  }, [serviceDetails, branches]);

  useEffect(() => {
    setInputValue((prev: any) => ({
      ...prev,
      branch: selected,
    }));
  }, [selected]);

  useEffect(() => {
    const details = serviceDetails?.data?.entity;
    if (details) {
      setPickerValue({
        hours: details.duration.split(":")[0],
        minutes: details.duration.split(":")[1],
      });
      setInputValue({
        title: details.title,
        lines: { id: details.categoryId, title: details.categoryTitle },
        branch: [],
        discount: details.discount.toString(),
        deposit: details.prepay.toString(),
        time: `${pickerValue.hours}:${pickerValue.minutes}`,
        isActive: details.isActive === true ? "true" : "false",
        description: details.description,
        discountDescription: details.discountDescription,
        avatar: details.icon,
      });
    }
  }, [serviceDetails]);

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      time:
        +pickerValue.hours >= 10
          ? `${pickerValue.hours}:${pickerValue.minutes}:00`
          : `0${pickerValue.hours}:${pickerValue.minutes}:00`,
    }));
  }, [pickerValue]);

  useEffect(() => {
    if (serviceId === null) {
      setInputValue({
        title: "",
        lines: { id: "", title: "" },
        branch: [],
        discount: "",
        deposit: "",
        time: "",
        isActive: "false",
        description: "",
        discountDescription: "",
        avatar: "",
      });
    }
  }, [serviceId]);

  //! Handlers
  const openPickerStart = () => {
    setIsShowTimePicker(true);
  };
  const submitHandler = () => {
    setIsShowTimePicker(false);
    setInputValue((prev) => ({
      ...prev,
      time: `${pickerValue.hours}:${pickerValue.minutes}:00`,
    }));
  };

  //! Validation Handler
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "deposit") {
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
    const serviceValidation = addServiceValidation.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: "",
          lines: "",
          branch: "",
          discount: "",
          time: "",
          deposit: "",
          isActive: "",
          description: "",
          discountDescription: "",
          avatar: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        serviceValidation?.error?.errors.forEach((err) => {
          getError = { ...getError, [err.path[0]]: err.message };
        });
        setValidationError(getError);
      } else {
        const getErrorItem = serviceValidation?.error?.errors?.find(
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
  const saveServiceInfo = () => {
    if (validationHandler())
      if (serviceId === null) {
        const prepay = p2e(removeCommas(inputValue.deposit));
        createServiceMutate(
          {
            BranchIds: inputValue.branch.map((e: any) => e.id),
            prepay: +prepay,
            duration: inputValue.time,
            icon: inputValue.avatar,
            isActive: inputValue.isActive === "true",
            discount: inputValue.discount ? +p2e(inputValue.discount) : 0,
            ServiceCategoryId: inputValue.lines?.id,
            title: inputValue.title,
            description: inputValue.description,
            discountDescription: inputValue.discountDescription,
          },
          {
            onSuccess: (res) => {
              navigate(`/services/tip?si=${res.data.entity}`);
            },
          }
        );
      } else {
        const prepay = p2e(removeCommas(inputValue.deposit));
        updateServiceMutate(
          {
            BranchIds: inputValue.branch.map((e: any) => e.id),
            prepay: +prepay,
            duration: inputValue.time,
            icon: inputValue.avatar,
            isActive: inputValue.isActive === "true",
            discount: inputValue.discount ? +p2e(inputValue.discount) : 0,
            ServiceCategoryId: inputValue.lines?.id,
            title: inputValue.title,
            description: inputValue.description,
            id: serviceId,
            discountDescription: inputValue.discountDescription,
          },
          {
            onSuccess: (res) => {
              navigate(`/services/tip?si=${res.data.entity}`);
            },
          }
        );
      }
  };

  const timePickerHandler = (item: any, name: string) => {
    setPickerValue(item);
    setInputValue((prev) => ({ ...prev, [name]: item }));
    validationHandler(name, item.toString());
  };
  useEffect(() => {
    const details = serviceDetails?.data?.entity;

    if (details) {
      setInputValue((prev) => {
        return {
          title: details.title,
          lines: { id: details.categoryId, title: details.categoryTitle },
          branch: [],
          discount: String(details.discount),
          deposit: addCommas(details.prepay.toString()),
          time: details.duration,
          isActive: details.isActive === true ? "true" : "false",
          description: details.description,
          discountDescription: details.discountDescription,
          avatar: details.icon,
        };
      });
    }
  }, [serviceDetails]);

  useEffect(() => {
    if (serviceDetails && branches) {
      let selectedBranch: ListItem[] = [];
      branches?.data?.entity?.forEach((branch) =>
        serviceDetails?.data?.entity?.branchIds?.forEach((id) => {
          if (branch.id === id)
            selectedBranch.push({ id: branch.id, title: branch.title });
        })
      );

      setInputValue((pre) => ({ ...pre, branch: selectedBranch }));
    }
  }, [serviceDetails, branches]);
  useEffect(() => {
    if (serviceId === null) {
      setInputValue({
        title: "",
        lines: { id: "", title: "" },
        branch: [],
        discount: "",
        deposit: "",
        time: "",
        isActive: "false",
        description: "",
        discountDescription: "",
        avatar: "",
      });
    }
  }, []);
  const multiSelectBoxHandler = (item: ListItem) => {
    setInputValue((pre) => {
      const getBranch = [...pre.branch];

      const branchExist = getBranch.findIndex(
        (branch) => branch.id === item.id
      );
      if (branchExist === -1) {
        return { ...pre, branch: [...getBranch, item] };
      } else {
        return {
          ...pre,
          branch: getBranch.filter((branch) => branch.id !== item.id),
        };
      }
    });
  };
  return (
    <ServicesLayout step={1}>
      <div className="space-y-6">
        <div className="flex items-end gap-x-6">
          <div className="">
            <Input
              label="نام"
              wrapperClassName="w-[15rem]"
              inputProps={{
                value: inputValue.title,
                onChange: (e) => handleChangeValue(e),
                name: "title",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.title && validationError?.title}
            </span>
          </div>
          <div className="">
            <SelectBox
              inputProps={{
                name: "selectLine",
              }}
              wrapperClassName="!w-[15rem] "
              list={
                categories?.data?.entity?.map((category) => ({
                  id: category.id ?? "",
                  title: category.title ?? "",
                })) ?? []
              }
              selectedItem={inputValue.lines}
              onSelect={(item) => {
                setInputValue((pre) => ({
                  ...pre,
                  lines: item,
                }));
              }}
              byCheckBox
              placeHolder="انتخاب لاین"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.lines && validationError?.lines}
            </span>
          </div>
          <div className="">
            <SelectBox
              placeHolder="انتخاب شعبه"
              wrapperClassName="!w-[15rem]"
              list={
                branches?.data?.entity?.map((branch) => ({
                  id: branch?.id ?? "",
                  title: branch?.title ?? "",
                })) ?? []
              }
              selectedItem={inputValue.branch}
              onSelect={multiSelectBoxHandler}
              byCheckBox
              multiSelect
              inputProps={{
                name: "branch",
                placeholder: "انتخاب شعبه",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.branch && validationError?.branch}
            </span>
          </div>
        </div>
        <div className="flex items-end gap-x-6 ">
          <div className="">
            <Input
              label="مبلغ بیعانه"
              wrapperClassName="w-[15rem]"
              inputProps={{
                value: inputValue.deposit,
                onChange: (e) => handleChangeValue(e),
                name: "deposit",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.deposit && validationError?.deposit}
            </span>
          </div>

          <div className="">
            <div
              className="relative flex justify-center items-center border custom-border border-gray-card-border w-60 h-10 text-sm z-10"
              onClick={openPickerStart}
            >
              <span className="absolute -top-6 right-0 ">زمان انجام خدمت</span>
              <div className="flex gap-x-2">
                <span>{pickerValue.minutes}</span>
                <span>:</span>
                <span>{pickerValue.hours}</span>
                {isShowTimePicker ? (
                  <ModalTime
                    pickerValue={pickerValue}
                    setPickerValue={(item: any) =>
                      timePickerHandler(item, "time")
                    }
                    submitHandler={submitHandler}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <span className="text-main-primary text-xs ps-3">
              {validationError?.time && validationError?.time}
            </span>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
            وضعیت نمایش در سایت
          </p>
          <div className="flex items-center gap-x-3">
            <RadioButton
              label="فعال"
              inputProps={{
                value: "true",
                checked: inputValue.isActive === "true",
                onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
                  handleChangeValue(e),
                name: "isActive",
                className: "!w-5 !h-5",
              }}
              wrapperClassName="w-32"
            />
            <RadioButton
              label="غیر فعال"
              inputProps={{
                value: "false",
                checked: inputValue.isActive === "false",
                onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
                  handleChangeValue(e),
                name: "isActive",
                className: "!w-5 !h-5",
              }}
              wrapperClassName="w-32"
            />
          </div>
        </div>
        <div className="w-[49rem]">
          <TextArea
            label="توضیحات خدمت"
            textAreaProps={{
              name: "description",
              value: inputValue.description,
              onChange: (e) => handleChangeValue(e),
            }}
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.description && validationError?.description}
          </span>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="relative w-60">
            <IconInput
              inputProps={{
                className: "text-end pr-6",
                maxLength: 3,
                value: inputValue.discount,
                onChange: (e) => handleChangeValue(e),
                name: "discount",
              }}
              itemChildren={"%"}
              itemPosition="left"
              label="درصد تخفیف"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.discount && validationError?.discount}
            </span>
          </div>
          <div className=" w-[33rem] h-[86px]">
            <div className="">
              <Input
                label="توضیحات تخفیف"
                wrapperClassName="w-full"
                inputProps={{
                  value: inputValue.discountDescription,
                  onChange: (e) => handleChangeValue(e),
                  name: "discountDescription",
                }}
              />
              <span className="text-main-primary text-xs ps-3">
                {validationError?.discountDescription &&
                  validationError?.discountDescription}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[0.75rem] leading-[1.125rem] font-medium text-black mb-2 cursor-pointer outline-0">
            انتخاب آیکون
          </p>

          <div
            className="border rounded-xl flex items-center justify-center  w-[5.5rem] h-[5.5rem] hover:cursor-pointer overflow-hidden"
            onClick={() => openModalHandler("ModalIcon")}
          >
            {inputValue.avatar ? (
              <span
                className={`w-[3.125rem] h-[3.125rem] rounded-2xl flex items-center justify-center 

               `}
              >
                <svg
                  width="40"
                  height="40"
                  className={`fill-black stroke-none cursor-pointer`}
                >
                  <use
                    href={`/images/icons/services.svg#${inputValue.avatar}`}
                  ></use>
                </svg>
              </span>
            ) : (
              <span className="flex items-center justify-center w-9 h-9 p-2 rounded-xl">
                <svg
                  width="20"
                  height="20"
                  className=" l-black stroke-transparent cursor-pointer"
                >
                  <use href={"/images/icons/panel.svg#upload-img"}></use>
                </svg>
              </span>
            )}
          </div>
          {validationError?.avatar && (
            <span className="text-main-primary text-xs mt-2 ps-3">
              {validationError?.avatar}
            </span>
          )}
        </div>

        <ModalIcon
          selectedIcon={inputValue.avatar}
          onSelectIcon={(icon) => {
            handleChangeValue({
              target: { name: "avatar", value: icon },
            } as any);
          }}
        />
      </div>

      <div className="flex justify-end mt-12">
        <Button onClick={saveServiceInfo}>
          {addServiceLoading || updateServiceLoading ? (
            <span className="loading loading-spinner loading-xs mx-3"></span>
          ) : (
            "ثبت اطلاعات"
          )}
        </Button>
      </div>
    </ServicesLayout>
  );
}
