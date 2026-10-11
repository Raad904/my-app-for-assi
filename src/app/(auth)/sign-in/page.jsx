"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";
import { toast } from "sonner";


import { signIn } from "@/lib/auth-client";



const SignInPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Allow only local paths to prevent external redirects
        const params = new URLSearchParams(window.location.search);
        const requestedURL = params.get("callbackURL");

        const callbackURL =
            requestedURL?.startsWith("/") &&
                !requestedURL.startsWith("//")
                ? requestedURL
                : "/";

        try {
            setLoading(true);

            const { error } = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(
                    error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            toast.custom(
                () => (
                    <div className="flex w-fit max-w-[90vw] items-center gap-2 whitespace-nowrap rounded-lg border border-[#c7e7ce] bg-[#f0faf2] px-3 py-2 shadow-md">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#078b43] text-white">
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                <path
                                    d="m5 12 4.5 4.5L19 7"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <p className="whitespace-nowrap text-xs font-semibold text-[#063c20]">
                            সফলভাবে সাইন ইন হয়েছে!
                        </p>
                    </div>
                ),
                {
                    duration: 2500,
                    position: "top-center",
                }
            );

            router.replace(callbackURL);
            router.refresh();
        } catch (error) {
            console.error("Sign In Error:", error);
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-10 text-[#202820] sm:py-14">
            <div className="mx-auto w-full max-w-md">

                {/* Heading */}
                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        সাইন ইন
                    </h1>

                    <p className="mt-2 text-sm text-[#69736b]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="rounded-2xl border border-[#dfe8df] bg-[#fbfcfb] p-5 shadow-sm sm:p-6">
                    <Form
                        className="flex w-full flex-col gap-4"
                        onSubmit={onSubmit}
                    >
                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
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
                                autoComplete="email"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            validate={(value) =>
                                value.length > 0
                                    ? null
                                    : "পাসওয়ার্ড লিখুন"
                            }
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                placeholder="আপনার পাসওয়ার্ড লিখুন"
                                autoComplete="current-password"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Forgot Password */}
                        <div className="-mt-1 flex w-full justify-end">
                            <div

                                className="text-xs font-medium text-[#078b43] hover:underline"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            isDisabled={loading}
                            className="mt-1 h-11 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-md transition hover:bg-[#067638]"
                        >
                            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
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
                            className="h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent text-xs font-semibold text-[#303830] hover:bg-[#f0f5f0]"
                        >
                            <span className="text-base font-bold text-[#4285F4]">
                                G
                            </span>
                            Google দিয়ে চালিয়ে যান
                        </Button>


                        <Button
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

                    {/* Sign Up */}
                    <p className="mt-5 text-center text-sm text-[#596359]">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-[#078b43] hover:underline"
                        >
                            অ্যাকাউন্ট তৈরি করুন
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

export default SignInPage;