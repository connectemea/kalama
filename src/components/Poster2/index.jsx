

import React from "react";
import {
    first_bg,
    second_bg,
    third_bg,
    aikm,
    bottomElement,
    bottomElementOnstage,
    CreatorLogo,
    KalamaLogo,
    Kalaulsavm,
    resultTxt,
    resultTxtOnstage,
    rightElement,
    rightElementOnstage,
    sponserLogo,
    topElement,
    topElementOnstage,
    leaderboard,
    left_element,
    right_element
} from "@/assets/poster/index.js";
import classNames from 'classnames';
import CollegeCard from './collegeCard';

function index({ data ,ResultCount}) {

    // console.log(data);

    const rankedList = data.map((item, index) => ({
        ...item,
        rank: index + 1
    }));

    const top5Colleges = rankedList.slice(0, 5);

    // console.log(data)
    const BgRank = ({ color }) => (
        <svg width="60" height="68" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_178_535)">
                <mask id="mask0_178_535" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="47" height="48">
                    <path d="M47 0H0V48H47V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_178_535)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.32508 24.1013C1.95468 24.582 0.167851 26.718 0.167851 29.28L0.16785 42.72C0.16785 45.636 2.48254 48 5.33786 48H18.4979C21.0654 48 23.1959 46.0884 23.5992 43.5828C24.0699 46.0037 26.1614 47.8286 28.67 47.8286H41.83C44.6852 47.8286 47 45.4646 47 42.5486V29.1086C47 26.4864 45.1282 24.3106 42.6751 23.8987C45.0453 23.4179 46.8322 21.282 46.8322 18.72V5.28C46.8322 2.36394 44.5175 7.14946e-07 41.6622 5.87482e-07L28.5022 0C25.9346 -1.1462e-07 23.8041 1.91151 23.4009 4.4171C22.9301 1.99627 20.8387 0.171427 18.33 0.171427H5.17C2.31469 0.171427 0 2.53536 0 5.45143V18.8914C0 21.5136 1.87169 23.6894 4.32508 24.1013Z"
                        fill={color}
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_178_535">
                    <rect width="47" height="48" fill="" />
                </clipPath>
            </defs>
        </svg>
    );

    function pickBorderColor(rank) {
        if (rank === 1) {
            return 'border-customBlue'
        } else if (rank === 2) {
            return 'border-customEmerald'
        } else if (rank === 3) {
            return 'border-customGreen'
        } else {
            return 'border-[#000000]'
        }
    }

    const getPosition = (position) => {
        switch (position) {
            case 1:
                return first_bg;
            case 2:
                return second_bg;
            case 3:
                return third_bg;
            default:
                return first_bg;
        }
    };

    function ResultNumber(result_no) {
        // '001'
        if (result_no === null || result_no === undefined) {
            return '001';
        }
        return result_no.toString().padStart(3, '0');
    }

    const RemoveComma = (text = "") => {
        // console.log(text)
        return text.replace(/,/g, ' ');
    }

    return (
        <div className={`relative flex items-center flex-col max-w-[460px] mx-auto min-h-[360px]  overflow-hidden justify-between bg-white`}>

            <img src={right_element} alt="rightElement" className='absolute bottom-0 top-0 right-0 h-full z-10 max-w-[50px] object-cover' />
            <img src={left_element} alt="bottomElement" className='absolute bottom-0 top-0 left-0 h-full  w-full  max-w-[50px] object-cover' />

            {/* <img src={data?.stageStatus ? blur4 : blur1} className=" absolute top-28 left-0 w-24" />
            <img src={data?.stageStatus ? blur6 : blur3} className="absolute  left-2/4 right-0 bottom-0 w-36 -z-10" />
            <img src={data?.stageStatus ? blur5 : blur2} className="absolute  top-0 right-1/4 w-36" /> */}

            <div className="flex justify-between flex-col h-full mx-[48px] p-4 pb-0">
                <div className="flex-1">

                    <div className="flex items-center justify-center gap-4">
                        <img className="w-24 pt-0" src={aikm} alt="" />
                    </div>
                    <div className="pt-1 flex items-center justify-center">
                        <img src={Kalaulsavm} alt="" className="w-[150px] " />
                        <img src={KalamaLogo} alt="" className="w-[35px]" />
                    </div>
                    <div className='flex items-end relative justify-center' >
                        <img src={leaderboard} alt="" className='w-[200px] mb-2 pt-2' />
                    </div>
                    <div className='flex mb-4 text-sm items-center justify-center text-center bg-black w-fit gap-2 mx-auto text-white font-semibold px-2 py-[1px]'>
                        After <div className='text-[#ccff00]'>{ResultCount}</div>Results
                    </div>
                    <div className="mt-3 space-y-[5px] h-fit px-2">
                        {top5Colleges.map((college, index) => (
                           <CollegeCard key={index} college={college} />
                        ))}
                    </div>
                    <div className="py-2 w-full mx-auto ">
                        <div className={classNames('flex justify-between w-full  my-4 ',
                            {
                                'text-[12px] ': data?.programName?.length > 20,
                            }
                        )}>
                            <img src={CreatorLogo} alt="" className='w-8' />
                            <img src={sponserLogo} alt="" className='w-10' />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default index;

