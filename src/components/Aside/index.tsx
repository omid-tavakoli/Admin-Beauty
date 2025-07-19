import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserRole } from "../../hooks/useUserRole";
import { frontUrl } from "../../service/config/variables";
interface Menu {
  link: string;
  id: number;
  icon: string;
  title: string;
  subMenu?: {
    title: string;
    link: string;
  }[];
}
const menu: Menu[] = [
  {
    link: "/",
    id: 1,
    icon: "images/icons/panel.svg#category-icon",
    title: "داشبورد",
  },
  {
    link: "/reservation",
    id: 2,
    icon: "/images/icons/panel.svg#category-icon",
    title: "نوبت‌ها",
    subMenu: [
      { title: "نوبت‌ها", link: "/reservation" },
      // { title: "نوبت‌های فوری", link: "/" },
      // { title: "تعطیلی موقت", link: "/" },
    ],
  },
  {
    id: 3,
    link: "/services",
    icon: "/images/icons/panel.svg#category-icon",
    title: "خدمات",
    subMenu: [
      { title: "خدمات", link: "/services" },
      // { title: "پکیج‌ها", link: "/" },
      { title: "لاین‌ها", link: "/lines" },
    ],
  },
  {
    id: 4,
    link: "/branch",
    icon: "/images/icons/panel.svg#category-icon",
    title: "شعبات",
  },
  // {
  //   id: 5,
  //   link: "/",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "مالی",
  //   subMenu: [
  //     { title: "حقوق و دستمزد", link: "/" },
  //     { title: "تراکنش‌ها", link: "/" },
  //     { title: "درخواست برداشت", link: "/" },
  //   ],
  // },
  {
    id: 6,
    link: "/expert",
    icon: "/images/icons/panel.svg#category-icon",
    title: "پرسنل",
    subMenu: [
      { title: "پرسنل", link: "/expert" },
      // { title: "مرخصی‌ها", link: "/" },
    ],
  },
  // {
  //   id: 7,
  //   link: "/",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "حساب‌های بانکی",
  //   subMenu: [
  //     { title: "حساب‌ها", link: "/" },
  //     { title: "حساب‌های‌ بانکی مشتریان", link: "/" },
  //   ],
  // },
  {
    id: 8,
    link: "/user",
    icon: "/images/icons/panel.svg#category-icon",
    title: "کاربران",
    subMenu: [
      { title: "کاربران", link: "/user" },
      // { title: "دیدگاه‌ها", link: "/" },
    ],
  },
  {
    id: 9,
    link: "/sms",
    icon: "images/icons/panel.svg#category-icon",
    title: "پیامک‌ها",
  },
  {
    id: 10,
    link: "/profile",
    icon: "images/icons/panel.svg#category-icon",
    title: "پروفایل",
  },
  // {
  //   id: 11,
  //   link: "/",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "خرید و تمدید پنل",
  // },
  // {
  //   id: 12,
  //   link: "/blogs",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "وبلاگ",
  // },
  // {
  //   id: 13,
  //   link: "/",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "استخدام",
  //   subMenu: [
  //     { title: "آگهی‌ها", link: "/" },
  //     { title: "درخواست‌ها", link: "/" },
  //   ],
  // },
];
const personnelMenu: Menu[] = [
  {
    link: "/",
    id: 1,
    icon: "images/icons/panel.svg#category-icon",
    title: "داشبورد",
  },
  {
    link: "/reservation",
    id: 2,
    icon: "/images/icons/panel.svg#category-icon",
    title: "نوبت‌ها",
  },
  {
    id: 3,
    link: "/services",
    icon: "/images/icons/panel.svg#category-icon",
    title: "خدمات",
  },
  {
    id: 4,
    link: "/account",
    icon: "/images/icons/panel.svg#category-icon",
    title: "حساب ها",
  },
  {
    id: 5,
    link: "/profile",
    icon: "images/icons/panel.svg#category-icon",
    title: "پروفایل",
  },

  // {
  //   id: 7,
  //   link: "/",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "حساب‌های بانکی",
  //   subMenu: [
  //     { title: "حساب‌ها", link: "/" },
  //     { title: "حساب‌های‌ بانکی مشتریان", link: "/" },
  //   ],
  // },

  // {
  //   id: 12,
  //   link: "/blogs",
  //   icon: "images/icons/panel.svg#category-icon",
  //   title: "وبلاگ",
  // },
];
const Aside = () => {
  const { role } = useUserRole();
  const [currentSection, setCurrentSection] = useState<{
    link: string;
    subMenu?: {
      title: string;
      link: string;
    };
  }>({
    link: menu[0]?.link,
  });

  useEffect(() => {
    setCurrentSection((prev) => {
      return {
        ...prev,
        link: window.location.pathname,
      };
    });
  }, [window.location.pathname]);

  return (
    <section className="group flex h-full flex-col bg-white pb-2">
      <div className="flex flex-col overflow-y-auto">
        {(role === "Admin" ? [...menu] : [...personnelMenu]).map((item, i) => (
          <div
            key={item.id}
            onClick={() =>
              setCurrentSection((prev) => {
                return {
                  ...prev,
                  link: item?.link,
                };
              })
            }
            className={`collapse shrink-0 relative custom-collapse-arrow !rounded-none !transition-all !duration-[450ms] bg-white focus:outline-0 outline-0 
${
  !item?.subMenu
    ? currentSection.link === item.link && "collapse-open"
    : item?.subMenu?.find(
        (prevItem) => prevItem?.link === currentSection.link
      ) && "collapse-open"
}`}
          >
            <div className="flex items-center relative custom-collapse-title mb-3 !py-4 px-4 cursor-pointer">
              <svg
                width="24"
                height="24"
                className="fill-black stroke-transparent"
              >
                <use href={item.icon}></use>
              </svg>
              <Link
                to={!item?.subMenu ? item?.link : "#"}
                className="text-black text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words"
              >
                {item.title}
              </Link>
              {item.subMenu ? (
                <svg
                  width="16"
                  height="16"
                  className="collapse-arrow relative fill-black stroke-transparent ms-3"
                >
                  <use href={"/images/icons/panel.svg#arrow-down"}></use>
                </svg>
              ) : null}
            </div>

            {item.subMenu ? (
              <div className="collapse-content p-0">
                {item.subMenu.map((child) => (
                  <Link
                    onClick={() =>
                      setCurrentSection((prev) => {
                        return {
                          ...prev,
                          subMenu: {
                            title: child?.title,
                            link: child?.link,
                          },
                        };
                      })
                    }
                    to={child.link}
                    key={child.title}
                    className="block m-4"
                  >
                    <p className="inline-block text-base leading-[1.5rem] font-medium text-black w-[10.25rem]">
                      {child.title}
                    </p>
                    {window.location.pathname === child?.link ? (
                      <span className="inline-block w-[0.375rem] h-[0.375rem] rounded-full bg-main-primary align-middle ms-3" />
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <span className="custom-divider-horizontal mt-2" />
      <Link
        to={"/setting"}
        className="flex items-center mt-6 p-4 cursor-pointer"
      >
        <span className="custom-divider-horizontal" />
        <div className="flex items-center mt-2 p-4 cursor-pointer">
          <svg
            width="24"
            height="24"
            className="relative fill-black stroke-transparent"
          >
            <use href={"images/icons/panel.svg#setting"}></use>
          </svg>
          <span className="text-black text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words">
            تنظیمات
          </span>
        </div>
      </Link>
      <div className="flex items-center p-4 cursor-pointer mt-3">
        <svg
          width="24"
          height="24"
          className="relative fill-danger-primary stroke-transparent"
        >
          <use href={"images/icons/panel.svg#logout"}></use>
        </svg>
        <div
          onClick={() => {
            document.cookie.split(";").forEach(function (c) {
              document.cookie =
                c.trim().split("=")[0] +
                "=;" +
                "expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            });
            window.location.href = frontUrl;
          }}
          className="text-danger-primary text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words"
        >
          خروج
        </div>
      </div>
    </section>
  );
};

export default Aside;

// import { useState } from "react";
// import { Link } from "react-router-dom";

// const menu = [
//   {
//     link: "/",
//     id: 1,
//     icon: "images/icons/panel.svg#category-icon",
//     title: "داشبورد",
//   },
//   {
//     link: "/",
//     id: 2,
//     icon: "images/icons/panel.svg#category-icon",
//     title: "نوبت‌ها",
//     subMenu: [
//       { title: "نوبت‌ها", link: "/" },
//       { title: "نوبت‌های فوری", link: "/" },
//       { title: "تعطیلی موقت", link: "/" },
//     ],
//   },
//   {
//     id: 3,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "خدمات",
//     subMenu: [
//       { title: "خدمات", link: "/services" },
//       { title: "پکیج‌ها", link: "/" },
//       { title: "لاین‌ها", link: "/" },
//     ],
//   },
//   {
//     id: 4,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "شعبات",
//   },
//   {
//     id: 5,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "مالی",
//     subMenu: [
//       { title: "حقوق و دستمزد", link: "/" },
//       { title: "تراکنش‌ها", link: "/" },
//       { title: "درخواست برداشت", link: "/" },
//     ],
//   },
//   {
//     id: 6,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "پرنسل",
//     subMenu: [
//       { title: "پرسنل", link: "/" },
//       { title: "مرخصی‌ها", link: "/" },
//     ],
//   },
//   {
//     id: 7,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "حساب‌های بانکی",
//     subMenu: [
//       { title: "حساب‌ها", link: "/" },
//       { title: "حساب‌های‌ بانکی مشتریان", link: "/" },
//     ],
//   },
//   {
//     id: 8,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "کاربران",
//     subMenu: [
//       { title: "کاربران", link: "/" },
//       { title: "دیدگاه‌ها", link: "/" },
//     ],
//   },
//   {
//     id: 9,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "پیامک‌ها",
//   },
//   {
//     id: 10,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "تخفیف‌ها",
//   },
//   {
//     id: 11,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "خرید و تمدید پنل",
//   },
//   {
//     id: 12,
//     link: "/blogs",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "وبلاگ",
//   },
//   {
//     id: 13,
//     link: "/",
//     icon: "images/icons/panel.svg#category-icon",
//     title: "استخدام",
//     subMenu: [
//       { title: "آگهی‌ها", link: "/" },
//       { title: "درخواست‌ها", link: "/" },
//     ],
//   },
// ];
// const Aside = () => {
//   const [currentSection, setCurrentSection] = useState(menu[0]?.id);
//   return (
//     <section className="group flex w-[16.25rem] min-h-[39rem] no-scrollbar overflow-y-scroll flex-col bg-white pt-[4.5rem] pb-[1.875rem]">
//       {menu.map((item, i) => (
//         <div
//           key={item.id}
//           // tabIndex={0}
//           onClick={() => setCurrentSection(item?.id)}
//           className={`relative collapse custom-collapse-arrow ${
//             currentSection === item?.id && "collapse-open"
//           } !rounded-none !transition-all !duration-[450ms] bg-white focus:outline-0 outline-0`}
//         >
//           <div className="flex items-center relative custom-collapse-title mb-3 !py-4 px-4 cursor-pointer">
//             <svg
//               width="24"
//               height="24"
//               className="fill-black stroke-transparent"
//             >
//               <use href={item.icon}></use>
//             </svg>
//             <span className="text-black text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words">
//               {item.subMenu ? (
//                 item.title
//               ) : (
//                 <Link to={item.link}>{item.title}</Link>
//               )}
//             </span>
//             {item.subMenu ? (
//               <svg
//                 width="16"
//                 height="16"
//                 className="collapse-arrow relative fill-black stroke-transparent ms-3"
//               >
//                 <use href={"images/icons/panel.svg#arrow-down"}></use>
//               </svg>
//             ) : null}
//           </div>

//           <div className="p-0">
//             {item?.subMenu?.map((child, index) => (
//               <Link to={child.link} key={child.title} className="p-4">
//                 <p className="inline-block text-base leading-[1.5rem] font-medium text-black mb-3 w-[10.25rem]">
//                   {child.title}{" "}
//                 </p>
//                 {window.location.href === child.link ? (
//                   <span className="inline-block w-[0.375rem] h-[0.375rem] rounded-full bg-main-primary align-middle ms-3" />
//                 ) : null}
//               </Link>
//             ))}
//           </div>
//         </div>
//       ))}
//       <span className="custom-divider-horizontal mt-[4.5rem]" />
//       <div className="flex items-center mt-6 p-4 cursor-pointer">
//         <svg
//           width="24"
//           height="24"
//           className="relative fill-black stroke-transparent"
//         >
//           <use href={"images/icons/panel.svg#setting"}></use>
//         </svg>
//         <span className="text-black text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words">
//           تنظیمات
//         </span>
//       </div>
//       <div className="flex items-center p-4 cursor-pointer mt-3">
//         <svg
//           width="24"
//           height="24"
//           className="relative fill-danger-primary stroke-transparent"
//         >
//           <use href={"images/icons/panel.svg#logout"}></use>
//         </svg>
//         <span className="text-danger-primary text-base leading-[1.5rem] font-medium ms-3 w-[10.25rem] break-words">
//           خروج
//         </span>
//       </div>
//     </section>
//   );
// };

// export default Aside;
