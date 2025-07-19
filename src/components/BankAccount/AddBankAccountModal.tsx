import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutate } from "../../hooks/useFetch";
import { AccountValidate } from "../../service/Validation/Index";
import Modal from "../Modal";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";
import SelectBox from "../../theme/SelectBox";
import {
  createAccount,
  GetAccountResponse,
} from "../../service/api/Account/Account";
import { useToast } from "../../utils/ToastContext";
import { closeModalHandler } from "../../service/utils/modalHandler";

interface IProps {
  data: GetAccountResponse | undefined;
  getAccountsRefetch: () => void;
  setData: Dispatch<SetStateAction<GetAccountResponse | undefined>>;
}
const AddBankAccountModal: FC<IProps> = (props) => {
  const { addToast } = useToast();
  const { data, getAccountsRefetch, setData } = props;
  const { mutate: createAccountMutate } = useMutate(createAccount);
  const [inputValue, setInputValue] = useState({
    bankName: { id: "", title: "" },
    accountId: "",
    shabaNumber: "",
    isActive: "true",
  });
  const [validationError, setValidationError] = useState({
    bankName: "",
    accountId: "",
    shabaNumber: "",
    isActive: "",
  });
  const list = [
    { id: "1", title: "تجارت" },
    { id: "2", title: "ملی" },
    { id: "3", title: "مهر و اقتصاد" },
    { id: "4", title: "قرض الحسنه" },
  ];
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = AccountValidate.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          bankName: "",
          accountId: "",
          shabaNumber: "",
          isActive: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        serviceValidation?.error?.errors.forEach((err) => {
          getError = { ...getError, [err.path[0]]: err.message };
        });
        setValidationError(getError);
      } else {
        const getErrorItem = serviceValidation?.error?.errors?.find(
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

  useEffect(() => {
    setInputValue({
      accountId: data?.accountId ?? "",
      bankName: list?.find((item) => item.title === data?.bankName) || {
        id: "",
        title: "",
      },
      isActive: data?.isActive.toString() ?? "",
      shabaNumber: data?.shabaNumber ?? "",
    });
  }, [data]);

  const addService = () => {
    if (validationHandler()) {
      createAccountMutate(
        {
          Id: data ? data.id : null,
          AccountId: inputValue.accountId,
          BankName: inputValue.bankName.title,
          IsActive: inputValue.isActive === "false" ? false : true,
          shabaNumber: inputValue.shabaNumber,
        },
        {
          onError: () => {
            addToast("افزودن حساب با مشکل روبرو گردید ", "error");
          },
          onSuccess: () => {
            setTimeout(() => {
              addToast("افزودن حساب با موفقیت انجام گردید ", "success");
              getAccountsRefetch();
              closeModalHandler("newBankAccountRegistrationModal");
              setInputValue({
                bankName: { id: "", title: "" },
                accountId: "",
                shabaNumber: "",
                isActive: "true",
              });
            }, 2);
          },
        }
      );
    }
  };
  const backDropFn = () => {
    if (data) {
      setData({
        id: "",
        userFirstName: "",
        userLastName: "",
        status: 0,
        bankName: "",
        accountId: "",
        shabaNumber: "",
        isActive: true,
      });
      setInputValue({
        bankName: { id: "", title: "" },
        accountId: "",
        shabaNumber: "",
        isActive: "true",
      });
      setValidationError({
        bankName: "",
        accountId: "",
        shabaNumber: "",
        isActive: "",
      });
    }
  };

  return (
    <Modal
      id={"newBankAccountRegistrationModal"}
      title="حساب"
      clickHandler={addService}
      backdrop={backDropFn}
      textPrimaryBtn="ثبت تغییرات حساب "
    >
      <div className="flex flex-col w-full h-full gap-y-6 flex-wrap">
        <div className="flex items-end gap-x-4">
          <div className="w-1/2">
            <SelectBox
              list={list}
              selectedItem={inputValue.bankName}
              onSelect={(item) => {
                setInputValue((pre) => ({
                  ...pre,
                  bankName: item,
                }));
              }}
              byCheckBox
              label="بانک"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError.bankName && validationError.bankName}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="w-1/2">
            <Input
              inputProps={{
                maxLength: 16,
                value: inputValue.accountId,
                onChange: (e) => handleChangeValue(e),
                name: "accountId",
              }}
              label="شماره حساب"
              wrapperClassName=""
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError.accountId && validationError.accountId}
            </span>
          </div>
          <div className="w-1/2">
            <Input
              inputProps={{
                maxLength: 24,
                value: inputValue.shabaNumber,
                onChange: (e) => handleChangeValue(e),
                name: "shabaNumber",
              }}
              label="شماره شبا"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError.shabaNumber && validationError.shabaNumber}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
            وضعیت حساب بانکی
          </p>
          <div className="flex items-center gap-x-3">
            <RadioButton
              label="فعال"
              inputProps={{
                value: "true",
                checked: inputValue.isActive === "true",
                onFocus: (e) => handleChangeValue(e),
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
                onFocus: (e) => handleChangeValue(e),
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

export default AddBankAccountModal;
