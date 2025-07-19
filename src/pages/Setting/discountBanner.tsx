import { FC } from "react";
import { SettingProps } from "./Setting";

interface Props {
  discount: SettingProps["discount"];
}
const DiscountBanner: FC<Props> = (props) => {
  const { discount } = props;
  return (
    <section className="flex w-full items-center justify-center  h-10 bg-main-primary">
      <p className="text-white font-medium text-sm">
        <span>٪</span>
        {discount?.discount}
        {discount?.discountDecs}
      </p>
    </section>
  );
};

export default DiscountBanner;
