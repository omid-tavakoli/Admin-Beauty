import React, { useState } from "react";
import Modal from "../Modal";
import SelectBox from "../../theme/SelectBox";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayValue, utils } from "@hassanmojab/react-modern-calendar-datepicker"
import Input from '../../theme/Input';
import Button from '../../theme/Button';
import { openModalHandler } from "../../service/utils/modalHandler";
import AlertBox from '../AlertBox/AlertBox';

export default function TemporaryClosureModal() {
    interface vacationType {
        startDate: DayValue
        endDate: DayValue
    }
    const [vacation, setVacation] = useState<vacationType[]>([])
    const [startDate, setStartDate] = useState<DayValue>()
    const [endDate, setEndDate] = useState<DayValue>()
    const [error, setError] = useState('')
    const list = [
        { id: '1', title: "یزد" },
        { id: '2', title: "تهران" },
        { id: '3', title: "شیراز" },
        { id: '4', title: "اصفهان" },
        { id: '5', title: "تبریز" },
    ];
    const [selectedLine, setSelectedLine] = useState<{
        id: string;
        title: string;
    }>({
        id: '0',
        title: "انتخاب شعبه",
    });
    const deleteHandler = (index: number) => {
        const copyVacation = [...vacation]
        copyVacation.splice(index, 1)
        setVacation(copyVacation)
    }
    const addHandler = () => {
        if (startDate?.day != undefined && endDate?.day != undefined) {
            if (startDate.year <= endDate.year && startDate.month <= endDate.month && startDate.day <= endDate.day) {
                setVacation(pre => [...pre, {
                    startDate: startDate,
                    endDate: endDate
                }])
                setStartDate(null)
                setEndDate(null)
                setError('')
            }else{
                setError('تاریخ شروع نباید دیر تر از تاریخ پایان باشد')
            }
        } else {
            setError('فیلد های تاریخ نباید خالی باشد')
        }
    }
    const submitHandler = () => {
            openModalHandler("tcModal");
    }
    return (
        <Modal
            id={"temporaryclosure"}
            title="تعطیلی موقت"
            clickHandler={submitHandler}
            textPrimaryBtn='لغو'
            textSecondaryBtn='ثبت'
            classPrimaryBtn='bg-white border border-main-primary text-main-primary'
            classSecondaryBtn=''
        >
            <div className='text-xs'>
                <SelectBox
                    list={list}
                    onSelect={setSelectedLine}
                    selectedItem={selectedLine}
                    wrapperClassName="!w-[240px] mb-6"
                    byCheckBox
                    placeHolder="placeHolder"
                />
                <div className='relative border border-gray-card-border rounded-lg pt-5 pb-2.5 px-4'>
                    <span className='absolute -top-2 bg-white px-1'>مدت تعطیلی شعبه</span>
                    <div className='flex gap-x-12 items-end mb-2.5'>
                        <DatePicker
                            value={startDate}
                            onChange={e => setStartDate(e)}
                            // minimumDate={utils().getToday()}
                            locale="fa"
                            renderInput={({ ref }) => (
                                <Input
                                    inputClassName='!h-9'
                                    ref={ref as any}
                                    inputProps={
                                        {
                                            readOnly: true,
                                            value: startDate ? `${startDate?.year}-${startDate?.month}-${startDate?.day}` : ''
                                        }
                                    }
                                    label="از" wrapperClassName="w-32 text-sm" />
                            )}
                            calendarPopperPosition='top'
                            inputPlaceholder="انتخاب تاریخ"
                            colorPrimary="#eb1086"
                        />
                        <DatePicker
                            value={endDate}
                            onChange={e => setEndDate(e)}

                            locale="fa"
                            renderInput={({ ref }) => (
                                <Input
                                    inputClassName='!h-9'
                                    ref={ref as any}
                                    inputProps={
                                        {
                                            readOnly: true,
                                            value: endDate ? `${endDate?.year}-${endDate?.month}-${endDate?.day}` : ''
                                        }
                                    }
                                    label="تا" wrapperClassName="w-32 text-sm" />
                            )}
                            calendarPopperPosition='top'
                            inputPlaceholder="انتخاب تاریخ"
                            colorPrimary="#eb1086"
                        />
                        <Button className='w-9 h-9 !p-0' onClick={addHandler}>
                            <svg
                                width={'24px'}
                                height={'24px'}
                                className=''>
                                <use href='/images/icons/panel.svg#plus'></use>
                            </svg>
                        </Button>
                    </div>
                    <span className='text-red-600'>{error}</span>
                    {vacation?.map((vacationDate, i) => (
                        <div key={i} className='flex gap-x-12 items-end text-sm mb-2'>
                            <div className='flex justify-center w-[19rem] rounded-lg bg-black/[4%] py-2'>{vacationDate.startDate?.year}/{vacationDate.startDate?.month}/{vacationDate.startDate?.day}<span className='mx-1.5'>الی</span>{vacationDate.endDate?.year}/{vacationDate.endDate?.month}/{vacationDate.endDate?.day}</div>
                            <Button className='w-9 h-9 !p-0 bg-white border border-main-primary' onClick={(e) => deleteHandler(i)}>
                                <svg
                                    width={'24px'}
                                    height={'24px'}
                                    className=''>
                                    <use href='/images/icons/panel.svg#delete24'></use>
                                </svg>
                            </Button>
                        </div>
                    ))
                    }
                </div>
            </div>
            <AlertBox id="tcModal" status="success" title="test" text='test' />
        </Modal>
    )
}
