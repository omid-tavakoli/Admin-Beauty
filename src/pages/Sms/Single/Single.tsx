import { useState } from "react";
import SmsLayout from "../../../components/Sms/SmsLayout";
import TextArea from "../../../theme/TextArea";
import Input from "../../../theme/Input";
import { smsSingle } from "../../../service/Validation/Index";
import Button from "../../../theme/Button";
import { useMutate } from "../../../hooks/useFetch";
import { createSms } from "../../../service/api/sms";
import { global } from "../../../@types";
import { useToast } from "../../../utils/ToastContext";
import { useNavigate } from "react-router-dom";

export const changePhoneNumberFormat = (phone: string | number) => {
  const editPhone = phone.toString().substring(1);
  return "+98-" + editPhone;
};
export default function Single() {
  const { addToast } = useToast()
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    phoneNumber: "",
    description: "",
  });
  const [validationError, setValidationError] = useState({
    phoneNumber: "",
    description: "",
  });

  const { mutate: createSmsMutate, isPending: addNewSmsLoading } = useMutate(createSms);

  const handleChangeValue = (e: global.HtmlInputProps) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };

  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = smsSingle.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          phoneNumber: "",
          description: "",
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

  const SendSingleSms = () => {
    if (validationHandler()) {
      createSmsMutate(
        {
          message: inputValue.description,
          phoneNumbers: [changePhoneNumberFormat(inputValue.phoneNumber)],
        },
        {
          onSuccess: () => {
            setInputValue({ description: "", phoneNumber: "" });
            navigate("/sms");
          },
          onError() {
            addToast('ارسال پیامک با مشکل روبرو شد', 'error')
          }
        }
      );
    }
  };
  return (
    <SmsLayout step={1}>
      <div>
        <div className="flex flex-col gap-y-2 mb-6">
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
          <TextArea
            textAreaProps={{
              value: inputValue.description,
              name: "description",
              onChange: (e) => handleChangeValue(e),
            }}
            label="توضیحات"
            wrapperClassName="w-[15rem]"
          />
          <span className="text-main-primary text-xs">
            {validationError.description}
          </span>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={SendSingleSms}>
          {addNewSmsLoading ? (
            <span className="loading loading-spinner loading-xs mx-3"></span>
          ) : (
            "ارسال"
          )}
        </Button>

      </div>
    </SmsLayout>
  );
}
