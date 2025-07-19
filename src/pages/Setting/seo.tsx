import Button from "../../theme/Button";
import Input from "../../theme/Input";

const Seo = () => {
  return (
    <section>
      <div className="p-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
        <span className="text-sm text-black">سئو</span>

        <div className="flex flex-row gap-x-5 mt-6">
          <Input
            label="عنوان"
            inputClassName="w-[240px]"
            inputProps={{
              type: "text",
            }}
          />
          {/* <Input
              label="عنوان متا"
              inputClassName="w-[240px]"
              inputProps={{
                type: "number",
              }}
            /> */}
          <Input
            label="کلید واژه ها"
            inputClassName="w-[240px]"
            inputProps={{
              type: "text",
            }}
          />
          <Input
            label="توضیحات"
            inputClassName="w-[240px]"
            inputProps={{
              type: "text",
            }}
          />
        </div>
        <Button className="mt-6">ثبت تغییرات در سایت</Button>
      </div>
    </section>
  );
};
export default Seo;
