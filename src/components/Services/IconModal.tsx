import { FC } from "react";
import Modal from "../Modal";
import { closeModalHandler } from "../../service/utils/modalHandler";

const icons = [
  "eyes",
  "brushing",
  "nailImplant",
  "chignon",
  "Makeup",
  "eyelashLift",
  "CuttingHair",
  "hairColor",
  "MicroEyebrow",
  "SkinAndBeauty",
  "HairExtensions",
  "HairTexture",
  "hairStraightener",
  "manicure",
  "pedicure",
  "facial",
];

interface ModalIconProps {
  selectedIcon: string;
  onSelectIcon: (name: string) => void;
}

const ModalIcon: FC<ModalIconProps> = (props) => {
  return (
    <Modal
      id={"ModalIcon"}
      title={"انتخاب آیکون مد نظر"}
      textPrimaryBtn={"ثبت آیکون"}
      clickHandler={() => {
        closeModalHandler("ModalIcon");
      }}
    >
      <div className="flex flex-wrap gap-6 mt-2">
        {icons.map((icon) => (
          <>
            <span
              className={`bg-white shadow-xs w-[3.125rem] h-[3.125rem] rounded-2xl flex items-center justify-center ${
                icon === props.selectedIcon && "border !border-main-primary"
              }`}
            >
              <svg
                width="40"
                height="40"
                className={`fill-black cursor-pointer`}
                onClick={() => props.onSelectIcon(icon)}
              >
                <use href={`/images/icons/services.svg#${icon}`}></use>
              </svg>
            </span>
          </>
        ))}
      </div>
    </Modal>
  );
};

export default ModalIcon;
