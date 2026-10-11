import Link from 'next/link';
import React from 'react';

const CardPage = ({ item }) => {
    return (
        <Link href={`/AllProduct/${item.id}`}>
            <div
                className={`cursor-pointer rounded-[18px] border border-[#dfe7df] bg-[#fbfdfb] p-4 transition-all duration-300 ease-out active:scale-95 hover:-translate-y-1 ${item.change?.dir === "up"
                    ? "hover:border-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.55),0_0_60px_rgba(239,68,68,0.35)]"
                    : item.change?.dir === "flat"
                        ? "hover:border-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.55),0_0_60px_rgba(255,255,255,0.7)]"
                        : "hover:border-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.55),0_0_60px_rgba(34,197,94,0.35)]"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#f0f5f0] text-2xl">
                        {item.image}
                    </div>

                    <div>
                        <h3 className="font-bold text-[#202b23]">
                            {item.nameBn}
                        </h3>

                        <p className="text-xs text-gray-500">
                            {item.unit || "প্রতি কেজি"}
                        </p>
                    </div>
                </div>


                <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                        <p className="text-xs text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#202b23]">
                            {item.today} টাকা
                        </p>
                    </div>


                    <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.change?.dir === "up"
                                ? "bg-red-50 text-red-600"
                                : item.change?.dir === "flat"
                                    ? "bg-blue-50 text-blue-500"
                                    : "bg-[#f0f5f0] text-green-600"
                            }`}
                    >
                        {item.change?.dir === "flat"
                            ? "--"
                            : item.change?.dir === "up"
                                ? "▲"
                                : "▼"}{" "}
                        {item.change?.pct?.toLocaleString("bn-BD")}%
                    </span>

                </div>
            </div>
        </Link>
    )
}

export default CardPage;