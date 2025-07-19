import L from "leaflet";
import { FC, useEffect, useId } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  onMapInit: (map: L.Map) => void;
}
const Map: FC<MapProps> = (props) => {
  const maIpd = useId();

  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).setView(
      [33.43406047459431, 52.69050235306594],
      6,
      {}
    );

    L.tileLayer(
      "https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution: "",
      }
    ).addTo(map);
    L.tileLayer(
      "https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png",
      {
        minZoom: 0,
        maxZoom: 18,
        attribution: "",
      }
    ).addTo(map);
    props.onMapInit(map);
    // setMap(map);
  }, []);

  return (
    <>
      <div
        className={
          "container w-full rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-sm h-[476px]"
        }
        id="map"
        key={maIpd}
      >
        <img
          src="/images/marker.png"
          className="absolute z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width={30}
          height={30}
        />
      </div>
    </>
  );
};

export default Map;
