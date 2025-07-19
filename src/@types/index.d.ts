import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import { AxiosResponse } from "axios";

namespace global {
  type GlobalResponse<D> = Promise<AxiosResponse<RestResponse<D>>> ;
  interface RestResponse<D> {
    errors?: {
      errorCode: string;
      message: string;
      propertyName: string;
    }[];
    message: string;
    isSuccess: boolean;
    code: number;
    entities?: D;
    entity?: D;
    index?: number;
    size?: number;
    totalCount?: number;
  }
  interface PaginationParams {
    index?: string;
    size?: string;
    value?: string;
    BrancheIds?: any[],
    From?: DayValue | undefined | string,
    To?: DayValue | undefined | string,
    BranchUserId?: string,
    ServiceIds?: any[]
    Step?: number
  }
  export interface CheckoutReserveParams {
    Id?: string;
    Fields?: any;
  }
  interface PaginationParams {
    index?: string;
    size?: string;
    value?: string;
    BrancheIds?: any[],
    From?: DayValue | undefined | string,
    To?: DayValue | undefined | string,
    BranchUserId?: string,
    ServiceIds?: any[]
    Step?: number
  }
  export interface CancelReserveParams {
    ReservationId?: string;
  }

  type HtmlInputProps =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;
}
