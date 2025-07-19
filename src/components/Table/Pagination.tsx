import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IProps {
  index?: number;
  size?: number;
  totalCount?: number;
  WrapperClassName?: string;
}
const Pagination: FC<IProps> = (props) => {
  const { index, size, totalCount } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<
    { startPages: number[]; endPages: number[] } | undefined
  >(undefined);
  const pageParams = +(searchParams.get("page") ?? 1);
  const checkPageParams = isNaN(pageParams) ? 1 : pageParams;
  const pages = Math.ceil(totalCount && size ? totalCount / size : 0);
  useEffect(() => {
    let firstPageNumber = [1, 2, 3, 4, 5];
    let endPageNumber = [];
    for (let i = pages - 3; i <= pages; i++) endPageNumber.push(i);
    setPagination({
      startPages: firstPageNumber,
      endPages: endPageNumber,
    });
  }, [pages]);

  if (index && size && totalCount) {
    const handlePageClick = (page: number) => {
      const getStartPageIndex = pagination?.startPages.findIndex(
        (index) => page === index
      );
      const getEndPageIndex = pagination?.endPages.findIndex(
        (index) => page === index
      );

      if (getStartPageIndex !== -1 || getEndPageIndex !== -1)
        setPagination((pre) => {
          if (getStartPageIndex !== -1 && getEndPageIndex === -1) {
            if (getStartPageIndex === 0 && page !== 1) {
              pre?.startPages.pop();
              pre?.startPages.unshift(page - 1);
            }
            if (
              getStartPageIndex ===
              (pagination?.startPages?.length ?? 0) - 1
            ) {
              if (!pre?.endPages.includes(page + 1)) {
                pre?.startPages.shift();
                pre?.startPages?.push(page + 1);
              }
            }
          }
          if (getEndPageIndex !== -1 && getStartPageIndex === -1) {
            const lastNumberEndPage = (pagination?.endPages?.length ?? 0) - 1;
            if (getEndPageIndex === 0 && page !== 1) {
              if (!pre?.startPages.includes(page - 1)) {
                pre?.endPages.pop();
                pre?.endPages.unshift(page - 1);
              }
            }
            if (getEndPageIndex === lastNumberEndPage && page !== pages) {
              pre?.endPages.shift();
              pre?.endPages?.push(page + 1);
            }
          }
          return pre;
        });

      setSearchParams((params) => {
        params.set("page", page?.toString());
        return params;
      });
    };

    return (
      <div
        className={`w-full flex items-center justify-center gap-x-4 ${props?.WrapperClassName}`}
      >
        {pageParams !== 1 && (
          <span
            className={`circle `}
            onClick={() => handlePageClick(pageParams - 1)}
          >
            <svg
              width="20"
              height="20"
              className="relative fill-black stroke-transparent"
            >
              <use href={"images/icons/panel.svg#arrow-right"}></use>
            </svg>
          </span>
        )}
        {pages <= 10 &&
          new Array(pages).fill("").map((item, i) => (
            <>
              <span
                onClick={() => handlePageClick(i + 1)}
                className={`circle ${
                  checkPageParams === i + 1 && "border-main-primary"
                } text-black text-[0.875rem] flex items-center justify-center leading-[1.313rem] font-medium pb-2 cursor-pointer`}
              >
                {i + 1}
              </span>
            </>
          ))}

        {pages > 10 && (
          <>
            {pagination?.startPages?.map((item, i) => (
              <>
                <span
                  onClick={() => handlePageClick(item)}
                  className={`circle ${
                    checkPageParams === item && "border-main-primary"
                  } text-black text-xs leading-[1.313rem] flex items-center justify-center font-medium pb-2 cursor-pointer`}
                >
                  {item}
                </span>
              </>
            ))}
            {(pagination?.endPages[(pagination?.endPages?.length ?? 0) - 1] ??
              -1) > 9 && (
              <span
                className={`circle  text-black text-xs leading-[1.313rem] flex items-center justify-center font-medium pb-2 cursor-pointer`}
              >
                ...
              </span>
            )}
            {pagination?.endPages?.map((item, i) => (
              <>
                <span
                  onClick={() => handlePageClick(item)}
                  className={`circle ${
                    checkPageParams === item && "border-main-primary"
                  } text-black text-xs leading-[1.313rem] flex items-center justify-center font-medium pb-2 cursor-pointer`}
                >
                  {item}
                </span>
              </>
            ))}
          </>
        )}

        {pageParams < pages && (
          <span
            className="circle"
            onClick={() => handlePageClick(pageParams + 1)}
          >
            <svg
              width="20"
              height="20"
              className="relative fill-black stroke-transparent rotate-180"
            >
              <use href={"images/icons/panel.svg#arrow-right"}></use>
            </svg>
          </span>
        )}
      </div>
    );
  } else return <></>;
};

export default Pagination;
