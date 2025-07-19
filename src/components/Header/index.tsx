import { useContext } from "react";
import { CreateAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { gatewayUrl } from "../../service/config/variables";

const Header = () => {
  const auth = useContext(CreateAuthContext);
  const navigate = useNavigate();

  return (
    <section className="flex items-center bg-white w-full h-20 py-[1.875rem] border-b border-gray-card-border">
      <p className="text-black bg-white text-[2.125rem] leading-[3.375rem] font-normal px-[4.875rem]">
        Beauty
      </p>
      <div
        className="flex items-center ms-[3.125rem] cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <div className="relative w-[2.625rem] h-[2.625rem] rounded-full me-2">
          <img
            src={
              auth?.pictureAddress
                ? `${gatewayUrl + auth.pictureAddress}`
                : "/images/user-image.png"
            }
            className="w-full h-full rounded-full"
          />
          <span className="absolute bottom-0.5 start-1 block w-2 h-2 bg-main-primary rounded-full border border-white" />
        </div>
        <div className="flex flex-col gap-y-[0.375rem] me-6 ">
          <p className="text-main-primary text-[0.625rem] leading-[0.774rem] font-normal">
            سلام، خوش آمدید
          </p>
          <p className="text-black text-[0.875rem] leading-[1.094rem] font-medium">
            {auth?.firstName} {auth?.lastName ?? ""}
          </p>
        </div>
        {/* <div className="relative w-[1.875rem] h-[1.875rem]">
          <svg width="30" height="30">
            <use href={"/images/icons/panel.svg#notification"}></use>
          </svg>
          <span className="flex items-center justify-center absolute -top-1 right-1 w-[0.813rem] h-[0.875rem] rounded-full py-0.5 px-1 text-[0.5rem] bg-danger-500 text-white">
            2
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default Header;
