import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className=" w-full h-screen   bg-white">
      <div className="h-full w-full max-w-beauty mx-auto pt-1">
        {/* <Header wrapperClassName="mt-[3.75rem]" /> */}
        <span className="hidden sm:block w-full custom-divider mb-[3.75rem]" />
        <div className="flex flex-col md:flex-row h-[calc(100vh-15rem)] w-full items-center justify-between">
          <div className="flex flex-col items-center order-2 xl:order-1">
            <h1 className="font-bold text-[6.8rem] ">404</h1>
            <p className="font-semibold text-xl ">
              متاسفانه صفحه مورد نظر شما پیدا نشد!
            </p>
            <p className="font-medium text-sm opacity-50 mt-2">
              برای مشاهده سایت بیوتی به صفحه اصلی مراجعه کنید
            </p>
            <Link
              to={"/"}
              className="h-10 w-36 mt-10  flex items-center justify-center text-sm font-semibold text-white  rounded-3xl border  bg-main-primary"
            >
              صفحه اصلی
            </Link>
          </div>
          <svg className="order-1 xl:order-2" width="471" height="378">
            <use
              width="471"
              height="378"
              href={"/images/icons/404.svg#shape"}
            />
          </svg>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
