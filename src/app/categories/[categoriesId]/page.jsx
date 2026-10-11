
"use client";

import CardPage from "@/app/component/Card";
import React, { useEffect, useState } from "react";

const CategotisPage = ({ params }) => {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("default");
    const [categoriesId, setCategoriesId] = useState("");

    useEffect(() => {
        params.then((value) => setCategoriesId(value.categoriesId));
    }, [params]);

    useEffect(() => {
        if (!categoriesId) return;

        fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${categoriesId}`
        )
            .then((res) => res.json())
            .then((result) => setData(result));
    }, [categoriesId]);

    const sortedData = [...data];

    if (sort === "low") {
        sortedData.sort((a, b) => Number(a.today) - Number(b.today));
    }

    if (sort === "high") {
        sortedData.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return (
        <div className="min-h-screen bg-[#f0f5f0] py-6">
            <div className="container-width mx-auto px-4">
                <div className="flex items-center gap-3 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4">
                    <span className="text-3xl">
                        {data[0]?.image || "__"}
                    </span>

                    <div>
                        <h1 className="text-xl font-bold">
                            {data[0]?.categoryNameBn || "__"}
                        </h1>

                        <p className="text-xs text-gray-500">
                            {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-3">
                    <label htmlFor="sort" className="text-xs text-gray-500">
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-xs outline-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low">দাম: কম থেকে বেশি</option>
                        <option value="high">দাম: বেশি থেকে কম</option>
                    </select>
                </div>

                <p className="my-4 text-xs text-gray-500">
                    মোট {sortedData.length}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedData.map((item) => (
                        <CardPage key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategotisPage;
