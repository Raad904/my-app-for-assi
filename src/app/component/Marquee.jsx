"use cache";
import React from 'react';

const MarqueePage = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    if(!res.ok){
        throw new Error("Failed to fetch products");
    }
    const data = await res.json()
    console.log(data,"marquee");
    
    return (
        <div>
            
        </div>
    );
};

export default MarqueePage;