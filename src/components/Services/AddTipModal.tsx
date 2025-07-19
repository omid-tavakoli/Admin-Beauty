import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMutate } from "../../hooks/useFetch";
import { addTipValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";
import { createTip, updateTip } from "../../service/api/Services";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../../utils/ToastContext";

const AddTipModal = (props: any) => {
  const { addToast } = useToast();
  const [params] = useSearchParams();
  const serviceId = params.get("si");
  useEffect(() => {
    if (props.data?.[0]) {
      setInputValue({
        id: props.data[0].id,
        title: props.data[0].name,
        isActive: props.data[0].isActive ? "true" : "false",
        isUpdate: true,
      });
    }
  }, [props?.data]);

  //  commented comment
  useLayoutEffect(() => {
    if (inputValue.title?.length) {
      console.log("title.length > 1");
      setInputValue({
        id: "",
        title: "",
        isActive: "false",
        isUpdate: false,
      });
    }
  }, []);

  const [inputValue, setInputValue] = useState({
    title: "",
    isActive: "false",
    id: "",
    isUpdate: false,
  });
  const [validationError, setValidationError] = useState({
    title: "",
  });

  const { mutate: createTipMutate } = useMutate(createTip);
  const { mutate: updateTipMutate } = useMutate(updateTip);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addTipValidation.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: "",
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
        updateTipMutate(
          {
            id: inputValue.id,
            name: inputValue.title,
            displayName: inputValue.title,
            isActive: inputValue.isActive === "true" ? true : false,
            value: null,
            type: 1,
            serviceId,
          },

          {
            onSuccess(data, variables, context) {
              setTimeout(() => {
                backdropFn();
              }, 2);

              addToast("نکته با موفقیت بروز گردید ", "success");
              backdropFn();
              closeModalHandler("addTipModal");
              props.refetch();
            },
            onError() {
              addToast("بروز نکته با مشکل روبرو شد", "error");
            },
          }
        );
      } else {
        createTipMutate(
          {
            id: null,
            name: inputValue.title,
            displayName: inputValue.title,
            isActive: inputValue.isActive === "true" ? true : false,
            value: null,
            type: 1,
            serviceId,
          },
          {
            onSuccess(data, variables, context) {
              addToast("نکته با موفقیت اضافه گردید ", "success");
              backdropFn();
              closeModalHandler("addTipModal");
              props.refetch();
            },
            onError() {
              addToast("اضافه کردن نکته با مشکل روبرو شد", "error");
            },
          }
        );
      }
    }
  };
  console.log("props.data =>", props.data);
  const backdropFn = () => {
    setInputValue({
      id: "",
      title: "",
      isActive: "false",
      isUpdate: false,
    });
    console.log("backdropFn");
    console.log("inputValue ---", inputValue);
    setValidationError({ title: "" });
  };
  return (
    <Modal
      id={"addTipModal"}
      title="ثبت نکته جدید"
      textPrimaryBtn="ثبت نکته جدید"
      clickHandler={addService}
      backdrop={backdropFn}
    >
      <div className="flex flex-col w-full h-full gap-y-6">
        <div className="flex items-start gap-x-4">
          <div className="w-full">
            <Input
              inputProps={{
                value: inputValue.title,
                onChange: (e) => handleChangeValue(e),
                name: "title",
              }}
              label="نکته"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.title && validationError?.title}
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
      </div>
    </Modal>
  );
};
export default AddTipModal;
