"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HaderPage = () => {
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
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container-width flex items-center justify-between">


                <div className="flex items-center gap-3">

                    <Link href={"/"}>
                        <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                            <Image
                                src="/image/logo-icon.png"
                                alt="logo-icon"
                                width={22}
                                height={22}
                            />
                        </div>


                    </Link>
                        <div>
                            <Link href={"/"}>
                            <h1 className="text-xl font-bold text-gray-900">
                                বাজার দর
                            </h1>
                            </Link>
                    <p className="text-xs text-gray-500">
                        {formattedDate}
                    </p>
                </div>
            </div>


            <div className="flex items-center gap-6">
                <Link href="/sign-in">
                <button className="text-sm font-medium text-gray-700 hover:text-green-600">
                    সাইন ইন
                </button>
                </Link>
                <Link href="/sign-up">
                <button className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-700 transition">
                    সাইন আপ
                </button>
                </Link>
            </div>

        </div>
        </header >
    );
};

export default HaderPage;