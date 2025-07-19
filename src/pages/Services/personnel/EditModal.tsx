import { FC, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import IconInput from "../../../theme/IconInput/IconInput";
import { useGet, useMutate } from "../../../hooks/useFetch";
import {
  getPersonnelById,
  personnelServiceSample,
} from "../../../service/api/Services";
import { gatewayUrl } from "../../../service/config/variables";
import { useToast } from "../../../utils/ToastContext";

interface Props {
  serviceId: string;
  onCloseModal: () => void;
}
const PersonnelEditServices: FC<Props> = (props) => {
  const { addToast } = useToast();

  const [images, setImages] = useState<string[]>([]);

  const { data: serviceInfo } = useGet(
    getPersonnelById,
    ["getPersonnelById"],
    { enabled: !!props.serviceId },
    props.serviceId
  );
  const info = serviceInfo?.data?.entity;

  useEffect(() => {
    if (!!info) {
      setImages(info?.serviceSample);
    }
  }, [serviceInfo]);

  const { mutate: personnelSampleMutate, isPending: personnelSampleLoading } =
    useMutate(personnelServiceSample);

  const saveEditService = () => {
    personnelSampleMutate(
      {
        Pictures: images,
        ServiceId: props.serviceId,
      },
      {
        onError() {
          addToast("");
        },
      }
    );
  };

  return (
    <Modal
      id={"personnelEditTime"}
      title={"ویرایش خدمت"}
      clickHandler={saveEditService}
      textPrimaryBtn={"ویرایش خدمت"}
      isLoading={personnelSampleLoading}
      backdrop={props?.onCloseModal}
    >
      <div className="flex flex-col w-full  h-full gap-y-6">
        <div className="relative flex justify-center items-center border custom-border mt-6 border-gray-card-border w-60 h-10 text-sm z-10">
          <span className="absolute -top-6 right-0 ">زمان انجام خدمت</span>
          <div className="flex gap-x-2">
            <span>{info?.duration?.split(":")?.[1]}</span>
            <span>:</span>
            <span>{info?.duration?.split(":")?.[0]}</span>
          </div>
        </div>
        <div className="flex items-end flex-wrap  gap-4 relative">
          <p className="absolute -top-0 right-0 text-xs font-medium">
            آپلود عکس نمونه کار
          </p>
          <ImageUploader
            multiFile
            fileHandler={(res) => {
              setImages((pre) => [...pre, res ?? ""]);
            }}
          />
          {images?.map((img) => (
            <div className="relative">
              <div
                className="absolute  top-0 right-0 !z-[1000] pt-2 ps-2"
                onClick={() =>
                  setImages((pre) => pre.filter((preImage) => preImage !== img))
                }
              >
                <span className="flex items-center justify-center bg-main-secondary w-9 h-9 rounded-lg cursor-pointer">
                  <svg width="20" height="20">
                    <use href={"images/icons/panel.svg#delete"}></use>
                  </svg>
                </span>
              </div>
              <img
                src={gatewayUrl + img}
                className="!w-[5.5rem] rounded-xl !h-[5.5rem] object-cover"
                alt="user-img"
              />
            </div>
          ))}
          <div></div>
        </div>
        <div className="relative w-60">
          <IconInput
            inputProps={{
              className: "text-end pr-6",
              value: info?.percentOfCommission,
              name: "present",
              disabled: true,
            }}
            itemChildren={"%"}
            itemPosition="left"
            label="درصد دریافتی"
            border="true"
          />
        </div>
      </div>
    </Modal>
  );
};
export default PersonnelEditServices;
