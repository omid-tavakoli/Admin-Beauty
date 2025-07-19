import { FC } from "react";
import Picker, { PickerValue } from "react-mobile-picker";
import Button from "../../theme/Button";

interface IProps {
  pickerValue: PickerValue;
  setPickerValue: any;
  submitHandler: () => void;
  closeModal?: () => void;
}
const ModalTime: FC<IProps> = (props) => {
  const selections = {
    minutes: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
    ],
    hours: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg border custom-border border-gray-card-border absolute left-0 top-12 py-2 w-full z-50">
      <div
        className="w-screen h-screen fixed   top-0 left-0 -z-10"
        onClick={props?.closeModal}
      />
      <div className="mx-4">
        <Picker value={props.pickerValue} onChange={props.setPickerValue}>
          {Object.keys(selections).map((name) => (
            <Picker.Column key={name} name={name}>
              {selections[name as "hours" | "minutes"]?.map(
                (option: string) => (
                  <Picker.Item key={option} value={option} className="relative">
                    {({ selected }) => (
                      <div className={` ${selected && "text-main-primary"} `}>
                        {option}
                        {name === "hours" && (
                          <p className="absolute right-0 text-sm top-2">:</p>
                        )}
                      </div>
                    )}
                  </Picker.Item>
                )
              )}
            </Picker.Column>
          ))}
        </Picker>
      </div>
      <div className="flex justify-center">
        <Button
          className="w-full mx-4 text-xs "
          onClick={(e) => {
            e.stopPropagation();
            props.submitHandler();
          }}
        >
          تایید
        </Button>
      </div>
    </div>
  );
};

export default ModalTime;
