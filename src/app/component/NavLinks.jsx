
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ data }) => {
    const pathname = usePathname();

    return (
        <>
            {data.map((i) => (
                <Link
                    key={i.id}
                    href={`/categories/${i.slug}`}
                    className={`flex shrink-0 items-center gap-2 text-sm font-medium transition ${
                        pathname === `/categories/${i.slug}`
                            ? "text-green-600"
                            : "text-gray-700 hover:text-green-600"
                    }`}
                >
                    <span className="text-base">{i.icon}</span>
                    <span>{i.nameBn}</span>
                </Link>
            ))}
        </>
    );
};

export default NavLinks;
