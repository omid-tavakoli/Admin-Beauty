import { FC, useEffect, useState } from "react";
import Button from "../../theme/Button";
import Input from "../../theme/Input";
import RadioButton from "../../theme/RadioButton";
import MapModal from "../MapModal";
import { openModalHandler } from "../../service/utils/modalHandler";
import CheckBox from "../../theme/CheckBox";
import { useGet, useMutate } from "../../hooks/useFetch";
import { addBranchValidate } from "../../service/Validation/Index";
import { addBranch, getBranchId } from "../../service/api/Branch/Branch";
import { LatLng } from "leaflet";
import { useSearchParams } from "react-router-dom";
import { removeCatching } from "../../service/api/catching";

interface IProps {
  submitHandler: (e: number, id: string, link: string) => void;
}
interface infoFields {
  branchName: string;
  telNumber: string;
  address: string;
  isActive: string;
  mainBranch: string;
}
const BranchInfo: FC<IProps> = (props) => {
  const [params] = useSearchParams();
  const branchId = params.get("bi");
  const { data: resOneBranch } = useGet(
    getBranchId,
    ["getBranchId"],
    { enabled: !!branchId },
    `${branchId}`
  );

  const { mutate: addNewBranch, isPending: addNewBranchLoading } =
    useMutate(addBranch);
  const { mutate: removeCatchingMutate } = useMutate(removeCatching);
  const [locate, setLocate] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [infoFields, setInfoFields] = useState({
    branchName: "",
    telNumber: "",
    address: "",
    isActive: "true",
    mainBranch: "false",
  });

  const [validationError, setValidationError] = useState({
    branchName: "",
    telNumber: "",
    address: "",
    isActive: "",
    mainBranch: "",
  });
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfoFields((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    validationHandler(e.target.name, e.target.value);
  };
  const validationHandler = (inputName?: string, fieldValue?: string) => {
    const serviceValidation = addBranchValidate.safeParse(
      inputName ? { ...infoFields, [inputName]: fieldValue } : infoFields
    );

    if (serviceValidation.success) {
      if (inputName) setValidationError((pre) => ({ ...pre, [inputName]: "" }));
      else
        setValidationError((pre) => ({
          branchName: "",
          telNumber: "",
          address: "",
          isActive: "",
          mainBranch: "",
        }));
    } else {
      if (!inputName && !fieldValue) {
        let getError: any = {};
        serviceValidation?.error?.errors.forEach((err) => {
          console.log("err => ", err);
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

  useEffect(() => {
    if (branchId) {
      const dataEdit = resOneBranch?.data?.entity;
      dataEdit?.map((f: any) => {
        const dataEditLoop: infoFields = {
          branchName: f.title,
          address: f.address,
          telNumber: f.tel,
          isActive: f.status == 1 ? "true" : "false",
          mainBranch: f.isOrigin ? "true" : "false",
        };
        setInfoFields(dataEditLoop);
        setLocate({ lat: dataEdit[0].latitude, lng: dataEdit[0].longitude });
      });
    }
  }, [resOneBranch]);

  const addExpert = () => {
    if (!addNewBranchLoading) {
      if (validationHandler()) {
        if (branchId) {
          addNewBranch(
            {
              Id: branchId,
              Tel: infoFields.telNumber,
              Address: infoFields.address,
              Title: infoFields.branchName,
              Latitude: locate?.lat,
              Longitude: locate?.lng,
              Picture: "base64File string",
              IsOrigin: infoFields.mainBranch == "true" ? true : false,
              Status: infoFields.isActive == "true" ? 1 : 0,
            },
            {
              onError: (error) => {
                console.log(error);
              },
              onSuccess: (res) => {
                removeCatchingMutate("reservation/branches");
                props?.submitHandler(
                  2,
                  res.data.entity.id,
                  `?bi=${res.data.entity.id}`
                );
              },
            }
          );
        } else {
          addNewBranch(
            {
              Tel: infoFields.telNumber,
              Address: infoFields.address,
              Title: infoFields.branchName,
              Latitude: locate?.lat,
              Longitude: locate?.lng,
              Picture: "base64File string",
              IsOrigin: infoFields.mainBranch == "true" ? true : false,
              Status: infoFields.isActive == "true" ? 1 : 0,
            },
            {
              onError: (error) => {
                console.log(error);
              },
              onSuccess: (res) => {
                props?.submitHandler(
                  2,
                  res.data.entity.id,
                  `?bi=${res.data.entity.id}`
                );
              },
            }
          );
        }
      }
    }
  };
  const locationHandler = (e: LatLng | undefined) => {
    setLocate({ lat: e?.lat ?? 0, lng: e?.lng ?? 0 });
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: infoFields.branchName,
              onChange: (e) => handleChangeValue(e),
              name: "branchName",
            }}
            label="نام شعبه*"
            wrapperClassName="me-8"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.branchName && validationError?.branchName}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: infoFields.telNumber,
              onChange: (e) => {
                handleChangeValue({
                  ...e,
                  target: {
                    ...e.target,
                    name: e.target.name,
                    value:
                      e.target.value.length === 3
                        ? e.target.value + "-"
                        : e.target.value,
                  },
                });
              },
              name: "telNumber",
              maxLength : 11
            }}
            label="شماره ثابت*"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.telNumber && validationError?.telNumber}
          </span>
        </div>
      </div>
      <div className="flex items-end mt-6">
        <div className="flex flex-col gap-y-2">
          <Input
            inputProps={{
              value: infoFields.address,
              onChange: (e) => handleChangeValue(e),
              name: "address",
            }}
            label="آدرس*"
            wrapperClassName="me-8 w-[28.5rem]"
          />
          <span className="text-main-primary text-xs ps-3">
            {validationError?.address && validationError?.address}
          </span>
        </div>
        <Button
          className="button-primary-outline "
          onClick={() => openModalHandler("mapModal")}
        >
          انتخاب از روی نقشه{" "}
        </Button>
      </div>
      <p className="text-sm leading-[1.313rem] font-medium text-black mb-3 mt-6">
        وضعیت نمایش در سایت
      </p>
      <div className="flex items-center gap-x-3">
        <RadioButton
          label="فعال"
          inputProps={{
            value: "true",
            checked: infoFields.isActive === "true",
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
            checked: infoFields.isActive === "false",
            onFocus: (e) => handleChangeValue(e as any),
            name: "isActive",
            className: "!w-5 !h-5",
          }}
          wrapperClassName="w-32"
        />
      </div>
      <p className="text-sm leading-[1.313rem] font-medium text-black mb-3 mt-6">
        شعبه اصلی
      </p>
      <CheckBox
        label="اصلی"
        wrapperProps={{
          className: "w-fit",
        }}
        inputProps={{
          checked: infoFields.mainBranch === "true",
          onChange: (e) => {
            handleChangeValue({
              ...e,
              target: {
                ...e.target,
                name: "mainBranch",
                value: String(e.target.checked),
              },
            });
          },
        }}
      />
      <div className="flex  justify-end gap-x-3 mt-12">
        <Button className="bg-white text-main-primary border border-main-primary">
          لغو
        </Button>
        <Button onClick={addExpert}>
          {addNewBranchLoading ? (
            <span className="loading loading-spinner loading-xs mx-3"></span>
          ) : (
            "ثبت"
          )}
        </Button>
      </div>
      <MapModal locationHandler={(e) => locationHandler(e)} location={locate} />
    </>
  );
};
export default BranchInfo;
