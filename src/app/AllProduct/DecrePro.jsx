"use cache";
import React from 'react';
import CardPage from '../component/Card';

const DecreasedProPage = async() => {
    const res =await fetch('https://openapi.programming-hero.com/api/bazardor/products')
    const data = await res.json()

    const filteredData= data
    .filter((i)=>i.change?.dir==="down")
    .sort((a,b)=>a.change.pct-b.change.pct)
    .slice(0,6)
    console.log(filteredData);
    

    return (
        <section className="py-4">
            <div className="container-width ">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#202b23]">
                    <span className="text-sm text-green-600">▼</span>
                    আজ দাম কমেছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        filteredData.map((item)=><CardPage key={item.id} item={item}></CardPage>)
                    }
                </div>
            </div>
        </section>
    );
};

export default DecreasedProPage;