"use cache"
export const instant = false;

import React from "react";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const MarqueePage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return (
     <MarqueeText direction="right" >
            <div className="overflow-hidden whitespace-nowrap py-3">
                <div className="flex gap-8">
                    {data.map((i) => (
                        <span
                            key={i.id}
                            className="inline-flex shrink-0 items-center gap-2 text-sm"
                        >
                            <span>{i.image}</span>

                            <span className="font-medium text-gray-800">
                                {i.nameBn}
                            </span>

                            <span className="font-bold text-gray-900">
                                {i.today} টাকা/কেজি
                            </span>

                            <span
                                className={
                                    i.change?.dir === "up"
                                        ? "font-semibold text-red-600"
                                        : "font-semibold text-green-600"
                                }
                            >
                                {i.change?.dir === "up" ? "▲" : "▼"}{" "}
                                {i.change?.pct ?? 0}%
                            </span>
                        </span>
                    ))}
                </div>
            </div>
         </MarqueeText>
    );
};

export default MarqueePage;