import React, { useState } from 'react'
import SmsLayout from '../../../components/Sms/SmsLayout'
import TextArea from '../../../theme/TextArea'
import { smsPublic } from '../../../service/Validation/Index';
import Button from '../../../theme/Button';
import { useMutate } from '../../../hooks/useFetch';
import { createSms } from '../../../service/api/sms';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../utils/ToastContext';

export default function Public() {
  const { addToast } = useToast()
  const navigate = useNavigate();
  const { mutate: createSmsMutate, isPending: addNewSmsLoading } = useMutate(createSms);
  const [inputValue, setInputValue] = useState({
    description: "",
  });
  const [validationError, setValidationError] = useState({
    description: "",
  });
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (
    inputName?: string,
    fieldValue?: string
  ) => {
    const serviceValidation = smsPublic.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
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
  const SendPublicSms = () => {
    if (validationHandler()) {
      console.log('first')
      createSmsMutate(
        { message: inputValue.description },
        {
          onError() {
            addToast('ارسال پیامک با مشکل روبرو شد', 'error')
          },
          onSuccess: (res) => {
            navigate("/sms");
          },
        }
      )
    }
  }
  return (
    <SmsLayout step={3}>
      <div>
        <div className="flex flex-col gap-y-2">
          <TextArea
            textAreaProps={{
              value: inputValue.description,
              name: 'description',
              onChange: (e) => handleChangeValue(e),
            }}
            label="توضیحات" wrapperClassName="w-[15rem]" />
          <span className="text-main-primary text-xs">
            {validationError.description}
          </span>
        </div>
      </div>
      <div className='flex w-full justify-end mt-32'>
        <Button className='w-[6.25rem] h-10'
          onClick={SendPublicSms}>
          {addNewSmsLoading ? (
            <span className="loading loading-spinner loading-xs mx-3"></span>
          ) : (
            "ارسال"
          )}
        </Button>
      </div>
    </SmsLayout>
  )
}
