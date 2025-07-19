import { Cell, Pie, PieChart} from "recharts";
import Button from "../../theme/Button";

export default function PanelDetails() {
    const data = [
        {
            "value": 31.47,

        },
        {
            "uv": 20,

        },
    ]
    return (
        <section className="relative w-full min-h-[51.688rem] p-6 mt-6 text-black">
            <p className="text-base font-semibold text-black mb-3">پنل‌های مدیریت (پنل برنز)</p>
            <p className="text-base  text-black/80 mb-6">بعد از مدت 1 سال شما باید هزینه هاست،دامنه و پشتیانی سایت را پرداخت کنید</p>
            <div className=" flex justify-between items-center px-6 bg-white rounded-xl h-24 mb-6 border border-gray-card-border ">
                <div>بدهی پایان دوره شما 500 هزار تومان می‌باشد</div>
                <div className="flex gap-x-4">
                    <Button className="bg-white text-main-primary border border-main-primary">پرداخت بدهی</Button>
                    <Button>ارتقا پنل</Button>
                </div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-card-border">
                <div className="flex justify-between w-full items-center mb-4">
                    <span className="text-lg font-semibold">مدت زمان باقی مانده از پنل</span>
                    <span className="block w-11 h-11 bg-gray-300 rounded-xl">
                        <svg
                            width="20"
                            height="20"
                            className="collapse-arrow relative fill-black stroke-transparent ms-3"
                        >
                            <use href={"images/icons/panel.svg#time"}></use>
                        </svg>
                    </span>
                </div>
                <div className="flex justify-between px-[6.25rem]">
                    <div className="flex flex-col items-center w-64">
                        <p className="mb-2">از پایان مدت دوره شما باید هزینه پشتیانی پرداخت کنید</p>
                        <div className="mb-6">
                            <PieChart width={240} height={118}>
                                <Pie
                                    data={data}
                                    cy={100}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={45}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    <Cell fill='#EB1086' />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="mb-4">
                            <div className="text-center text-xl font-semibold">
                                <span>365</span>
                                <span>روز</span>
                            </div>
                            <div className="bg-[#E4ECF7] h-0.5 w-[7.5rem] rounded-full my-3"></div>
                            <div className="text-center text-black/40 text-sm font-semibold">
                                <span>265</span>
                                <span>روز مانده</span>
                            </div>
                        </div>
                        <div className="flex rounded-lg border border-gray-card-border p-2">
                            <span className="whitespace-nowrap">مبلغ قابل پرداخت:</span>
                            <div className="text-lg font-semibold mr-4">
                                <span>5،000،000</span>
                                <span>تومان</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-64">
                        <p className="mb-2">از پایان مدت دوره شما باید هزینه هاست و دامنه پرداخت کنید</p>
                        <div className="mb-6">
                            <PieChart width={240} height={118}>
                                <Pie
                                    data={data}
                                    cy={100}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={45}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    <Cell fill='#EB1086' />
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="mb-4">
                            <div className="text-center text-xl font-semibold">
                                <span>365</span>
                                <span>روز</span>
                            </div>
                            <div className="bg-[#E4ECF7] h-0.5 w-[7.5rem] rounded-full my-3"></div>
                            <div className="text-center text-black/40 text-sm font-semibold">
                                <span>265</span>
                                <span>روز مانده</span>
                            </div>
                        </div>
                        <div className="flex rounded-lg border border-gray-card-border p-2">
                            <span className="whitespace-nowrap">مبلغ قابل پرداخت:</span>
                            <div className="text-lg font-semibold mr-4">
                                <span>5،000،000</span>
                                <span>تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
