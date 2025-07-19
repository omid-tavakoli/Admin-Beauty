import { useState } from "react";
import { checkOut } from "../../../service/Validation/Index";
import Modal from "../../Modal";
import Input from "../../../theme/Input";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import { addCommas, p2e, removeCommas } from "../../../utils/priceHandler";

const CheckoutModal = () => {
  const [inputValue, setInputValue] = useState({
    price: "",
    account: { id: "", title: "" },
  });
  const [validationError, setValidationError] = useState({
    price: "",
    account: "",
  });

  const backDropHandler = () => {
    setInputValue({
      price: "",
      account: { id: "", title: "" },
    });
    setValidationError({
      price: "",
      account: "",
    });
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "price") {
      const convertedValue = p2e(value);
      const valueWithoutCommas = removeCommas(convertedValue);
      formattedValue = addCommas(valueWithoutCommas);
      console.log(value);
    }
    setInputValue((prev) => ({ ...prev, [name]: formattedValue }));
    validationHandler(name, formattedValue);
  };
  const validationHandler = (
    inputName?: string,
    fieldValue?: string | ListItem
  ) => {
    const serviceValidation = checkOut.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          price: "",
          account: "",
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
  const selectBoxHandler = (item: ListItem, name: string) => {
    console.log("item = ", item);
    setInputValue((prev) => ({ ...prev, [name]: item }));
    validationHandler(name, item);
  };
  const CheckoutHandler = () => {
    if (validationHandler()) {
      // request
    }
  };
  const list = [
    { id: "1", title: "یزد" },
    { id: "2", title: "تهران" },
    { id: "3", title: "شیراز" },
    { id: "4", title: "اصفهان" },
    { id: "5", title: "تبریز" },
  ];
  return (
    <Modal
      id={"checkout"}
      title="تسویه حساب"
      textPrimaryBtn="تسویه حساب"
      clickHandler={CheckoutHandler}
      backdrop={backDropHandler}
    >
      <div className="flex gap-x-4 items-end">
        <div className="flex flex-col gap-y-2">
          <Input
            label="مبلغ"
            wrapperClassName=""
            inputProps={{
              value: inputValue.price,
              onChange: (e) => handleChangeValue(e),
              name: "price",
            }}
          />
          <span className="text-main-primary text-xs">
            {validationError.price}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <SelectBox
            inputProps={{
              name: "account",
            }}
            wrapperClassName="!w-[15rem]"
            list={list}
            selectedItem={inputValue.account}
            onSelect={(item) => selectBoxHandler(item, "account")}
            byCheckBox
            placeHolder="انتخاب حساب"
          />
          <span className="text-main-primary text-xs">
            {validationError.account}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
