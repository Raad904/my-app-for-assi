
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const user = session?.user;
    const email = user?.email || "";
    const image = user?.image;
    const firstLetter = (user?.name || "U").trim().charAt(0).toUpperCase();

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user?.name]);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/sign-in");
        }
    }, [isPending, session, router]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const newName = name.trim();

        if (newName.length < 3) {
            toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
            return;
        }

        if (newName === user?.name) {
            toast.info("নামে কোনো পরিবর্তন করা হয়নি");
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.updateUser({
                name: newName,
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            await authClient.getSession();

            toast.success("নাম সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি");
                return;
            }

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        } finally {
            setSigningOut(false);
        }
    };

    if (isPending || !session) {
        return (
            <main className="min-h-screen bg-[#f1f6f1] px-4 py-10">
                <div className="mx-auto max-w-3xl animate-pulse">
                    <div className="mb-5 h-8 w-48 rounded bg-gray-200" />
                    <div className="h-28 rounded-2xl bg-white" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 text-[#202820] sm:py-10">
            <div className="mx-auto w-full max-w-3xl">

                {/* Heading */}
                <div className="mb-5">
                    <h1 className="text-2xl font-bold tracking-tight">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-[#69736b]">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Information */}
                <section className="flex flex-col gap-4 rounded-xl border border-[#dfe8df] bg-[#fbfcfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex min-w-0 items-center gap-3">
                        {image ? (
                            <Image
                                src={image}
                                alt={user.name || "Profile"}
                                width={60}
                                height={60}
                                unoptimized
                                className="h-[60px] w-[60px] shrink-0 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-green-700 text-2xl font-bold text-white">
                                {firstLetter}
                            </div>
                        )}

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold">
                                {user.name}
                            </h2>

                            <p className="mt-1 truncate text-sm text-[#69736b]">
                                {email}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        isDisabled={signingOut}
                        onPress={handleSignOut}
                        className="h-10 shrink-0 rounded-lg border border-red-300 px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        {signingOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
                    </Button>
                </section>

                {/* Update Profile */}
                <section className="mt-4 rounded-xl border border-[#dfe8df] bg-[#fbfcfb] p-4 sm:p-5">
                    <h2 className="mb-6 text-sm font-semibold">
                        তথ্য
                    </h2>

                    <Form
                        className="flex w-full flex-col gap-3 px-1 sm:px-3"
                        onSubmit={handleUpdate}
                    >
                        <TextField
                            name="name"
                            isRequired
                            value={name}
                            onChange={setName}
                            validate={(value) =>
                                value.trim().length < 3
                                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                                    : null
                            }
                            className="flex w-full flex-col gap-2"
                        >
                            <Label className="text-sm font-medium">
                                নাম
                            </Label>

                            <Input
                                placeholder="আপনার নাম লিখুন"
                                autoComplete="name"
                                className="h-11 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus-within:border-green-600"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <Button
                            type="submit"
                            isDisabled={loading || name.trim().length < 3}
                            className="mt-1 h-11 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-md transition hover:bg-[#067638]"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </Button>
                    </Form>
                </section>

            </div>
        </main>
    );
};

export default ProfilePage;
