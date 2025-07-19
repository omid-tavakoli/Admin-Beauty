import { FC, useEffect, useState } from "react";
import { IntroModal } from "../../../service/Validation/Index";
import Modal from "../../Modal";
import Input from "../../../theme/Input";
import FileUploader from "../../../components/FileUploader/FileUploader";
import { closeModalHandler } from "../../../service/utils/modalHandler";
import { SettingProps } from "../../../pages/Setting/Setting";
interface IProps {
  selectedItem: SettingProps["service"];
  closeModal?: () => void;
  handleData?: (e: SettingProps["service"]) => void;
}
const ServiceIntro: FC<IProps> = (props) => {
  const { selectedItem } = props;
  const [inputValue, setInputValue] = useState<SettingProps["service"]>({
    video: "",
    description: "",
    instaLik: "",
    name: "",
    telLink: "",
    whatLink: "",
    title: "",
    titleDes: "",
  });
  const [validationError, setValidationError] = useState({
    video: "",
    description: "",
    instaLik: "",
    name: "",
    telLink: "",
    whatLink: "",
    title: "",
    titleDes: "",
  });

  const returnFunc = (file: any | undefined) => {
    setInputValue((pre) => ({ ...pre, video: file }));
  };
  useEffect(() => {
    setInputValue({
      video: selectedItem?.video ?? "",
      description: selectedItem?.description ?? "",
      instaLik: selectedItem?.instaLik ?? "",
      name: selectedItem?.name ?? "",
      telLink: selectedItem?.telLink ?? "",
      whatLink: selectedItem?.whatLink ?? "",
      title: selectedItem?.title ?? "",
      titleDes: selectedItem?.titleDes ?? "",
    });
  }, [selectedItem]);
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({
      ...(pre ?? {
        video: inputValue?.video ?? "",
        description: inputValue?.description ?? "",
        instaLik: inputValue?.instaLik ?? "",
        name: inputValue?.name ?? "",
        telLink: inputValue?.telLink ?? "",
        whatLink: inputValue?.whatLink ?? "",
        title: inputValue?.title ?? "",
        titleDes: inputValue?.titleDes ?? "",
      }),
      [e.target.name]: e.target.value,
    }));
    validationHandler(e.target.name, e.target.value);
  };

  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = IntroModal.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          video: pre.video,
          description: pre.description,
          instaLik: pre.instaLik,
          name: pre.name,
          telLink: pre.telLink,
          whatLink: pre.whatLink,
          title: pre.title,
          titleDes:pre.titleDes,
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
      closeModalHandler("IntroModal");
    }
  };
  return (
    <Modal
      id={"IntroModal"}
      title="تغییرات در سایت"
      clickHandler={SubmitChanges}
      textPrimaryBtn="ثبت تغییرات"
    >
      <div className="flex flex-col gap-y-3 mb-6 text-xs text-black">
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2">
            <Input
              label="لینک تلگرام"
              inputClassName="!w-[12.5rem]"
              inputProps={{
                value: inputValue?.telLink,
                onChange: (e) => handleChangeValue(e),
                name: "telLink",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.telLink && validationError?.telLink}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              label="لینک واتساپ"
              inputClassName="!w-[12.5rem]"
              inputProps={{
                value: inputValue?.whatLink,
                onChange: (e) => handleChangeValue(e),
                name: "whatLink",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.whatLink && validationError?.whatLink}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col gap-y-2">
            <Input
              label=" نام اینستاگرام"
              inputClassName="!w-[12.5rem]"
              inputProps={{
                value: inputValue?.name,
                onChange: (e) => handleChangeValue(e),
                name: "name",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.name && validationError?.name}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              label="لینک اینستاگرام"
              inputClassName="!w-[12.5rem]"
              inputProps={{
                value: inputValue?.instaLik,
                onChange: (e) => handleChangeValue(e),
                name: "instaLik",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.instaLik && validationError?.instaLik}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col gap-y-2">
            <Input
              label="عنوان خدمات"
              inputClassName="!w-[12.5rem]"
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
          <div className="flex flex-col gap-y-2">
            <Input
              label="توضیحات خدمات"
              inputClassName="!w-[12.5rem]"
              inputProps={{
                value: inputValue?.titleDes,
                onChange: (e) => handleChangeValue(e),
                name: "titleDes",
              }}
            />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.titleDes && validationError?.titleDes}
            </span>
          </div>
        </div>
        <div className="w-[39.5rem]">
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
          <span className="flex flex-col gap-y-2">آپلود تیزر تبلیغاتی</span>
          <div className="flex flex-row gap-5">
            <FileUploader fileHandler={returnFunc} />
            <span className="text-main-primary text-xs ps-3">
              {validationError?.video && validationError?.video}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ServiceIntro;
