import TemporaryClosureModal from "../../components/TemporaryClosure/TemporaryClosureModal";
import { openModalHandler } from "../../service/utils/modalHandler";
import Button from "../../theme/Button";

export default function TemporaryClosure() {
    const deleteHandler = () => { }
    return (
        <div className="flex flex-col w-[calc(100%-26.875rem)]">
            <section className="flex justify-between items-center   py-4 px-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
                <p className="text-base font-semibold text-black ">تعطیلی موقت</p>
                <Button onClick={() => openModalHandler("temporaryclosure")}>افزودن</Button>
                <TemporaryClosureModal />
            </section>
            {/* {isLoading &&
                <div className="space-y-6">
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                    <div className="skeleton h-[4.875rem] flex justify-between items-center rounded-lg border border-gray-card-border p-4" />
                </div>
            } */}
            <section className="flex justify-between items-center   py-4 px-6 bg-white mt-6 rounded-lg border border-gray-card-border text-sm">
                <div className="flex text-black">
                    <span className="flex gap-x-1 ml-1">
                        <svg
                            width={'15px'}
                            height={'15px'}
                            className=''>
                            <use href='/images/icons/panel.svg#branch'></use>
                        </svg>
                        شعبه :
                    </span>
                    <span>تهرانپارس</span>
                </div>
                <div className="text-black/80 text-xs">
                    <span>
                        مدت تعطیلی شعبه:
                    </span>
                    <span className="mr-1">
                        1403/5/23 <span className="mx-1">الی</span> 1403/5/31
                    </span>
                </div>
                <Button className='w-9 h-9 !p-0 bg-red-50' onClick={deleteHandler}>
                    <svg
                        width={'20px'}
                        height={'20px'}
                        className=''>
                        <use href='/images/icons/panel.svg#delete'></use>
                    </svg>
                </Button>
            </section>
        </div>
    )
}
