"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const HeroSectionPage = () => {
     const [formattedDate, setFormattedDate] = useState("");
    
        useEffect(() => {
            const today = new Date();
    
            const date = new Intl.DateTimeFormat("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(today);
    
            setFormattedDate(date);
        }, []);

    return (
        <section className=" px-4 py-1 sm:px-6">
            <div className=" container-width flex max-w-7xl items-center justify-between gap-6 overflow-hidden rounded-[22px] border border-[#e0e8e0] bg-[#fbfdfb] px-5 py-7 sm:px-8 md:py-9">
                
              
                <div className="max-w-2xl flex-1">
                    <span className="inline-block rounded-full bg-[#e3f3e9] px-3 py-1 text-xs font-medium text-[#168348]">
                         {formattedDate}
                    </span>

                    <h1 className="mt-3 text-2xl font-extrabold leading-tight text-[#202b23] sm:text-3xl md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, ট্রেন্ড, সর্বনিম্ন-সর্বোচ্চ
                        এবং দামের পরিবর্তন এক জায়গায়!
                    </p>

                    <div
                       
                        className="mt-5 inline-flex rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </div>
                </div>

          
                <div className="relative hidden h-40 w-48 shrink-0 sm:block md:h-48 md:w-56">
                    <Image
                        src="/image/bazar-hero.png"
                        alt="তাজা ফল ও সবজির ঝুড়ি"
                        fill
                        priority
                        sizes="(max-width: 768px) 192px, 224px"
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSectionPage;