"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from "@heroui/react";
import { signUp } from "@/lib/auth-client";


const SignUpPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        console.log("Form Data:", data);

       if (data.password !== data.confirmPassword) {
    alert("পাসওয়ার্ড দুটি মিলছে না!");
    return;
}

const { data: resData, error } = await signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
});

if (error) {
    alert(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    return;
}

alert("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
    };

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-10 text-[#202820] sm:py-14">
            <div className="mx-auto w-full max-w-md">
                {/* Heading */}
                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-[#69736b]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Signup Card */}
                <div className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfb] p-5 shadow-sm sm:p-6">
                    <Form
                        className="flex w-full flex-col gap-4"
                        onSubmit={onSubmit}
                    >
                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) =>
                                value.trim().length < 3
                                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                                    : null
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium">
                                নাম
                            </Label>

                            <Input
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) =>
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                                    ? null
                                    : "সঠিক ইমেইল ঠিকানা লিখুন"
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium">
                                ইমেইল
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            minLength={8}
                            onChange={setPassword}
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "অন্তত একটি বড় হাতের ইংরেজি অক্ষর দিন";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "অন্তত একটি সংখ্যা দিন";
                                }
                                return null;
                            }}
                            className="flex flex-col gap-1.5"
                        >
                            <Label>পাসওয়ার্ড</Label>
                            <Input placeholder="কমপক্ষে ৮ অক্ষর"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />
                            <FieldError />
                        </TextField>
                        {/* Confirm Password */}
                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                            onChange={setConfirmPassword}
                            validate={(value) =>
                                value !== password
                                    ? "পাসওয়ার্ড দুটি মিলছে না"
                                    : null
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input placeholder="আবার লিখুন"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />
                            <FieldError />
                        </TextField>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="mt-1 h-11 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-md transition hover:bg-[#067638]"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#dce3dc]" />
                        <span className="text-xs text-[#737c73]">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-[#dce3dc]" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            type="button"
                            variant="outline"
                            onPress={() =>
                                console.log("Google signup clicked")
                            }
                            className="h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent text-xs font-semibold text-[#303830] hover:bg-[#f0f5f0]"
                        >
                            <span className="text-base font-bold text-[#4285F4]">
                                G
                            </span>
                            Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onPress={() => console.log("GitHub signup clicked")}
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-transparent px-3 text-xs font-semibold text-[#303830] shadow-none transition hover:bg-[#f0f5f0]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 shrink-0"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.01 3.37 1.42.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                            </svg>

                            <span className="whitespace-nowrap">
                                GitHub দিয়ে চালিয়ে যান
                            </span>
                        </Button>
                    </div>

                    {/* Sign In */}
                    <p className="mt-5 text-center text-sm text-[#596359]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-[#078b43] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-[#778078] transition hover:text-[#078b43]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
