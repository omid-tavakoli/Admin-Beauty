import { useState } from "react";
import Button from "../../../theme/Button";
import Input from "../../../theme/Input";
import IconInput from "../../../theme/IconInput";
import TextArea from "../../../theme/TextArea";
import RadioButton from "../../../theme/RadioButton";
import SelectBox from "../../../theme/SelectBox";
import Chip from "../../../theme/chip";

export default function AddAds(){
    const [percent, setPercent] = useState("");
    const list = [
      { id: "1", title: "یزد" },
      { id: "2", title: "تهران" },
      { id: "3", title: "شیراز" },
      { id: "4", title: "اصفهان" },
      { id: "5", title: "تبریز" },
    ];

    const [selected, setSelected] = useState<{ id: string; title: string }>({
      id: "0",
      title: "انتخاب خدمت",
    });
    
    const [selectedLine, setSelectedLine] = useState<{ id: string; title: string }>({
      id: "1",
      title: "انتخاب لاین",
    });
    

      const [selectedBranch, setSelectedBranch] = useState<{ id: string; title: string }>({
        id: "1",
        title: "انتخاب شعبه",
      });
    
    const countPercent = (e: number) => {
      let percentStr = Number(percent);
      let sum = percentStr + e;
      setPercent(sum.toString());
    };
  
    return (
        <section className="relative w-[calc(100%-26.875rem)] min-h-[51.688rem]  bg-white mt-6 rounded-lg border border-gray-card-border p-6 !mb-0">

     
        {/* // <ServicesLayout step={1}> */}
          <div className="space-y-6">
            <div className="flex items-end gap-x-6">
              <Input label="تخصص" wrapperClassName="w-[15rem]" />
              <SelectBox
                wrapperClassName="!w-[244px] "
                list={list}
                selectedItem={selected}
                onSelect={setSelected}
                byCheckBox
              />
              <SelectBox
                wrapperClassName="!w-[244px] "
                list={list}
                selectedItem={selectedLine}
                onSelect={setSelectedLine}
                byCheckBox
              />
            </div>
            <div className="flex items-end gap-x-6 ">
              <Input label="حداقل سابقه کار" wrapperClassName="w-[15rem]" />  <SelectBox
                wrapperClassName="!w-[244px] "
                list={list}
                selectedItem={selectedBranch}
                onSelect={setSelectedBranch}
                byCheckBox
              />
            </div>
            <div className="w-[49rem]">
              <TextArea label="توضیحات " />
            </div>
            <div className="flex flex-col ">
              <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
               نوع همکاری
              </p>
              <div className="flex items-center gap-x-3">
                <RadioButton
                  label="درصدی"
                  inputProps={{
                    value: "false",
                    // checked: inputValue.isActive === "true",
                    // onFocus: (e) => handleChangeValue(e as any),
                    name: "isActive",
                    className: "!w-5 !h-5",
                  }}
                  wrapperClassName="w-32"
                />
                <RadioButton
                  label="حقوق ثابت"
                  inputProps={{
                    value: "true",
                    // checked: inputValue.isActive !== "false",
                    // onFocus: (e) => handleChangeValue(e as any),
                    name: "isActive",
                    className: "!w-5 !h-5",
                  }}
                  wrapperClassName="w-32"
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <p className="text-sm leading-[1.313rem] font-medium text-black mb-3">
              وضعیت تعهل
              </p>
              <div className="flex items-center gap-x-3">
                <RadioButton
                  label="مجرد"
                  inputProps={{
                    value: "false",
                    // checked: inputValue.isActive === "true",
                    // onFocus: (e) => handleChangeValue(e as any),
                    name: "isActive",
                    className: "!w-5 !h-5",
                  }}
                  wrapperClassName="w-32"
                />
                <RadioButton
                  label="متاهل"
                  inputProps={{
                    value: "true",
                    // checked: inputValue.isActive !== "false",
                    // onFocus: (e) => handleChangeValue(e as any),
                    name: "isActive",
                    className: "!w-5 !h-5",
                  }}
                  wrapperClassName="w-32"
                />
                <RadioButton
                  label="فرقی ندارد"
                  inputProps={{
                    value: "true",
                    // checked: inputValue.isActive !== "false",
                    // onFocus: (e) => handleChangeValue(e as any),
                    name: "isActive",
                    className: "!w-5 !h-5",
                  }}
                  wrapperClassName="w-32"
                />
              </div>
            </div>
            <div className="flex items-start gap-x-4">
              <div className="relative w-60">
                <IconInput
                  inputProps={{
                    className: "text-end pr-6",
                    value: percent,
                    onChange: (e) => setPercent(e.target.value),
                  }}
                  itemChildren={"+"}
                  itemPosition="left"
                  label="مهارت ‌های مورد نیاز"
                />
              </div>
              <div className="flex flex-row gap-2 mt-7">

              <Chip label="کاشت ناخن" onDismiss={()=>{}}/>
              <Chip label="کاشت ناخن" onDismiss={()=>{}}/>
              </div>

              {/* <div className="w-[33rem]  ">
                <Input
                  label="توضیحات تخفیف"
                  wrapperClassName="w-[33rem] h-[2.5rem] "
                />
              </div> */}
            </div>
          
            
          </div>
    
          <div className="flex justify-end mt-12">
            <Button>ثبت اطلاعات</Button>
          </div>
        {/*  </ServicesLayout> */}
        </section>
      );
}