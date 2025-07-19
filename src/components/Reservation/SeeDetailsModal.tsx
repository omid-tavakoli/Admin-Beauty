import { useEffect, useState } from "react";

import Modal from "../Modal";
import Input from "../../theme/Input";
import { checkoutModalValidations } from "../../service/Validation/Index";
import { ListItem } from "../../theme/SelectBox";
import { useMutate } from "../../hooks/useFetch";
import { checkoutReserve } from "../../service/api/Reserve";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { addCommas, p2e, removeCommas } from "../../utils/priceHandler";

const SeeDetailsModal = (props: any) => {
  const [inputValue, setInputValue] = useState({
    deposit: "",
  });
  const [validationError, setValidationError] = useState({
    deposit: "",
  });

  const [data, setData] = useState<any>();

  useEffect(() => {
    inputValue.deposit = "";
  }, []);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // const { mutate: addNewLineMutate } = useMutate(addNewLine);

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
    const serviceValidation = checkoutModalValidations.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          deposit: "",
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

  const { mutate: checkOutReserveMutate } = useMutate(checkoutReserve);

  const addService = () => {
    if (validationHandler()) {
      checkOutReserveMutate({
        Id: data?.id,
        Fields: [
          {
            reserveId: data?.details[0]?.id,
            amount: data?.prePay,
          },
        ],
      });
    }
    closeModalHandler("seeDetailModal");
  };
  return (
    <Modal
      id={"seeDetailModal"}
      title="تسویه حساب"
      textPrimaryBtn="تسویه حساب"
      clickHandler={addService}
      wrapperClassName="w-[28.563rem]"
    >
      <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
        <p className="text-xs">
          تسویه حساب خانم
          <span className="text-sm">
            &nbsp;
            {data?.firstName
              ? `${data?.firstName}${data?.lastName}`
              : "بدون‌نام"}
            &nbsp;
          </span>
          برای خدمت
          <span className="text-sm">{`      ${data?.serviceName}`}</span>
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm">مبلغ کل</p>
          <div className="relative">
            <Input
              label="مبلغ بیعانه"
              wrapperClassName="w-[15rem]"
              inputProps={{
                value: inputValue.deposit,
                onChange: (e) => handleChangeValue(e),
                name: "deposit",
              }}
            />
            <span className="absolute top-9 left-4">تومان</span>
            <span className="text-xs ps-3 text-main-primary">
              {validationError?.deposit && validationError?.deposit}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[#DC3545]">
          <p className="text-sm">مبلغ بیعانه</p>
          <span className="">{`${data?.prePay?.toLocaleString()} تومان`}</span>
        </div>
        <div className="flex items-center gap-x-8 pt-5 border-t border-gray-card-border">
          <p className="text-sm mb-20">مبلغ قابل پرداخت</p>
        </div>
      </div>
    </Modal>
  );
};

export default SeeDetailsModal;
