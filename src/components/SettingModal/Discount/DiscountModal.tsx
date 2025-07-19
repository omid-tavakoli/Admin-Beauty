import { FC, useEffect, useState } from "react";
import { addDiscount } from "../../../service/Validation/Index";
import Modal from "../../Modal";
import IconInput from "../../../theme/IconInput";
import TextArea from "../../../theme/TextArea";
import { RefetchOptions } from "@tanstack/react-query";
import { closeModalHandler } from "../../../service/utils/modalHandler";
import { SettingProps } from "../../../pages/Setting/Setting";

interface IProps {
  refetch?: (options?: RefetchOptions) => void;
  selectedItem: SettingProps["discount"];
  closeModal?: () => void;
  handleData?: (e: SettingProps["discount"]) => void;
}
export const DiscountModal: FC<IProps> = (props) => {
  const { selectedItem } = props;

  const [inputValue, setInputValue] = useState<SettingProps["discount"]>({
    discount: "",
    discountDecs: "",
  });
  const [validationError, setValidationError] = useState({
    discount: "",
    discountDecs: "",
  });

  useEffect(() => {
    setInputValue({
      discountDecs: selectedItem?.discountDecs ?? "",
      discount: selectedItem?.discount ?? "",
    });
  }, [selectedItem]);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({
      ...(pre ?? {
        discount: inputValue?.discount ?? "",
        discountDecs: inputValue?.discountDecs ?? "",
      }),
      [e.target.name]: e.target.value,
    }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addDiscount.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          discount: pre.discount,
          discountDecs: pre.discountDecs,
        }));
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
    return serviceValidation.success;
  };
  const handleSubmit = () => {
    if (validationHandler()) {
      props.handleData?.(inputValue);
      closeModalHandler("DiscountModal");
    }
  };

  return (
    <Modal
      id={"DiscountModal"}
      title="تغییرات در سایت"
      clickHandler={handleSubmit}
      textPrimaryBtn="ثبت تغییرات"
      // backdrop={closeModal}
    >
      <div className="flex flex-col gap-y-6">
        <div className="relative w-60">
          <IconInput
            inputProps={{
              className: "text-end pr-6",
              value: inputValue?.discount,
              onChange: (e) => handleChangeValue(e),
              name: "discount",
              maxLength : 3,
            }}
            itemChildren={"%"}
            itemPosition="left"
            label="درصد تخفیف"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.discount && validationError?.discount}
          </span>
        </div>
        <div className=" w-[43.5rem] ">
          <div className="">
            <TextArea
              label="توضیحات تخفیف"
              wrapperClassName="w-full h-[106px]"
              textAreaProps={{
                value: inputValue?.discountDecs,
                onChange: (e) => handleChangeValue(e),
                name: "discountDecs",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.discountDecs && validationError?.discountDecs}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DiscountModal;
