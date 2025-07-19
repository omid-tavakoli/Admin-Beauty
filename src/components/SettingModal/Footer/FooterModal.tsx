import { FC, useEffect, useState } from "react";
import Modal from "../../Modal";
import Input from "../../../theme/Input";
import { FooterValidationModal } from "../../../service/Validation/Index";
import FileUploader from "../../../components/FileUploader/FileUploader";
import { closeModalHandler } from "../../../service/utils/modalHandler";
import { SettingProps } from "../../../pages/Setting/Setting";
import { gatewayUrl } from "../../../service/config/variables";

interface IProps {
  selectedItem: SettingProps["footer"];
  closeModal?: () => void;
  handleData?: (e: SettingProps["footer"]) => void;
}
const FooterModal: FC<IProps> = (props) => {
  const { selectedItem } = props;
  const [images, setImages] = useState<string[]>(
    selectedItem?.brandImages ?? []
  );
  const [inputValue, setInputValue] = useState<SettingProps["footer"]>({
    description1: "",
    description2: "",
    description3: "",
    title1: "",
    title2: "",
    title3: "",
    brandImages: [],
  });
  const [validationError, setValidationError] = useState({
    description1: "",
    description2: "",
    description3: "",
    title1: "",
    title2: "",
    title3: "",
    brandImages: [],
  });

  useEffect(() => {
    setInputValue({
      brandImages: selectedItem?.brandImages ?? [""],
      description1: selectedItem?.description1 ?? "",
      description2: selectedItem?.description2 ?? "",
      description3: selectedItem?.description3 ?? "",
      title1: selectedItem?.title1 ?? "",
      title2: selectedItem?.title2 ?? "",
      title3: selectedItem?.title3 ?? "",
    });
  }, [selectedItem]);
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({
      ...(pre ?? {
        brandImages: inputValue?.brandImages ?? [""],
        description1: inputValue?.description1 ?? "",
        description2: inputValue?.description2 ?? "",
        description3: inputValue?.description3 ?? "",
        title1: inputValue?.title1 ?? "",
        title2: inputValue?.title2 ?? "",
        title3: inputValue?.title3 ?? "",
      }),
      [e.target.name]: e.target.value,
    }));
    validationHandler(e.target.name, e.target.value);
  };
  console.log("footerValidationModal", FooterValidationModal);

  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = FooterValidationModal.safeParse(
      inputName
        ? { ...inputValue, [inputName]: fieldValue }
        : { ...inputValue, brandImages: images }
    );
    console.log("serviceValidation", serviceValidation, images);

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          brandImages: pre.brandImages,
          description1: pre.description1,
          description2: pre.description2,
          description3: pre.description3,
          title1: pre.title1,
          title2: pre.title2,
          title3: pre.title3,
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
  const Submitchanges = () => {
    if (validationHandler()) {
      props.handleData?.({ ...inputValue, brandImages: images });
      closeModalHandler("FooterModal");
    }
  };
  // console.log("Submitchanges",Submitchanges)
  return (
    <Modal
      id={"FooterModal"}
      title="تغییرات در سایت"
      clickHandler={Submitchanges}
      textPrimaryBtn="ثبت تغییرات"
    >
      <div className="flex flex-col gap-y-4 mb-6 text-xs text-black">
        <div className="flex flex-col gap-y-2">
          <span>انتخاب آیکون کارت اول</span>
          <div className="flex">
            <div className="pl-14 border-l border-l-gray-card-border"></div>
            <div className="flex gap-x-4 mr-4">
              <div className="flex flex-col gap-y-2">
                <Input
                  label="عنوان کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.title1,
                    onChange: (e) => handleChangeValue(e),
                    name: "title1",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.title1 && validationError?.title1}
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Input
                  label="توضیحات کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.description1,
                    onChange: (e) => handleChangeValue(e),
                    name: "description1",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.description1 &&
                    validationError?.description1}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <span>انتخاب آیکون کارت دوم</span>
          <div className="flex">
            <div className="pl-14 border-l border-l-gray-card-border"></div>
            <div className="flex gap-x-4 mr-4">
              <div className="flex flex-col gap-y-2">
                <Input
                  label="عنوان کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.title2,
                    onChange: (e) => handleChangeValue(e),
                    name: "title2",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.title2 && validationError?.title2}
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Input
                  label="توضیحات کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.description2,
                    onChange: (e) => handleChangeValue(e),
                    name: "description2",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.description2 &&
                    validationError?.description2}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <span>انتخاب آیکون کارت سوم</span>
          <div className="flex">
            <div className="pl-14 border-l border-l-gray-card-border"></div>
            <div className="flex gap-x-4 mr-4">
              <div className="flex flex-col gap-y-2">
                <Input
                  label="عنوان کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.title3,
                    onChange: (e) => handleChangeValue(e),
                    name: "title3",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.title3 && validationError?.title3}
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Input
                  label="توضیحات کارت"
                  inputClassName="!w-60"
                  inputProps={{
                    value: inputValue?.description3,
                    onChange: (e) => handleChangeValue(e),
                    name: "description3",
                  }}
                />
                <span className="text-main-primary text-xs ps-3">
                  {validationError?.description3 &&
                    validationError?.description3}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <span>آپلود لوگو برند‌هایی که کار کردید</span>
          <div className="flex flex-row gap-5">
            {/* <div>
              <FileUploader
                fileHandler={(file) => returnFunc(file, "image1")}
              />
              <span className="text-main-primary text-xs ps-3">
                {validationError.image1 && validationError.image1}
              </span>
            </div> */}
            <div className="flex items-end flex-wrap  gap-4 relative">
              <FileUploader
                multiFile
                disable={images.length >= 7}
                fileHandler={(res) => {
                  setImages((pre) => [...pre, res ?? ""]);
                }}
              />
              <span className="text-main-primary text-xs ps-3">
                {validationError.brandImages && validationError.brandImages}
              </span>
              {images.map(
                (img, index) =>
                  img && (
                    <div key={index}>
                      <div className="relative">
                        <div
                          className="absolute top-0 right-0 !z-[1000] pt-2 ps-2"
                          onClick={() =>
                            setImages((pre) =>
                              pre.filter((preImage) => preImage !== img)
                            )
                          }
                        >
                          <span className="flex items-center justify-center bg-main-secondary w-9 h-9 rounded-lg cursor-pointer">
                            <svg width="20" height="20">
                              <use
                                href={
                                  "/assets/images/icons/reservation.svg#delete"
                                }
                              ></use>
                            </svg>
                          </span>
                        </div>

                        <img
                          src={gatewayUrl + img}
                          className="!w-[5.5rem] rounded-xl !h-[5.5rem] object-cover"
                          alt="user-img"
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default FooterModal;
