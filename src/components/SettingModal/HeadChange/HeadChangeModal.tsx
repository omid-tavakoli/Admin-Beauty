import { FC, useEffect, useState } from "react";
import { HeadChangeModal } from "../../../service/Validation/Index";
import Modal from "../../Modal";
import Input from "../../../theme/Input";
import RadioButton from "../../../theme/RadioButton";
import FileUploader from "../../../components/FileUploader/FileUploader";
import { closeModalHandler } from "../../../service/utils/modalHandler";
import { SettingProps } from "../../../pages/Setting/Setting";
interface IProps {
  selectedItem: SettingProps["introduction"];
  closeModal?: () => void;
  handleData?: (e: SettingProps["introduction"]) => void;
}
const HeadIntroModal: FC<IProps> = (props) => {
  const { selectedItem } = props;
  const returnFuncImg1 = (file: string | undefined, name: string) => {
    if (file) {
      setInputValue((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setInputValue((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const [inputValue, setInputValue] = useState<SettingProps["introduction"]>({
    title: "",
    description: "",
    instaTitle: "",
    instaId: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    isActive: "true",
  });
  const [validationError, setValidationError] = useState({
    title: "",
    description: "",
    instaTitle: "",
    instaId: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    isActive: "true",
  });
  useEffect(() => {
    setInputValue({
      title: selectedItem?.title ?? "",
      description: selectedItem?.description ?? "",
      image1: selectedItem?.image1 ?? "",
      instaId: selectedItem?.instaId ?? "",
      image2: selectedItem?.image2 ?? "",
      image3: selectedItem?.image3 ?? "",
      image4: selectedItem?.image4 ?? "",
      instaTitle: selectedItem?.instaTitle ?? "",
      isActive: selectedItem?.isActive ?? "",
    });
  }, [selectedItem]);
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({
      ...(pre ?? {
        title: inputValue?.title ?? "",
        description: inputValue?.description ?? "",
        image1: inputValue?.image1 ?? "",
        instaId: inputValue?.instaId ?? "",
        image2: inputValue?.image2 ?? "",
        image3: inputValue?.image3 ?? "",
        image4: inputValue?.image4 ?? "",
        instaTitle: inputValue?.instaTitle ?? "",
        isActive: inputValue?.isActive ?? "",
      }),
      [e.target.name]: e.target.value,
    }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = HeadChangeModal.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: pre.title,
          description: pre.description,
          instaId: pre.instaId,
          instaTitle: pre.instaTitle,
          image1: pre.image1,
          image2: pre.image2,
          image3: pre.image3,
          image4: pre.image4,
          isActive: pre.isActive,
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

  const handleSubmit = () => {
    if (validationHandler()) {
      props.handleData?.(inputValue);
      closeModalHandler("HeadChangeModal");
    }
  };
  return (
    <Modal
      id={"HeadChangeModal"}
      title="تغییرات سایت"
      clickHandler={handleSubmit}
      textPrimaryBtn="ثبت تغییرات"
    >
      <div className="flex flex-col gap-y-3 mb-6 text-xs text-black h-full overflow-y-auto">
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
      </div>
      <div className="flex flex-col gap-y-2 mb-6 text-xs text-black">
        <span>آپلود عکس نمونه کار</span>
        <div className="flex flex-row gap-5">
          <div>
            <FileUploader
              fileHandler={(file) => returnFuncImg1(file, "image1")}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.image1 && validationError?.image1}
            </span>
          </div>
          <div>
            <FileUploader
              fileHandler={(file) => returnFuncImg1(file, "image2")}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.image2 && validationError?.image2}
            </span>
          </div>
          <div>
            <FileUploader
              fileHandler={(file) => returnFuncImg1(file, "image3")}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.image3 && validationError?.image3}
            </span>
          </div>
          <div>
            <FileUploader
              fileHandler={(file) => returnFuncImg1(file, "image4")}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.image4 && validationError?.image4}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mb-6 text-xs text-black">
        <span className="text-sm text-black/80">
          وضعیت نمایش ایدی اینستاگرام در سایت
        </span>
        <div className="flex items-center gap-x-3">
          <RadioButton
            label="فعال"
            inputProps={{
              value: "true",
              checked: inputValue?.isActive === "true",
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
              checked: inputValue?.isActive === "false",
              onFocus: (e) => handleChangeValue(e as any),
              name: "isActive",
              className: "!w-5 !h-5",
            }}
            wrapperClassName="w-32"
          />
        </div>
      </div>
      <div className="flex  flex-row w-full gap-x-6">
        <div className="flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: inputValue?.instaId,
              onChange: (e) => handleChangeValue(e),
              name: "instaId",
            }}
            label="آیدی اینستاگرام"
            inputClassName="!w-60"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.instaId && validationError?.instaId}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: inputValue?.instaTitle,
              onChange: (e) => handleChangeValue(e),
              name: "instaTitle",
            }}
            label="نام اینستاگرام"
            inputClassName="!w-60"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.instaTitle && validationError?.instaTitle}
          </span>
        </div>
      </div>
    </Modal>
  );
};
export default HeadIntroModal;
