import { useEffect, useState } from "react";
import ExpertLayout from "../../../components/Expert/ExpertLayout";
import SelectBox, { ListItem } from "../../../theme/SelectBox";
import Button from "../../../theme/Button";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/effect-fade";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IconInput from "../../../theme/IconInput/IconInput";
import {
  getFilterByBranchId,
  getServicePersonnel,
  putService,
} from "../../../service/api/Expert";
import { fieldPresent } from "../../../service/Validation/Index";
import { z } from "zod";
import { useGet, useMutate } from "../../../hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../../../utils/ToastContext";

export default function NewService() {
  interface Service {
    id: string | undefined;
    svg: string | undefined;
    title: string | undefined;
    present: string | undefined;
    line: string;
    serviceList: { id: string, title: string; };
  }
  const { addToast } = useToast()
  const { mutate: putServicePersonnel, isPending: putServicePersonalLoading } = useMutate(putService);
  const navigate = useNavigate();
  const [present, setPresent] = useState("");
  const [error, setError] = useState("");
  const [errorService, setErrorService] = useState("");
  const [service, setService] = useState<Service[]>([]);
  const [selectedLine, setSelectedLine] = useState<{ id: string; title: string; }>({ id: '', title: '' });
  const [selectedService, setSelectedService] = useState<{ id: string, title: string; }>({ id: '', title: '' });
  const [params] = useSearchParams();
  const idUser = params.get("ui");
  let [searchParams] = useSearchParams();
  const getPage = searchParams.get("page") ?? "1";
  const [page, setPage] = useState("1");
  const [statusEdit, setStatusEdit] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: dataFilterByBranchId, refetch: refetchFilterByBranchId } = useGet(getFilterByBranchId, ["getFilterByBranchId"], { enabled: true });
  const LineAndService = dataFilterByBranchId?.data?.entity;
  const listLineApi = Object.keys(LineAndService ?? []);
  const listServiceApi: ListItem[] = LineAndService?.[selectedLine.title]?.map((key, i) => ({
    id: key.id.toString(),
    title: key.title,
  })) ?? [];

  const { data: ServicePersonnel } = useGet(getServicePersonnel, ["getServicePersonnel"], { enabled: !!idUser }, { index: page, size: "50", branchuserid: idUser });

  useEffect(() => {
    setPage(isNaN(+getPage) ? "1" : getPage);
    setTimeout(() => {
      refetchFilterByBranchId();
    }, 2);
  }, [getPage]);

  useEffect(() => {
    if (ServicePersonnel?.data?.entity) {
      setService(ServicePersonnel.data.entity.map(item => ({
        id: item.id,
        title: item.title,
        svg: item.icon,
        present: item.percentOfCommission,
        line: item.categoryTitle,
        serviceList: { id: item.id, title: item.title },
      })));
    }
  }, [ServicePersonnel]);

  const countPresent = (e: number) => {
    let presentStr = Number(present);
    let sum = presentStr + e;
    setPresent(sum.toString());
  };

  const setStatePresent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    try {
      fieldPresent.parse(value);
      setError("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message);
      }
    }
    setPresent(value);
  };

  const submitService = () => {
    let selectedIcon = LineAndService?.[selectedLine.title];
    let icon = selectedIcon?.filter((item) => item.id == selectedService.id);

    if (selectedService.title && present && LineAndService) {
      if (statusEdit) {
        const updatedService = service.map(item =>
          item.id === editingId
            ? {
              ...item,
              title: selectedService.title,
              present: present,
              line: selectedLine.title,
              svg: icon?.[0]?.iconAddress ?? item.svg,
              serviceList: { id: selectedService.id, title: selectedService.title }
            }
            : item
        );
        setErrorService("");
        setService(updatedService);
        setStatusEdit(false);
        setEditingId(null);
      } else {
        if (!service.some((srv) => selectedService.title === srv.title)) {
          setService((prev) => [
            ...prev,
            {
              id: selectedService.id,
              svg: icon?.[0]?.iconAddress ?? '',
              title: selectedService.title,
              present: present,
              line: selectedLine.title,
              serviceList: { id: selectedService.id, title: selectedService.title }
            },
          ]);
          setErrorService("");
        } else {
          setErrorService("خدمت نکراری وارد نکنید");
        }
      }
    } else {
      setErrorService("تمام فیلد هارو پر کنید");
    }

    setSelectedLine({ id: "", title: "" });
    setSelectedService({ id: "", title: "" });
    setPresent("");
  };

  const deleteHandler = (index: number) => {
    const copyService = [...(service ?? [])];
    copyService.splice(index, 1);
    setService(copyService);
  };

  const editHandler = (id: string) => {
    const item = service.find((data) => data.id === id);
    if (item) {
      setSelectedLine({ id: item.id ?? '', title: item.line });
      setSelectedService(item.serviceList);
      setPresent(item.present ?? '0');
      setStatusEdit(true);
      setEditingId(id);
    }
  };

  const addServicePersonnel = () => {
    if (service.length) {
      setErrorService("");
      service?.map((item) =>
        putServicePersonnel(
          {
            PercentOfCommission: Number(item.present ?? "0"),
            ServiceId: item.id ?? "",
            SalonUserId: idUser ?? "",
          },
          {
            onError: () => {
              addToast("ثبت خدمت برای کارشناس با مشکل روبرو شد" , "error")
            },
            onSuccess: () => {
              navigate(`/expert/salary?ui=${idUser}`);
            },
          }
        )
      );
    } else {
      setErrorService("فیلد ها را وارد کنید");
    }
  };
  return (
    <ExpertLayout wrapperClassName="h-[34.563rem]" step={2}>
      <div className="flex flex-col gap-y-2 border-b border-gray-card-border">
        <div className="flex gap-x-6 justify-between items-end pb-6">
          <div className="w-full">
            <SelectBox
              list={listLineApi.map((key, i) => ({
                id: 1 + i.toString(),
                title: key,
              }))}
              placeHolder="انتخاب لاین"
              selectedItem={selectedLine}
              onSelect={setSelectedLine}
              byCheckBox
            />
          </div>
          <div className="w-full">
            <SelectBox
              placeHolder="انتخاب خدمت"
              list={listServiceApi ?? []}
              selectedItem={selectedService}
              onSelect={setSelectedService}
              byCheckBox
            />
          </div>
          <div className="relative w-full">
            <IconInput
              inputProps={{
                maxLength : 3,
                className: "text-end pr-6",
                value: present,
                onChange: (e) => setStatePresent(e),
                name: "present",
              }}
              itemChildren={"%"}
              itemPosition="left"
              label="درصد دریافتی"
              border="true"
            />
            {error && (
              <span className="absolute -bottom-5 text-main-primary text-xs">
                {error}
              </span>
            )}
            <div className="absolute bottom-2 right-4">
              <span>
                <svg
                  onClick={() => countPresent(1)}
                  className="mb-1"
                  width={10}
                  height={10}
                >
                  <use href="/images/icons/addService.svg#arrow-up"></use>
                </svg>
                <svg
                  onClick={() => countPresent(-1)}
                  width={10}
                  height={10}
                  className="rotate-180 translate-x-[2px]"
                >
                  <use href="/images/icons/addService.svg#arrow-up"></use>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <Button onClick={submitService}>ثبت خدمت</Button>
          </div>
        </div>
        <div>
          <span className="block text-sm text-main-primary mb-2">
            {errorService}
          </span>
        </div>
      </div>
      <div>
        <div className="text-xs mt-6">خدمات افزوده شده</div>
        <Swiper
          className="mt-6"
          modules={[FreeMode]}
          freeMode
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            1090: {
              slidesPerView: 2.5,
            },
            1370: {
              slidesPerView: 3.5,
            },
            1650: {
              slidesPerView: 4.5,
            },
          }}
        >
          {service?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-20 border border-gray-card-border rounded-lg p-3">
                <div>
                  <span className="w-12 h-12 flex items-center justify-center">
                    <svg width={26} height={40}>
                      <use href={`/images/icons/lines.svg#${item.svg}`}></use>
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col gap-y-3 border-r border-gray-card-border pr-3">
                  <span className="text-sm font-semibold">{item.title}</span>
                  <div className="flex items-center gap-x-3">
                    <div className="text-black/60 border border-gray-card-border rounded-full px-2 py-0.5 text-[10px] leading-4">
                      <span>دریافتی:</span>
                      <span>{item.present}%</span>
                    </div>
                    <span
                      className="flex items-center justify-center bg-main-secondary w-6 h-6 rounded-lg cursor-pointer"
                      onClick={() => deleteHandler(i)}
                    >
                      <svg width={16} height={16}>
                        <use href={"/images/icons/panel.svg#delete16"}></use>
                      </svg>
                    </span>
                    <span
                      className="flex items-center justify-center bg-yellow-secondary w-6 h-6 rounded-lg cursor-pointer"
                      onClick={() => editHandler(item.id ?? '')}
                    >
                      <svg width={16} height={16}>
                        <use href={"/images/icons/panel.svg#edit16"}></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute bottom-6 left-6">
        <Button
          onClick={addServicePersonnel}
          disabled={putServicePersonalLoading}
        >
          {putServicePersonalLoading ? (
            <span className="loading loading-spinner loading-sm mx-3"></span>
          ) : (
            "ثبت اطلاعات"
          )}
        </Button>
      </div>
    </ExpertLayout>
  );
}
