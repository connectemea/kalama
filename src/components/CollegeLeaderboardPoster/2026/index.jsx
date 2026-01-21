

import React from "react";
import {
    top_element,
    bottom_element,
    header
} from "@/assets/poster/2026/index.js";
import CollegeCard from './collegeCard';

function index({ data ,ResultCount}) {

    const rankedList = data.map((item, index) => ({
        ...item,
        rank: index + 1
    }));

    const top5Colleges = rankedList.slice(0, 5);

    return (
        <div className={`relative flex items-center flex-col max-w-[460px] mx-auto min-h-[360px]  overflow-hidden justify-between bg-white`}>

            <img src={top_element} alt="topElement" className='absolute left-0 top-0 right-0 z-10 w-full object-cover' />
            <img src={bottom_element} alt="bottomElement" className='absolute bottom-0 left-0 right-0 w-full object-cover' />

            <div className="flex justify-between flex-col h-full mx-[48px] p-4 pt-10 pb-0">
                <div className="flex-1">
                    <div className="flex items-center justify-center">
                        <img className="w-[250px] pt-0" src={header} alt="header" />
                    </div>
                    <div className='flex mb-4 mt-7 rounded-full text-sm items-center justify-center text-center  w-fit gap-1.5 mx-auto text-white font-semibold px-4 py-[3px]'
                    style={{
                        background: 'radial-gradient(50% 50% at 50% 50%, #0F4984 0%, #012161 100%)'
                    }}>
                        After<div className='bg-[#3592BA] rounded-sm px-[2px] text-shadow-xs'>{ResultCount}</div>Results
                    </div>
                    <div className="mt-3 mb-32 space-y-[5px] h-fit">
                        {top5Colleges.map((college, index) => (
                           <CollegeCard key={index} college={college} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default index;

