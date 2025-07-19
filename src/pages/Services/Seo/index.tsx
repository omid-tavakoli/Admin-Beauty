import { useEffect, useState } from "react";
import ServicesLayout from "../../../components/Services/ServicesLayout";
import Button from "../../../theme/Button";
import { useSearchParams } from "react-router-dom";
import { useMutate } from "../../../hooks/useFetch";

import { useToast } from "../../../utils/ToastContext";
import Input from "../../../theme/Input";
import { addSeoTagsValidations } from "../../../service/Validation/Index";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import { addCommas, p2e, removeCommas } from "../../../utils/priceHandler";
import TextArea from "../../../theme/TextArea";
import TagInput from "../../../theme/TagInput";
import { getDataSetting, postDataSetting } from "../../../service/api/setting";
import { serviceSeoSettingsKey } from "../../../service/config/variables";

export default function Seo() {
  const { addToast } = useToast();
  let [searchParams] = useSearchParams();
  const [params] = useSearchParams();

  interface INPUTVALUE {
    title: string;
    description: string;
    robots: { id: string; title: string };
    canonical: string;
    keyWords: string[];
  }

  const [inputValue, setInputValue] = useState<INPUTVALUE>({
    title: "",
    description: "",
    robots: { id: "", title: "" },
    canonical: "",
    keyWords: [],
  });

  const [validationError, setValidationError] = useState({
    title: "",
    description: "",
    robots: "",
    canonical: "",
  });

  const robotsList = [
    { id: "0", title: "follow" },
    { id: "1", title: "nofollow" },
  ];

  const decodeSetting = (item: string) => {
    try {
      const JsonSetting = JSON.parse(item);
      setInputValue(JsonSetting);
    } catch (error) {
      console.log("error", error);
    }
  };

  const { mutate: postSetting, isPending: postSettingLoading } =
    useMutate(postDataSetting);
  const { mutate: settingMutate, isPending } = useMutate(getDataSetting);

  useEffect(() => {
    settingMutate(serviceSeoSettingsKey, {
      onSuccess(data) {
        console.log("data =>", data);
        decodeSetting(data.data.entity?.settings?.[0].value ?? "");
      },
    });
  }, []);

  const addTagHandler = () => {
    if (validationHandler()) {
      postSetting(
        { Key: serviceSeoSettingsKey, value: JSON.stringify(inputValue) },
        {
          onSuccess() {
            addToast("تغیرات با موفقیت ثبت شد.", "success");
          },
          onError() {
            addToast(
              "مشکلی پیش آمده است لطفا چند لحظه بعد تلاش کنید.",
              "error"
            );
          },
        }
      );
    }
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "deposit") {
      const convertedValue = p2e(value);
      const valueWithoutCommas = removeCommas(convertedValue);
      formattedValue = addCommas(valueWithoutCommas);
      console.log(value);
    }
    setInputValue((prev) => ({ ...prev, [name]: formattedValue }));
    validationHandler(name, formattedValue);
  };

  const validationHandler = (
    inputName?: string,
    fieldValue?: string | ListItem
  ) => {
    const seoTagsValidations = addSeoTagsValidations.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (seoTagsValidations.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          title: "",
          description: "",
          robots: "",
          canonical: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        seoTagsValidations?.error?.errors.forEach((err) => {
          getError = { ...getError, [err.path[0]]: err.message };
        });
        setValidationError(getError);
      } else {
        const getErrorItem = seoTagsValidations?.error?.errors?.find(
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

    return seoTagsValidations.success;
  };

  const selectedTags = (tags: any) => {
    setInputValue((pre) => ({
      ...pre,
      keyWords: tags,
    }));
  };

  console.log("inputValue.keyWords => ", inputValue.keyWords);

  return (
    <>
      <ServicesLayout step={2} wrapperClassName="!mb-0">
        <div className="space-y-6">
          <div className="flex items-end w-full justify-between gap-x-4">
            <div className="w-1/2">
              {isPending ? (
                <div className="skeleton flex justify-between  items-center rounded-lg border border-gray-card-border p-4" />
              ) : (
                <Input
                  label="تایتل صفحه خدمت"
                  wrapperClassName="w-full"
                  inputProps={{
                    value: inputValue.title,
                    onChange: (e) => handleChangeValue(e),
                    name: "title",
                  }}
                />
              )}
              <span className="text-main-primary text-xs ps-3">
                {validationError?.title && validationError?.title}
              </span>
            </div>
            <div className="w-1/2">
              {isPending ? (
                <div className="skeleton flex justify-between  items-center rounded-lg border border-gray-card-border p-4" />
              ) : (
                <Input
                  label="canonical"
                  wrapperClassName="w-full"
                  inputProps={{
                    value: inputValue.canonical,
                    onChange: (e) => handleChangeValue(e),
                    name: "canonical",
                  }}
                />
              )}
              <span className="text-main-primary text-xs ps-3">
                {validationError?.canonical && validationError?.canonical}
              </span>
            </div>
          </div>
          <div className="flex items-end w-full justify-between gap-x-4">
            <div className="w-full">
              {isPending ? (
                <div className="skeleton flex justify-between h-[11.75rem] items-center rounded-lg border border-gray-card-border p-4" />
              ) : (
                <TextArea
                  textAreaProps={{
                    value: inputValue.description,
                    onChange: (e) => handleChangeValue(e),
                    name: "description",
                  }}
                  wrapperClassName="h-[4.5rem]"
                  label="توضیحات صفحه خدمت"
                />
              )}
              <span className="text-main-primary text-xs ps-3">
                {validationError?.description && validationError?.description}
              </span>
            </div>
          </div>
          <div className="flex items-end w-full justify-between gap-x-4">
            <div className="w-full">
              {isPending ? (
                <div className="skeleton flex justify-between h-[4.375rem] items-center rounded-lg border border-gray-card-border p-4" />
              ) : (
                <TagInput
                  selectedTags={selectedTags}
                  tags={inputValue.keyWords}
                />
              )}

              <span className="text-main-primary text-xs ps-3">
                {validationError?.description && validationError?.description}
              </span>
            </div>
          </div>
          <div className="flex items-end w-full justify-between gap-x-4">
            <div className="w-1/2">
              {isPending ? (
                <div className="skeleton flex justify-between  items-center rounded-lg border border-gray-card-border p-4" />
              ) : (
                <SelectBox
                  inputProps={{
                    name: "selectLine",
                  }}
                  wrapperClassName="!w-[15rem]"
                  list={robotsList}
                  selectedItem={inputValue.robots}
                  onSelect={(item) => {
                    setInputValue((pre) => ({
                      ...pre,
                      robots: item,
                    }));
                  }}
                  byCheckBox
                  placeHolder="وضعیت نمایش برای رباتها"
                />
              )}
              <span className="text-main-primary text-xs ps-3">
                {validationError?.robots && validationError?.robots}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-6">
          <Button
            onClick={addTagHandler}
            disabled={postSettingLoading}
            isLoading={postSettingLoading}
          >
            ثبت اطلاعات
          </Button>
        </div>
      </ServicesLayout>
    </>
  );
}
