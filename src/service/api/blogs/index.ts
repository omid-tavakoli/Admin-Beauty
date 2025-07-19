import { global } from '../../../@types';
import { getFetcher } from '../../config/fetcher';

export interface getDataBlogs {
    id?: string;
    title: string | null;
    englishTitle: string | null;
    icon: string | null;
    isActive: boolean;
  }
export const getDataBlogs = (
    params: global.PaginationParams
  ): global.GlobalResponse<getDataBlogs[]> =>
    getFetcher(
      `api/posts?index=${params.index}&size=${params.size}${
        params.value ? `&value=${params.value}` : ""
      }`
    );
  