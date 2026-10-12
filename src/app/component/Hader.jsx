"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

const HaderPage = () => {
    const [formattedDate, setFormattedDate] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    const { data: session, isPending } = useSession();

    const user = session?.user;

    const userName = user?.name || "ব্যবহারকারী";
    const userEmail = user?.email || "";
    const profileImage = user?.image;
    const firstLetter = userName.trim().charAt(0).toUpperCase() || "U";

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

    const handleSignOut = async () => {
        try {
            const { error } = await signOut();

            if (error) {
                console.error("Sign out error:", error);
                return;
            }

            setMenuOpen(false);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container-width flex items-center justify-between py-2">
                {/* Logo and Date */}
                <div className="flex items-center gap-3">
                    <Link href="/" aria-label="বাজার দর হোম">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-200">
                            <Image
                                src="/image/logo-icon.png"
                                alt="বাজার দর লোগো"
                                width={22}
                                height={22}
                            />
                        </div>
                    </Link>

                    <div>
                        <Link href="/">
                            <h1 className="text-xl font-bold text-gray-900">
                                বাজার দর
                            </h1>
                        </Link>

                        <p className="text-xs text-gray-500">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {/* User Menu */}
                {isPending ? (
                    <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                ) : user ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setMenuOpen(false);
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            onFocus={() => setMenuOpen(true)}
                            aria-expanded={menuOpen}
                            aria-haspopup="true"
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {/* Profile Picture / First Letter */}
                            {profileImage ? (
                                <Image
                                    src={profileImage}
                                    alt={userName}
                                    width={36}
                                    height={36}
                                    unoptimized
                                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold uppercase text-white">
                                    {firstLetter}
                                </div>
                            )}

                            <span className="max-w-28 truncate text-sm font-medium text-gray-800">
                                {userName}
                            </span>

                            <svg
                                className={`h-3 w-3 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""
                                    }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.052z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`absolute right-0 top-full z-50 w-64 pt-2 ${menuOpen ? "block" : "hidden"
                                }`}
                        >
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                                {/* User Info */}
                                <div className="border-b border-gray-100 px-3 py-3">
                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {userName}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-gray-500">
                                        {userEmail}
                                    </p>
                                </div>

                                {/* Profile */}
                                <Link
                                    href="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M5 21v-2a7 7 0 0114 0v2" />
                                    </svg>

                                    আমার প্রোফাইল
                                </Link>

                                {/* Sign Out */}
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        aria-hidden="true"
                                    >
                                        <path d="M10 17l5-5-5-5" />
                                        <path d="M15 12H3" />
                                        <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
                                    </svg>

                                    সাইন আউট
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Not Signed In */
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Link
                            href="/sign-in"
                            className="text-sm font-medium text-gray-700 transition hover:text-green-600"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:px-5"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HaderPage;