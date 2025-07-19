import { FC, useEffect, useState } from "react";
import { GetCategoriesResponse, addNewLine } from "../../service/api/Category";
import { useMutate } from "../../hooks/useFetch";
import { addLineValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";
import { RefetchOptions } from "@tanstack/react-query";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { useToast } from "../../utils/ToastContext";
interface IProps {
  refetch?: (options?: RefetchOptions) => void;
  selectedItem: GetCategoriesResponse | undefined;
  emptyCloseModal?: () => void;
}
const icons = ["tattoo", "nail", "face", "hair"];
const NewServiceModal: FC<IProps> = (props) => {
  const { addToast } = useToast()
  const { selectedItem, emptyCloseModal } = props;
  const [inputValue, setInputValue] = useState({
    title: "",
    englishTitle: "",
    icon: "",
    isActive: "true",
  });

  const [validationError, setValidationError] = useState({
    title: "",
    englishTitle: "",
    icon: "",
  });

  const { mutate: addNewLineMutate, isPending: addNewLineLoading } =
    useMutate(addNewLine);

  useEffect(() => {
    setInputValue({
      title: selectedItem?.title ?? "",
      englishTitle: selectedItem?.englishTitle ?? "",
      icon: selectedItem?.icon ?? "",
      isActive: selectedItem
        ? selectedItem?.isActive
          ? "true"
          : "false"
        : "true",
    });
  }, [selectedItem]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addLineValidation.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: "",
          englishTitle: "",
          icon: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        serviceValidation?.error?.errors.forEach((err) => {
          console.log("err => ", err);
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

  const addService = () => {
    if (validationHandler())
      addNewLineMutate(
        {
          ...inputValue,
          isActive: inputValue.isActive === "true",
          ...(selectedItem?.id ? { id: selectedItem.id } : {}),
        },
        {
          onError: (error: any) => {
            setValidationError((pre) => ({
              ...pre,
              englishTitle: error?.response?.data?.errors?.[0]?.message,
              title: error?.response?.data?.errors?.[0]?.message,
            }));
            addToast('افزودن لاین با مشکل روبرو شد' , 'error')   
          },
          onSuccess: (res) => {
            props.refetch && props.refetch();
            closeModal();
            closeModalHandler("newServiceRegistrationModal");
            addToast('لاین با موفقیت اضافه گردید ', 'success');
          },
        }
      );
  };
  const closeModal = () => {
    setInputValue({
      title: "",
      englishTitle: "",
      icon: "",
      isActive: "false",
    });
    setValidationError({
      title: "",
      englishTitle: "",
      icon: "",
    });
    emptyCloseModal && emptyCloseModal();
  };
  return (
    <Modal
      id={"newServiceRegistrationModal"}
      title={selectedItem ? "ویرایش لاین " : "ثبت لاین جدید"}
      clickHandler={addService}
      textPrimaryBtn={selectedItem ? "ویرایش لاین " : "ثبت لاین جدید"}
      backdrop={closeModal}
      isLoading={addNewLineLoading}
    >
      <div className="flex flex-col w-full h-full gap-y-6">
        <div className="flex items-start gap-x-4">
          <div className="">
            <Input
              inputProps={{
                value: inputValue.title,
                onChange: (e) => handleChangeValue(e),
                name: "title",
              }}
              label="نام لاین*"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.title && validationError?.title}
            </span>
          </div>

          <div className="">
            <Input
              inputProps={{
                value: inputValue.englishTitle,
                onChange: (e) => handleChangeValue(e),
                name: "englishTitle",
              }}
              label="نام لاتین لاین*"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.englishTitle && validationError?.englishTitle}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
            وضعیت نمایش در سایت
          </p>
          <div className="flex items-center gap-x-3">
            <RadioButton
              label="فعال"
              inputProps={{
                value: "true",
                checked: inputValue.isActive === "true",
                onFocus: (e) => handleChangeValue(e as any),
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
                onFocus: (e) => handleChangeValue(e as any),
                name: "isActive",
                className: "!w-5 !h-5",
              }}
              wrapperClassName="w-32"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm leading-[1.313rem] font-medium text-black">
            انتخاب آیکون موردنظر
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2">
              {icons.map((icon) => (
                <span
                  className={`bg-white shadow-xs w-[3.125rem] h-[3.125rem] rounded-2xl flex items-center justify-center ${
                    icon === inputValue.icon && "border !border-main-primary"
                  }`}
                >
                  <svg
                    width="40"
                    height="40"
                    className={`fill-none stroke-black cursor-pointer`}
                    onClick={() =>
                      handleChangeValue({
                        target: { value: icon, name: "icon" },
                      } as any)
                    }
                  >
                    <use href={`images/icons/lines.svg#${icon}`}></use>
                  </svg>
                </span>
              ))}
            </div>
            <span className="text-main-primary text-xs ps-3">
              {validationError?.icon && validationError?.icon}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewServiceModal;
