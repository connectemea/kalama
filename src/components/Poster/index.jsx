import React from "react";
import {
    position_bg_stage,
    position_bg_off_stage,
    stage_header,
    off_stage_header,
    stage_star_1,
    stage_star_2,
    off_stage_star_1,
    off_stage_star_2,
    stage_glory_logo,
    off_stage_glory_logo,
    catalyst_logo,
} from "@/assets/poster/2026/index.js";
import classNames from 'classnames';
import './style.css';

function index({ data }) {

    function ExtractedText(text) {
        if (!text) {
            return null;
        }

        const match = text.match(/^(.*?\s*)(\(EASTERN\)|\(WESTERN\))\s*(.*)?/);

        return (
            <span>
                {match ? (
                    <>
                        {match[1]} {/* Normal text before (EASTERN) */}
                        {match[2]} {/* Normal (EASTERN) or (WESTERN) */}
                        {match[3] && <span className="flex text-center mx-auto items-center justify-center" style={{ fontSize: "0.7em" }}> {match[3]}</span>}
                    </>
                ) : (
                    text
                )}
            </span>
        );
    }

    const RemoveComma = (text = "") => {
        return text.replace(/,/g, ' ');
    }

    return (
        <div className={`relative p-8 flex items-center flex-col w-[360px] h-full min-h-[450px] mx-auto overflow-hidden justify-between`}>

            <img src={data?.stageStatus ? stage_star_1 : off_stage_star_1} className="absolute top-60 left-7 w-14 z-10" />
            <img src={data?.stageStatus ? stage_star_2 : off_stage_star_2} className="absolute right-7 bottom-28 w-10 z-10" />

            <div className="flex justify-between flex-col h-full w-full px-7">

                <div className="flex items-center justify-center">
                    <img src={data?.stageStatus ? stage_header : off_stage_header} alt="header" className='max-w-[205px]' />
                </div>

                <div className={`${data?.stageStatus ? 'result-bg-stage' : 'result-bg-off-stage'} relative mt-5 pt-9 pb-4 flex flex-col items-center w-full min-h-[260px] rounded-t-full before:rounded-t-full after:rounded-t-full`}>

                    <div className={`${data?.stageStatus ? 'result-bg-inner-stage' : 'result-bg-inner-off-stage'} result-bg-inner rounded-t-full before:rounded-t-full`} />
                    
                    <div className={`${data?.stageStatus ? 'border-[#2E9ECD] text-[#2E9ECD] drop-shadow-[0_3px_0_#012161]' : 'border-[#20B09B] text-[#20B09B] drop-shadow-[0_3px_0_#02534C]'} bg-white border rounded-full px-2 py-1 max-w-[185px] text-center mx-auto`}>
                        <p className={classNames('text-[11px] leading-3 font-extrabold text-center wordIssue',
                            {
                                'text-[10px] ': data?.programName?.length > 20,
                            })}>{ExtractedText(data?.programName)}</p>
                    </div>
                    <div className="z-10 mt-3 px-7 space-y-2.5 h-full w-full">
                        {data?.winners?.map((winner, index) => (
                            <div key={index} className="flex max-w-[270px] items-start">
                                <div className="relative h-fit shrink-0">
                                    <img
                                        src={data.stageStatus ? position_bg_stage : position_bg_off_stage}
                                        alt=""
                                        className="w-7 h-[39.28px]"
                                    />
                                    <span className={`absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold ${data?.stageStatus ? 'text-[#012161]' : 'text-[#02534C]'}`}>
                                        0{winner?.position}
                                    </span>
                                </div>
                                <div className="pl-2.5 space-y-1 mt-2">
                                    {winner?.users?.map((user, userIndex) => {
                                        const getFontSize = (totalUsers) => {
                                            if (totalUsers <= 1) return '12px';
                                            if (totalUsers === 2) return '11px';
                                            if (totalUsers === 3) return '10px';
                                            return '10px'; // For 4 or more users
                                        };
                                        const getSmallFontSize = (totalUsers) => {
                                            if (totalUsers <= 1) return '7px';
                                            if (totalUsers === 2) return '6.5px';
                                            if (totalUsers === 3) return '6.5px';
                                            return '6.5px'; // For 4 or more users
                                        };
                                        const nameSize = getFontSize(winner?.users?.length);
                                        const collegeSize = getSmallFontSize(winner?.users?.length);
                                        return (
                                            <div key={userIndex} className="text-left text-white">
                                                {user.team ? (
                                                    // Group winner
                                                    <>
                                                        <p className="font-bold leading-none wordIssue capitalize" style={{ fontSize: nameSize }}>
                                                            {(user.name)}
                                                        </p>
                                                        <p className="line-clamp-1" style={{ fontSize: collegeSize }}>
                                                            {RemoveComma(user.team)}
                                                        </p>
                                                    </>
                                                ) : (
                                                    // Individual winner
                                                    <>
                                                        <p className="font-bold leading-none wordIssue capitalize !whitespace-normal" style={{ fontSize: nameSize }}>
                                                            {RemoveComma(user.name)}
                                                        </p>
                                                        <p style={{ fontSize: collegeSize, lineHeight: '1.2' }}>
                                                            {RemoveComma(user?.college)}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="flex justify-between items-center w-full mt-2">
                    <img src={data?.stageStatus ? stage_glory_logo : off_stage_glory_logo} alt="gloryBoard Logo" className='w-10' />
                    <img src={catalyst_logo} alt="catalyst Logo" className='w-16 -mr-2' />
                </div>
            </div>

        </div>
    );
}

export default index;

