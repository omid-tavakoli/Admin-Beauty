import { useEffect, useState } from "react";

import { useMutate } from "../../hooks/useFetch";
import { addFaqValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";
import TextArea from "../../theme/TextArea";
import { createFaq, updateFaq } from "../../service/api/Services";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../../utils/ToastContext";

const AddFaqModal = (props: any) => {
  const { addToast } = useToast();
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  const [inputValue, setInputValue] = useState({
    title: "",
    answer: "",
    isActive: "false",
    isUpdate: false,
    id: "",
  });
  useEffect(() => {
    if (props.data?.[0]) {
      setInputValue({
        title: props?.data[0]?.name,
        isActive: props?.data[0]?.isActive ? "true" : "false",
        answer: props?.data[0]?.value,
        isUpdate: true,
        id: props?.data[0]?.id,
      });
    }
  }, [props.data]);

  const backdropFn = () => {
    setInputValue({
      title: "",
      isActive: "false",
      answer: "",
      isUpdate: false,
      id: "",
    });
    setValidationError({
      title: "",
      answer: "",
    });
  };

  const [validationError, setValidationError] = useState({
    title: "",
    answer: "",
  });

  const { mutate: createFaqMutate } = useMutate(createFaq);
  const { mutate: updateFaqMutate } = useMutate(updateFaq);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addFaqValidation.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: "",
          answer: "",
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

  const addService = () => {
    if (validationHandler()) {
      if (inputValue.isUpdate) {
        updateFaqMutate(
          {
            id: inputValue.id,
            name: inputValue.title,
            displayName: inputValue.title,
            isActive: inputValue.isActive === "true" ? true : false,
            value: inputValue.answer,
            type: 0,
            serviceId,
          },
          {
            onSuccess(data, variables, context) {
              setTimeout(() => {
                backdropFn();
              }, 2);

              addToast("سوال متداول با موفقیت اضافه گردید ", "success");
              backdropFn();
              props.refetch();
              closeModalHandler("addFaqModal");
            },
            onError() {
              addToast("اضافه کردن سوال متداول با مشکل روبرو شد", "error");
            },
          }
        );
      } else {
        createFaqMutate(
          {
            id: null,
            name: inputValue.title,
            displayName: inputValue.title,
            isActive: inputValue.isActive === "true" ? true : false,
            value: inputValue.answer,
            type: 0,
            serviceId,
          },
          {
            onSuccess(data, variables, context) {
              addToast("سوال متداول با موفقیت بروز گردید ", "success");
              closeModalHandler("addFaqModal");
              props.refetch();
              backdropFn();
            },
            onError() {
              addToast("بروز کردن سوال متداول با مشکل روبرو شد", "error");
            },
          }
        );
      }
    }
  };

  return (
    <Modal
      id={"addFaqModal"}
      title="سوالات متداول"
      textPrimaryBtn="ثبت سوالات متداول جدید"
      clickHandler={addService}
      backdrop={backdropFn}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex items-start gap-x-4">
          <div className="w-full">
            <Input
              inputProps={{
                value: inputValue.title,
                onChange: (e) => handleChangeValue(e),
                name: "title",
              }}
              label="سوال"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.title && validationError?.title}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="w-full">
            <TextArea
              textAreaProps={{
                // value: inputValue.answer,
                value: inputValue.answer,
                onChange: (e) => handleChangeValue(e),
                name: "answer",
              }}
              wrapperClassName="h-[4.5rem]"
              label="جواب"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.answer && validationError?.answer}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-5">
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
      </div>
    </Modal>
  );
};

export default AddFaqModal;
