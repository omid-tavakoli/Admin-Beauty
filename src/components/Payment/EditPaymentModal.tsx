import { FC, useEffect, useState } from "react";
import { addDocumentValidation } from "../../service/Validation/Index";
import Modal from "../Modal";
import RadioButton from "../../theme/RadioButton";
import TextArea from "../../theme/TextArea";
import SelectBox, { ListItem } from "../../theme/SelectBox";
import { getPersonnel } from "../../service/api/Expert";
import { useGet, useMutate } from "../../hooks/useFetch";
import Input from "../../theme/Input";
import { createDocument, updateDocument } from "../../service/api/Payments";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { addCommas, p2e, removeCommas } from "../../utils/priceHandler";

interface IProps {
  selectPersonnel?: boolean;
  data:
    | {
        id: string;
        amount: string;
        description: string;
        lastName: string;
        name: string;
        type: number;
      }
    | undefined;
  refetch: () => void;
  branchUserId?: string;
}

const EditPaymentModal: FC<IProps> = (props) => {
  const { data, refetch, selectPersonnel, branchUserId } = props;

  const [inputValue, setInputValue] = useState({
    id: "",
    expert: { id: "", title: "" },
    description: "",
    isActive: "false",
    amount: "",
  });

  const { mutate: createDocumentMutate } = useMutate(createDocument);
  const { mutate: updateDocumentMutate } = useMutate(updateDocument);

  const [validationError, setValidationError] = useState({
    description: "",
    amount: "",
    expert: "",
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "amount") {
      const convertedValue = p2e(value);
      const valueWithoutCommas = removeCommas(convertedValue);
      formattedValue = addCommas(valueWithoutCommas);
    }
    setInputValue((prev) => ({ ...prev, [name]: formattedValue }));
    validationHandler(name, formattedValue);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addDocumentValidation.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          description: "",
          amount: "",
          expert: "",
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

  const { data: experts, refetch: getPersonnelRefetch } = useGet(
    getPersonnel,
    ["getPersonnel"],
    {},
    {
      index: "1",
      size: "20",
    }
  );

  const selectBoxHandler2 = (item: any, name: string) => {
    setInputValue((prev) => ({ ...prev, [name]: item }));
    validationHandler(name, item);
  };

  useEffect(() => {
    if (branchUserId && !data) {
      setInputValue((pre) => {
        return {
          ...pre,
          expert: { title: "جهت خالی نبودن", id: branchUserId },
        };
      });
    }
  }, [branchUserId]);

  const createDocumentHandler = () => {
    if (validationHandler()) {
      const amount = p2e(removeCommas(inputValue.amount));
      if (inputValue.id) {
        updateDocumentMutate(
          {
            Id: inputValue.id,
            Amount: amount,
            Type: inputValue.isActive === "false" ? 1 : 0,
            Description: inputValue.description,
          },
          {
            onSuccess: () => {
              setTimeout(() => {
                props.refetch();
              }, 2);
              closeModalHandler("editPaymentModal");
              setInputValue({
                expert: { id: "", title: "" },
                description: "",
                isActive: "false",
                amount: "",
                id: "",
              });
            },
          }
        );
      } else {
        createDocumentMutate(
          {
            Amount: amount,
            Type: inputValue.isActive === "false" ? 1 : 0,
            Description: inputValue.description,
            branchUserId: inputValue.expert.id,
          },
          {
            onSuccess: () => {
              setTimeout(() => {
                props.refetch();
              }, 2);
              closeModalHandler("editPaymentModal");
              setInputValue({
                expert: { id: "", title: "" },
                description: "",
                isActive: "false",
                amount: "",
                id: "",
              });
            },
          }
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      const filteredExpert = experts?.data.entity?.filter(
        (item) => item.firstName == data.name
      );
      filteredExpert?.map((item) => {
        setInputValue({
          id: data.id,
          expert: { id: item.id, title: `${item.firstName} ${item.lastName}` },
          description: data.description,
          isActive: data.type === 1 ? "false" : "true",
          amount: data.amount,
        });
      });
    }
  }, [data]);

  const backDropHandler = () => {
    setInputValue({
      expert: { id: "", title: "" },
      description: "",
      isActive: "false",
      amount: "",
      id: "",
    });
    setValidationError({
      description: "",
      amount: "",
      expert: "",
    });
  };

  console.log("experts => ", experts);

  return (
    <Modal
      id={"editPaymentModal"}
      title="حقوق و دستمزد"
      textPrimaryBtn="ثبت سند"
      clickHandler={createDocumentHandler}
      backdrop={backDropHandler}
      wrapperClassName="!overflow-y-hidden"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex items-start gap-x-4">
          <div className="w-full ">
            <TextArea
              textAreaProps={{
                // value: inputValue.answer,
                value: inputValue.description,
                onChange: (e) => handleChangeValue(e),
                name: "description",
              }}
              wrapperClassName="h-[4.5rem]"
              label="شرح*"
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.description && validationError?.description}
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between mt-2">
          {selectPersonnel == false ? (
            ""
          ) : (
            <div className="">
              <SelectBox
                list={
                  experts?.data?.entity?.map((expert) => ({
                    id: expert.id,
                    title: `${expert.firstName} ${expert.lastName}`,
                  })) ?? []
                }
                onSelect={(item) => selectBoxHandler2(item, "expert")}
                selectedItem={inputValue.expert}
                wrapperClassName="!w-[240px] !z-[10000]"
                byCheckBox
                placeHolder="انتخاب کارشناس"
              />
              <span className="text-main-primary text-xs ps-3">
                {validationError?.expert && validationError?.expert}
              </span>
            </div>
          )}

          <div className="relative">
            <Input
              wrapperClassName="w-[15rem]"
              inputProps={{
                value: addCommas(inputValue.amount.toString()),
                onChange: (e) => handleChangeValue(e),
                name: "amount",
              }}
            />
            <span className="absolute top-2 left-4">تومان</span>
            <span className="text-xs ps-3 text-main-primary">
              {validationError?.amount && validationError?.amount}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
            وضعیت نمایش در سایت
          </p>
          <div className="flex items-center gap-x-3">
            <RadioButton
              label="بدهکار"
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
              label="بستانکار"
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

export default EditPaymentModal;
