
export const instant = false;

import React from "react";

const DetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }

    const data = await res.json();
    const markets = data.markets || [];

    const difference = data.today - data.yesterday;

    return (
        <main className="min-h-screen bg-[#f0f5f0] py-5">
            <div className="container-width mx-auto space-y-4 px-4">

                {/* Product Header */}
                <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#dfe7df] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                            {data.image}
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-[#202a23]">
                                {data.nameBn}
                            </h1>

                            <p className="mt-1 text-xs text-gray-500">
                                {data.categoryNameBn} · প্রতি {data.unit === "kg" ? "কেজি" : data.unit}
                            </p>

                            <p className="mt-2 text-xs text-gray-700">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className={difference > 0 ? "text-red-600" : difference < 0 ? "text-green-600" : "text-blue-500"}>
                                    {difference > 0 ? "বেড়েছে" : difference < 0 ? "কমেছে" : "অপরিবর্তিত"}
                                </span>
                                {" · "}
                                {Math.abs(difference).toLocaleString("bn-BD")} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:min-w-24">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-2xl font-bold text-[#202a23]">
                            {data.today?.toLocaleString("bn-BD")}
                        </p>
                        <p className="text-[11px] text-gray-500">
                            টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
                        </p>

                        <p className={`mt-1 text-xs font-semibold ${data.change?.dir === "up" ? "text-red-600" : data.change?.dir === "down" ? "text-green-600" : "text-blue-500"}`}>
                            {data.change?.dir === "up" ? "▲" : data.change?.dir === "down" ? "▼" : "--"}{" "}
                            {data.change?.pct?.toLocaleString("bn-BD")}%
                        </p>
                    </div>
                </section>

                {/* Price Summary */}
                <section className="rounded-xl border border-[#dfe7df] bg-[#fbfdfb] p-4">
                    <h2 className="mb-3 text-sm font-bold text-[#202a23]">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#e3eae3] p-3.5">
                            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                            <p className="mt-1 text-lg font-bold text-green-600">
                                {Math.min(...markets.map((m) => m.min)).toLocaleString("bn-BD")} <span className="text-xs font-normal">টাকা</span>
                            </p>
                            <p className="text-[10px] text-gray-500">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e3eae3] p-3.5">
                            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
                            <p className="mt-1 text-lg font-bold text-red-600">
                                {Math.max(...markets.map((m) => m.max)).toLocaleString("bn-BD")} <span className="text-xs font-normal">টাকা</span>
                            </p>
                            <p className="text-[10px] text-gray-500">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e3eae3] p-3.5">
                            <p className="text-xs text-gray-500">গড় দাম</p>
                            <p className="mt-1 text-lg font-bold text-green-600">
                                {Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length).toLocaleString("bn-BD")} <span className="text-xs font-normal">টাকা</span>
                            </p>
                            <p className="text-[10px] text-gray-500">
                                প্রতি {data.unit === "kg" ? "কেজি" : data.unit}-এর হিসাবে
                            </p>
                        </div>
                    </div>

                    {/* Market Table */}
                    <h2 className="mb-3 mt-5 text-sm font-bold text-[#202a23]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-[#e3eae3]">
                        <table className="w-full min-w-[520px] text-left text-xs">
                            <thead className="bg-[#f8faf8] text-gray-500">
                                <tr>
                                    <th className="px-3 py-3 font-semibold">বাজার</th>
                                    <th className="px-3 py-3 font-semibold">বিভাগ</th>
                                    <th className="px-3 py-3 text-right font-semibold">সর্বনিম্ন</th>
                                    <th className="px-3 py-3 text-right font-semibold">সর্বোচ্চ</th>
                                    <th className="px-3 py-3 text-right font-semibold">গড়</th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className="border-t border-[#dfe7df] even:bg-[#f0f5f0] hover:bg-[#e8f0e8]"
                                    >
                                        <td className="px-3 py-3">{market.market}</td>
                                        <td className="px-3 py-3">{market.division}</td>
                                        <td className="px-3 py-3 text-right">
                                            {market.min.toLocaleString("bn-BD")} টাকা
                                        </td>
                                        <td className="px-3 py-3 text-right">
                                            {market.max.toLocaleString("bn-BD")} টাকা
                                        </td>
                                        <td className="px-3 py-3 text-right font-semibold">
                                            {((market.min + market.max) / 2).toLocaleString("bn-BD", {
                                                maximumFractionDigits: 2,
                                            })} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default DetailsPage;
