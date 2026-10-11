"use cache";
import React from 'react';
import CardPage from '../component/Card';

const AllProductPage = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products')
    const data = await res.json()


    return (
        <section className="py-4">
            <div className="container-width ">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#202b23]">

                    সব পণ্য
                </h2>

                <p className='pb-6'>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        data.map((item)=><CardPage key={item.id} item={item}></CardPage>)
                    }
                </div>
            </div>
        </section>
    );
};

export default AllProductPage;