
"use cache";

import React from "react";
import { Suspense } from "react";
import NavLinks from "./NavLinks";

const NavBarPage = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return (
        <nav className="sticky top-[40px] z-40 border-y border-gray-200 bg-white">
            <div className="container-width mx-auto flex items-center gap-5 overflow-x-auto py-3">
                <Suspense fallback={<div className="py-3" />}>
                    <NavLinks data={data} />
                </Suspense>
            </div>
        </nav>
    );
};

export default NavBarPage;
