"use cache";
import React from 'react';

const IncreasedProPage = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const data = await res.json()
    console.log(data, "Increased");

    const filteredData = data
        .filter((i) => i.change?.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6)
    console.log(filteredData, "filtaredData");


    return (
        <section className="py-4">
            <div className="container-width ">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#202b23]">
                    <span className="text-sm text-red-600">▲</span>
                    আজ দাম বেড়েছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((item) => (
                        <div
                            key={item.id}
                           className="cursor-pointer rounded-[18px] border border-[#dfe7df] bg-[#fbfdfb] p-4 transition-all duration-300 ease-out active:scale-95 hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.55),0_0_60px_rgba(239,68,68,0.35)]"
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

                                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2.5 py-1 text-xs font-semibold text-red-600">
                                    ▲ {item.change.pct.toLocaleString("bn-BD")}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IncreasedProPage;