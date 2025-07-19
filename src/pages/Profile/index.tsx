import { useContext, useEffect, useState } from "react";
import Input from "../../theme/Input";
import { CreateAuthContext } from "../../context/AuthContext";
import { removeAreaCode } from "../../utils/phoneNumberEdit";
import ImageUploader from "../../components/FileUploader/FileUploader";
import { gatewayUrl } from "../../service/config/variables";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import Button from "../../theme/Button";
import { useMutate } from "../../hooks/useFetch";
import { updateProfile } from "../../service/api/users";
import { toGregorian, toJalaali } from "../../utils/date";
import { client } from "../../providers/ReactQueryProvider";
interface InputValue {
  firstName: string;
  lastName: string;
  phone: string;
  nationalCode: string;
  birthday: DayValue | undefined;
  email: string;
  avatar: string;
}

export default function Profile() {
  const auth = useContext(CreateAuthContext);

  const [inputValue, setInputValue] = useState<InputValue>({
    firstName: "",
    lastName: "",
    phone: "",
    nationalCode: "",
    birthday: undefined,
    email: "",
    avatar: "",
  });

  const { mutate: updateProfileMutate, isPending: updateProfileLoading } =
    useMutate(updateProfile);

  useEffect(() => {
    if (!!auth) {
      const userBirthday = auth?.birthDate
        ? toJalaali(auth?.birthDate)
        : undefined;
      setInputValue({
        avatar: auth?.pictureAddress,
        birthday: userBirthday
          ? {
              day: +userBirthday?.day.numeric,
              month: +userBirthday?.month.numeric,
              year: +userBirthday?.year,
            }
          : undefined,
        email: auth?.email,
        firstName: auth?.firstName,
        lastName: auth?.lastName,
        nationalCode: auth?.nationalCode,
        phone: auth?.phoneNumber,
      });
    }
  }, [auth]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const saveProfile = () => {
    const birthday = inputValue.birthday
      ? toGregorian(
          +inputValue?.birthday?.year,
          +inputValue?.birthday?.month,
          +inputValue?.birthday?.day
        )
      : undefined;

    updateProfileMutate(
      {
        BirthDate: `${
          birthday?.year !== undefined
            ? `${birthday.year}-${birthday?.month}-${birthday?.day}`
            : ""
        }`,
        Email: inputValue?.email,
        FirstName: inputValue?.firstName,
        LastName: inputValue?.lastName,
        NationalCode: inputValue?.nationalCode,
        PictureBase64: inputValue?.avatar,
      },
      {
        onSuccess: () => {
          client.refetchQueries({ queryKey: ["getUserInfo"] });
        },
      }
    );
  };

  return (
    <section className="relative w-full h-[calc(100%-3rem)] flex flex-col  bg-white mt-6 rounded-lg border border-gray-card-border p-6 !mb-0">
      <p className="text-base font-semibold text-black  ">پروفایل</p>
      <div className="flex gap-6 flex-wrap items-center mt-6  ">
        <Input
          wrapperClassName="!w-60"
          labelClassName="!font-bold"
          inputProps={{
            value: inputValue?.firstName,
            onChange: handleChangeValue,
            name: "firstName",
          }}
          label="نام"
        />
        <Input
          wrapperClassName="!w-60"
          labelClassName="!font-bold"
          inputProps={{
            value: inputValue?.lastName,
            onChange: handleChangeValue,
            name: "lastName",
          }}
          label="نام خانوادگی"
        />
        <Input
          wrapperClassName="!w-60"
          labelClassName="!font-bold"
          inputProps={{
            value: removeAreaCode(inputValue?.phone),
            disabled: true,
            name: "name",
          }}
          label="شماره موبایل"
        />

        <Input
          wrapperClassName="!w-60"
          labelClassName="!font-bold"
          inputProps={{
            value: inputValue?.nationalCode,
            onChange: handleChangeValue,
            name: "nationalCode",
          }}
          label="کد‌ملی"
        />
        <DatePicker
          value={inputValue.birthday as any}
          onChange={(e) => {
            setInputValue((pre) => ({
              ...pre,
              birthday: e,
            }));
          }}
          locale="fa"
          renderInput={({ ref }) => (
            <Input
              inputClassName="!h-10 placeholder:text-black hover:cursor-pointer "
              ref={ref as any}
              inputProps={{
                readOnly: true,
                value: inputValue.birthday
                  ? `${inputValue.birthday?.year}-${inputValue.birthday?.month}-${inputValue.birthday?.day}`
                  : "",
              }}
              label="تاریخ تولد"
              wrapperClassName="w-32 text-sm w-60"
            />
          )}
          calendarPopperPosition="bottom"
          inputPlaceholder="انتخاب تاریخ"
          colorPrimary="#eb1086"
        />

        <Input
          wrapperClassName="!w-60"
          labelClassName="!font-bold"
          inputProps={{
            value: inputValue?.email,
            onChange: handleChangeValue,
            name: "email",
          }}
          label="ایمیل"
        />
      </div>

      <ImageUploader
        image={
          inputValue?.avatar ? `${gatewayUrl + inputValue?.avatar}` : undefined
        }
        fileHandler={(imgUrl) =>
          imgUrl &&
          //@ts-ignore
          handleChangeValue({ target: { name: "avatar", value: imgUrl } })
        }
      />
      <div className="flex justify-end mt-auto">
        <Button
          className="disabled:opacity-50 mb-0"
          disabled={updateProfileLoading}
          onClick={saveProfile}
        >
          {updateProfileLoading ? (
            <span className="loading loading-spinner loading-sm mx-3"></span>
          ) : (
            "ثبت اطلاعات"
          )}
        </Button>
      </div>
    </section>
  );
}
