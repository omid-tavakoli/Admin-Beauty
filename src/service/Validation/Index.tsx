import { z } from "zod";

export const numberPattern = /^[0-9۰-۹:]+$/;
export const pricePattern = /^(\d{1,3})(،\d{3})*$/;
export const phonePattern = /^09\d{9}$/;
const homePhonePattern = /^\d+-\d+$/;

export const initialValue = { id: "", title: "" };

export const initialValueTime = { hours: "", minutes: "" };

const enTitlePattern = /^[a-zA-Z0-9\s]+$/;
const persionTextPattern = /^[\u0600-\u06FF\s0-9]+$/;

export const initialDateValue = { day: 0, month: 0, year: 0 };

export const addLineValidation = z.object({
  title: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(persionTextPattern, {
      message: "فقط از اعداد و حروف فارسی استفاده کنید.",
    }),
  englishTitle: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(enTitlePattern, {
      message: "فقط امکان استفاده از اعداد و حروف انگلیسی می‌باشد",
    }),
  icon: z.string().min(1, { message: "آیکون  نباید خالی باشد" }),
});

export const addExpertValidation = z.object({
  startDate: z
    .object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    })
    .refine(
      (data) =>
        data.day !== initialDateValue.day ||
        data.month !== initialDateValue.month ||
        data.year !== initialDateValue.year,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
  selectBoxBranch: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .array()
    .min(1, "یک گزینه معتبر را انتخاب کنید."),
  firstname: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  lastname: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  address: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  nationalcode: z
    .string()
    .min(10, { message: "کد ملی باید ده رقم باشد" })
    .regex(numberPattern, {
      message: "فقط از اعداد استفاده کنید.",
    }),
  phonenumber: z
    .string()
    .min(11, { message: "شماره موبایل باید 11 رقم باشد" })
    .regex(phonePattern, {
      message: "شماره تلفن معتبر نمیباشد",
    }),
  salary: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(pricePattern, {
      message: "فقط از اعداد استفاده کنید.",
    }),
});
export const checkOut = z.object({
  price: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(pricePattern, {
      message: "فقط از اعداد استفاده کنید.",
    }),
  account: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
});

export const fieldPresent = z
  .string()
  .min(1, { message: "فیلد نباید خالی باشد" })
  .regex(numberPattern, {
    message: "فقط از اعداد استفاده کنید.",
  });

export const smsSingle = z.object({
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  phoneNumber: z
    .string()
    .min(11, { message: "شماره موبایل باید 11 رقم باشد" })
    .regex(phonePattern, {
      message: "شماره تلفن معتبر نمیباشد",
    })
    .max(11, {
      message: "شماره موبایل باید 11 رقم باشد",
    }),
});
export const smsPublic = z.object({
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});
export const checkoutModalValidations = z.object({
  deposit: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(pricePattern, {
      message: "فقط از اعداد استفاده کنید.",
    }),
});
const phoneRegex = /^(((98)|(\+98)|(0098)|0)(9){1}[0-9]{9})+$/;
export const phoneValidation = z
  .string()
  .regex(phoneRegex, "شماره تلفن معتبر نمیباشد");

export const addServiceValidation = z.object({
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  lines: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
  branch: z
    .object({
      id: z.string({ message: "sghl" }),
      title: z.string({ message: "سلام" }),
    })
    .array()
    .min(1, { message: "یک گزینه معتبر را انتخاب کنید" }),
  deposit: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(pricePattern, { message: "فقط عدد وارد کنید" }),
  time: z.string().min(1, { message: "تایم زمان خدمت را انتخاب کنید" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  discount: z
    .string()
    .regex(numberPattern, { message: "فقط عدد وارد کنید" })
    .optional()
    .or(z.literal('')),
  discountDescription: z.string().optional(),
  avatar: z.string().min(1, { message: "یک آیکون انتخاب کنید" }),
});

export const addTipValidation = z.object({
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});

export const addFaqValidation = z.object({
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  answer: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});
export const FooterValidationModal = z.object({
  title1: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description1: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  title2: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description2: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  title3: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description3: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  brandImages: z.string().min(1, { message: "فیلد نباید خالی باشد" }).array(),
});
export const HeadChangeModal = z.object({
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  instaId: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  instaTitle: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  image1: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  image2: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  image3: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  image4: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  isActive: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});
export const ManagementInfoModal = z.object({
  jobPosition: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  image: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});
export const IntroModal = z.object({
  instaLik: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  whatLink: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  telLink: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  video: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  name: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  titleDes: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});

export const addDiscount = z.object({
  discount: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(numberPattern, { message: "فقط عدد وارد کنید" }),

  discountDecs: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});

export const BlogDetailsValidate = z.object({
  titleBlog: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  shortDescription: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  avatar: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  line: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
  category: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
});

export const addBranchValidate = z.object({
  branchName: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  telNumber: z
    .string()
    .min(11, { message: "شماره تلفن باید 11 رقم باشد" })
    .regex(homePhonePattern, { message: "فرمت را درست وارد کنید" }),
  address: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
});

export const addDocumentValidation = z.object({
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  expert: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
  amount: z
    .string()
    .min(1, { message: "فیلد نباید خالی باشد" })
    .regex(pricePattern, { message: "فقط عدد وارد کنید" }),
});

export const AccountValidate = z.object({
  accountId: z
    .string()
    .min(16, { message: "باید فقط ۱۶ رقم وارد کنید" })
    .max(16, { message: "باید فقط ۱۶ رقم وارد کنید" })
    .regex(numberPattern, { message: "فقط عدد وارد کنید" }),
  shabaNumber: z
    .string()
    .min(24, { message: "باید ۲۴ رقم وارد کنید" })
    .max(24, { message: "باید ۲۴ رقم وارد کنید" })
    .regex(numberPattern, { message: "فقط عدد وارد کنید" }),
  bankName: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
});
export const addSeoTagsValidations = z.object({
  title: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  canonical: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  description: z.string().min(1, { message: "فیلد نباید خالی باشد" }),
  robots: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .refine(
      (data) =>
        data.id !== initialValue.id || data.title !== initialValue.title,
      {
        message: "یک گزینه معتبر را انتخاب کنید.",
        path: ["id"],
      }
    ),
});
