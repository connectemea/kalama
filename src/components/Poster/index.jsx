

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
    blur1,
    blur2,
    blur3
} from "@/assets/poster/index.js";
import classNames from 'classnames';

function index({ data }) {

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

    function getTotalParticipants(data) {
        if (!data || !Array.isArray(data.winners)) {
            return 0; // Ensure 'data' and 'winners' exist and are arrays
        }

        return data.winners.reduce((total, winner) => {
            if (!winner || typeof winner !== 'object') {
                return total; // Skip invalid winner entries
            }

            if (data.is_group) {
                // If it's a group event, count each winning group as 1
                return total + 1;
            }

            // If it's an individual event, count each winner as 1
            return total + 1;
        }, 0);
    }



    const totalParticipants = getTotalParticipants(data);

    function ResultNumber(result_no) {
        // '001'
        return result_no.toString().padStart(3, '0');
    }

    function extractValidText(text) {
        const match = text.match(/^(.*?\s*\(EASTERN\)|.*?\s*\(WESTERN\))/);
        // console.log(match);
        return match ? match[1].trim() : text;
    }


    return (
        <div className={`relative flex items-center flex-col w-[360px] min-h-[360px] mx-auto overflow-hidden pb-[40px] px-[38px] pr-[40px] justify-between`} style={{
            height: `${300 + totalParticipants * 50}px`,
        }} >
            <img src={data.stageStatus === "off_stage" ? topElement : topElementOnstage} alt="topElement" className='absolute top-0 left-0 w-full max-w-[70px]' />
            <img src={data.stageStatus === "off_stage" ? rightElement : rightElementOnstage} alt="rightElement" className='absolute bottom-0 right-0 z-10 max-w-[50px]' />
            <img src={data.stageStatus === "off_stage" ? bottomElement : bottomElementOnstage} alt="bottomElement" className='absolute bottom-0 left-0 right-0 w-full ' />

            <img src={blur1} className=" absolute top-28 left-0 w-24  " />
            <img src={blur3} className="absolute  left-2/4 right-0 bottom-0 w-36" />
            <img src={blur2} className="absolute  top-0 right-1/4 w-36" />

            <div className="flex justify-between flex-col h-full">
                <div className="flex-1">

                    <div className="flex items-center justify-center">
                        <img className="w-20 pt-10 " src={aikm} alt="" />
                    </div>
                    <div className="pt-1 flex items-center justify-center">
                        <img src={Kalaulsavm} alt="" className="w-28 " />
                        <img src={KalamaLogo} alt="" className="w-8" />
                    </div>
                    <div className='flex items-end relative justify-center' >
                        <img src={data.stageStatus === "off_stage" ? resultTxt : resultTxtOnstage} alt="" className='w-24 pt-4' />
                        <div className="-ml-4 ">
                            <div className='bg-orange-500  h-4 w-4 rounded-full flex items-center justify-center text-white font-bold text-[6px] '>
                                <span>{ResultNumber(data.result_no)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#220440] text-white px-2 py-1  mt-3 max-w-[220px] text-[14px] text-center mx-auto'>
                        <span className={classNames('text-[14px] font-semibold text-center',
                            {
                                'text-[12px] ': data.programName.length > 20,
                            })}>{extractValidText(data.programName)}</span>
                    </div>
                    <div className="mt-3 space-y-4 h-fit">
                        {data.winners.map((winner, index) => (
                            <div className="flex max-w-[270px] items-center" key={index}>
                                <div className="relative h-fit">
                                    <img src={getPosition(winner.position)} alt="" className="w-7 min-w-7" />
                                    <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[10px] text-white font-semibold">
                                        {winner.position}
                                    </span>
                                </div>

                                <div className="pl-2 space-y-1">
                                    {/* Handle Group Winners */}
                                    {winner.groups && winner.groups.length > 0 ? (
                                        winner.groups.map((group, groupIndex) => (
                                            <div key={groupIndex} className="text-left">
                                                <p className="text-[12px] font-bold leading-none">
                                                    {group.name}
                                                </p>
                                                <p className="text-[2px] line-clamp-1">
                                                    {group.team}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        /* Handle Individual Winners */
                                        <div className="text-left">
                                            <p className="text-[14px] font-bold leading-none">
                                                {winner.name}
                                            </p>
                                            <p className="text-[10px]">{winner.college}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-3 w-full mx-auto ">
                    <div className={classNames('flex justify-around w-full  mt-2 -ml-4',
                        {
                            'text-[12px] ': data.programName.length > 20,
                        }
                    )}>
                        <img src={CreatorLogo} alt="" className='w-8' />
                        <img src={sponserLogo} alt="" className='w-8' />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default index;

