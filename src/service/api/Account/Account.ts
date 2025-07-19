import { global } from "../../../@types";
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from "../../config/fetcher";

export interface GetAccountResponse {
    id: string
    userFirstName: string,
    userLastName: string,
    status: number
    accountId: string,
    bankName: string,
    isActive: boolean
    shabaNumber : string
}
export interface PostAccountResponse {
    Id?: string | null,
    UserId?: string,
    AccountId: string,
    BankName: string,
    IsActive: boolean
    shabaNumber: string
}

interface getAccountParams extends global.PaginationParams {
    isActive: string | null
}

export const getAccount = (
    params: getAccountParams
): global.GlobalResponse<GetAccountResponse[]> =>
    getFetcher(
        `api/accounts${params.index ? `?index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""}${params.value ? `&value=${params.value}` : ""}
        ${params.isActive === '1' ? `&IsActive=true` : params.isActive === '0' ? `&IsActive=false` : ''}`
    );
interface accountAcceptReject {
    id: string
}
export const accountAccept = (
    body: accountAcceptReject
) => {
    return putFetcher(`api/account/accept`, body);
};

export const accountReject = (
    body: accountAcceptReject
) => {
    return putFetcher(`api/account/reject`, body);
};

export const createAccount = (body: PostAccountResponse) => {
    return postFetcher(`api/accounts`, body);
};

export const deleteAccount = (id: string) => {
    return deleteFetcher(`api/account/delete?id=${id}`);
};