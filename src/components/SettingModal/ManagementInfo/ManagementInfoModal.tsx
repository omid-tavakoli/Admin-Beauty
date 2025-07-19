import { FC, useEffect, useState } from "react";
import { ManagementInfoModal } from "../../../service/Validation/Index";
import Modal from "../../Modal";
import Input from "../../../theme/Input";
import FileUploader from "../../../components/FileUploader/FileUploader";
import { closeModalHandler } from "../../../service/utils/modalHandler";
import { SettingProps } from "../../../pages/Setting/Setting";

interface IProps {
  selectedItem: SettingProps["ownerInfo"];
  closeModal?: () => void;
  handleData?: (e: SettingProps["ownerInfo"]) => void;
}
const ManagementInfo: FC<IProps> = (props) => {
  const { selectedItem } = props;

  const [inputValue, setInputValue] = useState<SettingProps["ownerInfo"]>({
    jobPosition: "",
    title: "",
    description: "",
    image: "",
  });
  const [validationError, setValidationError] = useState({
    jobPosition: "",
    title: "",
    description: "",
    image: "",
  });
  const returnFunc = (file: string | undefined) => {
    setInputValue((pre) => ({ ...pre, image: file }));
  };

  useEffect(() => {
    setInputValue({
      title: selectedItem?.title ?? "",
      description: selectedItem?.description ?? "",
      image: selectedItem?.image ?? "",
      jobPosition: selectedItem?.jobPosition ?? "",
    });
  }, [selectedItem]);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({
      ...(pre ?? {
        title: inputValue?.title ?? "",
        description: inputValue?.description ?? "",
        image: inputValue?.image ?? "",
        jobPosition: inputValue?.jobPosition ?? "",
      }),
      [e.target.name]: e.target.value,
    }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = ManagementInfoModal.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          description: pre?.description,
          image: pre?.image,
          jobPosition: pre?.jobPosition,
          title: pre?.title,
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
  const SubmitChanges = () => {
    if (validationHandler()) {
      props.handleData?.(inputValue);
      closeModalHandler("ManagementInfoModal");
    }
  };
  return (
    <Modal
      id={"ManagementInfoModal"}
      title="تغییرات در سایت"
      clickHandler={SubmitChanges}
      textPrimaryBtn="ثبت تغییرات"
    >
      <div className="flex flex-col gap-y-3 mb-6 text-xs text-black">
        <div className=" flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: inputValue?.jobPosition,
              onChange: (e) => handleChangeValue(e),
              name: "jobPosition",
            }}
            label="سمت شغلی"
            inputClassName="!w-60"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.jobPosition && validationError?.jobPosition}
          </span>
        </div>
        <div className="w-[37.50rem] flex flex-col gap-y-2">
          <Input
            label="عنوان صفحه"
            inputClassName="!h-[52px]"
            wrapperClassName="w-full"
            inputProps={{
              value: inputValue?.title,
              onChange: (e) => handleChangeValue(e),
              name: "title",
            }}
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.title && validationError?.title}
          </span>
        </div>
        <div className="w-[37.50rem] flex flex-col gap-y-2">
          <Input
            label="توضیحات "
            inputClassName="!h-[52px]"
            wrapperClassName="w-full"
            inputProps={{
              value: inputValue?.description,
              onChange: (e) => handleChangeValue(e),
              name: "description",
            }}
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.description && validationError?.description}
          </span>
        </div>
        <div>
          <span className="flex flex-col gap-y-2">آپلود عکس پرسونلی</span>
          <div className="flex flex-row gap-5">
            <FileUploader fileHandler={returnFunc} />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.image && validationError?.image}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ManagementInfo;
