"use cache";

import Link from "next/link";
import React from "react";

const NavBarPage = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return (
        <nav className="border-y border-gray-200 bg-white">
            <div className="container-width mx-auto flex items-center gap-5 overflow-x-auto py-3">
                {data.map((i) => (
                    <Link
                        key={i.id}
                        href={`/${i.slug}`}
                        className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-green-600"
                    >
                        <span className="text-base">
                            {i.icon}
                        </span>

                        <span>{i.nameBn}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBarPage;