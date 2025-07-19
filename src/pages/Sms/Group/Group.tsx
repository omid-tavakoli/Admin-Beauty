import { useState } from "react";
import SmsLayout from "../../../components/Sms/SmsLayout";
import TextArea from "../../../theme/TextArea";
import IconInput from "../../../theme/IconInput";
import Button from "../../../theme/Button";
import { useMutate } from "../../../hooks/useFetch";
import { createSms } from "../../../service/api/sms";
import { phoneValidation, smsSingle } from "../../../service/Validation/Index";
import { openModalHandler } from "../../../service/utils/modalHandler";
import SelectUserModal from '../../../components/SelectUser/SelectUserModal';
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../utils/ToastContext";
import { p2e } from "../../../utils/priceHandler";

export default function Group() {
  const { addToast } = useToast()
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<string[]>([]);
  const [error, setError] = useState<string>()
  const [inputValue, setInputValue] = useState({
    phoneNumber: "",
    description: "",
  });

  const { mutate: createSmsMutate, isPending: addNewSmsLoading } = useMutate(createSms);
  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: p2e(e.target.value) }));
  }
  const addNumber = () => {
    const regexPhoneNumber = phoneValidation.safeParse(inputValue.phoneNumber)
    if (regexPhoneNumber.success) {
      setSelectedNumber((pre) => [...pre, inputValue.phoneNumber]);
      setInputValue({ ...inputValue, phoneNumber: "" });
      setError('')
    } else {
      setError('شماره تلفن معتبر نمیباشد')
    }
  };
  const deleteHandler = (index: number) => {
    const copySelectedNumber = [...selectedNumber];
    copySelectedNumber.splice(index, 1);
    setSelectedNumber(copySelectedNumber);
  };
  const SendSingleSms = () => {
    if (selectedNumber.length != 0) {
      createSmsMutate(
        {
          message: inputValue.description,
          phoneNumbers: selectedNumber,
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
    } else {
      setError('اطلاعات مورد نظر خود را وارد کنید')
    }
  };

  return (
    <SmsLayout step={2}>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-4 items-end ">
        <div className="">
          <IconInput
            inputProps={{
              className: "placeholder:text-black/40 border-none text-end",
              value: inputValue.phoneNumber,
              onChange: (e) => ChangeHandler(e),
              placeholder: "شماره را وارد کنید",
              name: "phoneNumber",
              maxLength : 11
            }}
            itemChildren="+"
            itemPosition="left"
            itemClass="text-xl pr-1 cursor-pointer"
            itemProps={{
              onClick: addNumber,
            }}
            label="شماره موبایل"
          />
        </div>
        <div className="flex items-center gap-x-2  h-10 border border-gray-card-border custom-border  px-2 cursor-pointer" onClick={() => openModalHandler("selectUser")}>
          <span>
            انتخاب از لیست کاربران
          </span>
          <span>
            <svg
              width={'24px'}
              height={'24px'}
              className=''>
              <use href='/images/icons/panel.svg#plus'></use>
            </svg>
          </span>
        </div>
        </div>
        <div className=" text-xs text-main-primary mb-6">
          {error && error}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 mb-6">
        {selectedNumber?.map((number, i) => (
          <div
            key={i}
            className="w-32 flex justify-center gap-x-2 border custom-border py-3"
          >
            <span>{number}</span>
            <span onClick={(index) => deleteHandler(i)}>
              <svg
                width="20"
                height="20"
                className="fill-main-primary stroke-transparent cursor-pointer"
              >
                <use href={"/images/icons/panel.svg#delete"}></use>
              </svg>
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-2">
        <TextArea
          textAreaProps={{
            value: inputValue.description,
            onChange: (e) => ChangeHandler(e),
            name: "description",
          }}
          label="توضیحات"
          wrapperClassName="w-[15rem]"
        />
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
      <SelectUserModal />
    </SmsLayout>
  );
}
