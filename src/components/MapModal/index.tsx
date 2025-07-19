import { FC, useEffect, useState } from "react";
import Modal from "../Modal";
import Map from "../Map/Map";
import { closeModalHandler } from "../../service/utils/modalHandler";
import { LatLng } from "leaflet";

interface IProps {
  onClick?: () => string;
  onSubmit?: () => any;
  locationHandler?: (e: LatLng | undefined) => void;
  location: { lat: number; lng: number };
}

const MapModal: FC<IProps> = (props) => {
  const [map, setMap] = useState<L.Map | undefined>(undefined);
  const locationHandler = () => {
    props.locationHandler && props.locationHandler(map?.getCenter());
    closeModalHandler("mapModal");
  };
  // const [searchValue, setSearchValue] = useState("");
  // const onSubmit = () => {};
  // const onClick = (value: string) => {
  //   return value;
  // };
  // const handleEnterKeyboard = (event: KeyboardEvent) => {
  //   if (event?.key === "Enter") {
  //     onClick(searchValue);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("keydown", handleEnterKeyboard);
  //   return () =>
  //     window.document.removeEventListener("keydown", handleEnterKeyboard);
  // }, [handleEnterKeyboard]);
  // const submitHandler = (): void => {
  //   console.log("clicked");
  // };
  useEffect(() => {
    if (props.location) {
      map?.flyTo(props.location, 19);
    }
  }, [props.location]);
  return (
    <Modal
      id={"mapModal"}
      title="تائید و ادامه"
      textPrimaryBtn="تایید"
      clickHandler={locationHandler}
      // subTitle="موقعیت مکانی آدرس را مشخص کنید"
    >
      <div className="relative">
        {/* Map container  */}
        {/* <div className="relative "> */}
        <Map onMapInit={(map) => setMap(map)} />
        {/* </div> */}
        {/* Map container  */}
      </div>
      {/* <div className="absolute z-10 w-full top-4 px-[68px]">
        <span className="flex items-center justify-center w-9 h-9 p-2 absolute top-2 right-[4.8rem] ">
          <svg
            width="24"
            height="24"
            className="fill-black/50 stroke-transparent"
          >
            <use href={"images/icons/panel.svg#search"}></use>
          </svg>
        </span>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e?.target?.value)}
          className="w-full ps-[2.658rem] bg-white h-[3.25rem] pt-3 pb-3 leading-[1.313rem] text-sm font-medium placeholder:text-black/50 outline-0"
          placeholder="جستجوی آدرس"
        />
      </div> */}
    </Modal>
  );
};

export default MapModal;
