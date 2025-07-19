import { useState } from "react";
import { addNewLine } from "../../service/api/Category";
import { useMutate } from "../../hooks/useFetch";
import { addServiceValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";

const NewServiceModal = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    englishTitle: "",
    icon: "#ch",
    isActive: "false",
  });
  const [validationError, setValidationError] = useState({
    title: "",
    englishTitle: "",
    icon: "",
  });

  const { mutate: addNewLineMutate } = useMutate(addNewLine);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addServiceValidation.safeParse(
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

  const addService = () => {
    if (validationHandler())
      addNewLineMutate(
        { ...inputValue, isActive: Boolean(inputValue.isActive) },
        {
          onError: (error) => {
            console.log(error);
            // setError(error.errors?.[0]?.message ?? error.message ?? "");
          },
          onSuccess: (res) => {
            // console.log(res.code);
            // res.code === 203 && onSubmit && onSubmit(res?.entity?.token as any);
          },
        }
      );
  };
  return (
    <Modal
      id={"newBlogRegistrationModal"}
      title="ثبت بلاگ جدید"
      clickHandler={addService}
      textPrimaryBtn="ایجاد بلاگ"
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
              label="عنوان بلاگ*"
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
              label="نام لاتین بلاگ*"
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
                checked: inputValue.isActive !== "false",
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
        </div>
      </div>
    </Modal>
  );
};

export default NewServiceModal;
