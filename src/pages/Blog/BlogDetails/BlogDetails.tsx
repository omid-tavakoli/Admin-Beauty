import React, { useState } from "react";
import Input from "../../../theme/Input";
import SelectBox from "../../../theme/SelectBox";
import RadioButton from "../../../theme/RadioButton";
import TextArea from "../../../theme/TextArea";
import Button from "../../../theme/Button";
import { BlogDetailsValidate } from "../../../service/Validation/Index";
import { openModalHandler } from "../../../service/utils/modalHandler";
import AddBlogRelated from "../../../components/AddBlogRelated/AddBlogRelated";
import FileUploader from "../../../components/FileUploader/FileUploader";
export default function BlogDetails() {
  const [inputValue, setInputValue] = useState({
    avatar: "",
    description: "",
    shortDescription: "",
    titleBlog: "",
    isActive: "",
    line: { id: "", title: "" },
    category: { id: "", title: "" },
  });
  const [validationError, setValidationError] = useState({
    avatar: "",
    description: "",
    shortDescription: "",
    titleBlog: "",
    isActive: "",
    line: { id: "", title: "" },
    category: { id: "", title: "" },
  });
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = BlogDetailsValidate.safeParse(
      inputName ? { ...inputValue, [inputName]: fieldValue } : inputValue
    );
    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          avatar: "",
          description: "",
          shortDescription: "",
          titleBlog: "",
          isActive: "",
          line: { id: "", title: "" },
          category: { id: "", title: "" },
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
  console.log(inputValue.line)
  console.log(inputValue.category)

  const linesList = [
    { id: "1", title: "لاین 1" },
    { id: "2", title: "لاین 2" },
    { id: "3", title: "لاین 3" },
    { id: "4", title: "لاین 4" },
    { id: "5", title: "لاین 5" },
  ];
  const branchList = [
    { id: "1", title: "یزد" },
    { id: "2", title: "تهران" },
    { id: "3", title: "شیراز" },
    { id: "4", title: "اصفهان" },
    { id: "5", title: "تبریز" },
  ];
  const deleteHandler = () => { };
  const returnFunc = (file: any | undefined) => {
    if (file === undefined) {
      setInputValue((prevState) => ({
        ...prevState,
        avatar: "",
      }));
    }
    if (file !== undefined) {
      setInputValue((prevState) => ({
        ...prevState,
        avatar: file?.dataUrl,
      }));
    }
  };
  const submitHandler = () => {
    if(validationHandler()){
        //post blog
    }
  }
  return (
    <section className="relative w-full min-h-[51.688rem]  bg-white mt-6 rounded-lg border border-gray-card-border p-6 !mb-0 text-xs">
      <p className="text-base font-semibold text-black mb-6">جزییات وبلاگ</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex items-end gap-x-6">
          <div className="relative flex flex-col gap-y-1 mb-1">
            <Input
              label="عنوان مقاله"
              wrapperClassName="!w-[31.75rem]"
              inputProps={{
                value: inputValue.titleBlog,
                onChange: (e) => handleChangeValue(e),
                name: "titleBlog",
              }}
            />
            <span className="absolute -bottom-5 text-main-primary text-xs ps-3">
              {validationError?.titleBlog && validationError?.titleBlog}
            </span>
          </div>
          <div className="flex items-end gap-x-4 mt-2 mb-1">
            <div className="relative flex flex-col gap-y-1">
              <SelectBox
                wrapperClassName="!w-40 "
                list={linesList}
                selectedItem={inputValue.category}
                onSelect={(item) => {
                  setInputValue((pre) => ({
                    ...pre,
                    category  : item,
                  }));
                }
                }
                byCheckBox
                placeHolder="انتخاب دسته‌بندی"
              />
              <span className="absolute -bottom-5 text-main-primary text-xs ps-3">
                {validationError?.titleBlog && validationError?.titleBlog}
              </span>
            </div>
            <div className="relative flex flex-col gap-y-1">
              <SelectBox
                wrapperClassName="!w-40 "
                list={branchList}
                selectedItem={inputValue.line}
                onSelect={(item) => {
                  setInputValue((pre) => ({
                    ...pre,
                    line: item,
                  }));
                }
                }
                byCheckBox
                placeHolder="انتخاب لاین"
              />
              <span className="absolute -bottom-5 text-main-primary text-xs ps-3">
                {validationError?.titleBlog && validationError?.titleBlog}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div
            className="flex items-center justify-between w-48 h-10 px-2.5 border custom-border cursor-pointer select-none"
            onClick={() => openModalHandler("addBlogRelated")}
          >
            <span className="text-sm">افزودن مقاله مرتبط</span>
            <span>
              <svg width={"16px"} height={"16px"}>
                <use href="/images/icons/panel.svg#plus"></use>
              </svg>
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-2 w-[7.375rem] h-10 border custom-border select-none">
            <span>بهترین برند</span>
            <span
              className="flex items-center justify-center"
              onClick={deleteHandler}
            >
              <svg
                width={"12px"}
                height={"12px"}
                className="flex items-center justify-center"
              >
                <use href="/images/icons/panel.svg#close12"></use>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex gap-x-4">
          <div
            className="flex items-center justify-between w-48 h-10 px-2.5 border custom-border cursor-pointer select-none"
            onClick={() => openModalHandler("addBlogRelated")}
          >
            <span className="text-sm">افزودن خدمت مرتبط</span>
            <span>
              <svg width={"16px"} height={"16px"}>
                <use href="/images/icons/panel.svg#plus"></use>
              </svg>
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-2 w-[7.375rem] h-10 border custom-border select-none">
            <span>کاشت مو</span>
            <span
              className="flex items-center justify-center"
              onClick={deleteHandler}
            >
              <svg
                width={"12px"}
                height={"12px"}
                className="flex items-center justify-center"
              >
                <use href="/images/icons/panel.svg#close12"></use>
              </svg>
            </span>
          </div>
        </div>
        <div className="">
          <TextArea
            wrapperClassName="w-[54.25rem] !h-[6.25rem]"
            label="توضیحات کوتاه"
            textAreaProps={{
              value: inputValue.shortDescription,
              onChange: (e) => handleChangeValue(e),
              name: "shortDescription",
            }}
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.shortDescription &&
              validationError?.shortDescription}
          </span>
        </div>
        <div className="">
          <TextArea
            wrapperClassName="w-[54.25rem] !h-[12.5rem]"
            label="توضیحات "
            textAreaProps={{
              value: inputValue.description,
              onChange: (e) => handleChangeValue(e),
              name: "description",
            }}
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.description && validationError?.description}
          </span>
        </div>
        <div className="flex flex-col gap-y-3 text-sm">
          <span>انتخاب عکس اصلی</span>
          <FileUploader fileHandler={returnFunc} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm leading-[1.313rem] font-medium text-black/80  mb-3">
            وضعیت نمایش در سایت
          </p>
          <div className="flex items-center gap-x-3">
            <RadioButton
              label="فعال"
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
              label="غیر فعال"
              inputProps={{
                value: "false",
                checked: inputValue.isActive !== "false",
                onFocus: (e) => handleChangeValue(e as any),
                name: "isActive",
                className: "!w-5 !h-5",
              }}
              wrapperClassName="w-32"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end ">
        <Button onClick={submitHandler}>ثبت جزییات وبلاگ</Button>
      </div>
      <AddBlogRelated />
    </section>
  );
}
