

import React from "react";
import {
    stage_bg,
    off_stage_bg,
    position_bg_stage,
    position_bg_off_stage,
} from "@/assets/poster/2026/index.js";
import classNames from 'classnames';

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
        <div className={`relative flex items-center flex-col w-[360px] h-full min-h-[450px] mx-auto overflow-hidden justify-between`}>

            <img src={data?.stageStatus ? stage_bg : off_stage_bg} alt="backgroundImg" className='absolute -z-10 top-0 left-0 right-0 w-full' />

            <div className="flex justify-between flex-col h-full mt-[155px] mx-[90px]">
                <div className={`${data?.stageStatus ? 'border-[#2E9ECD] text-[#2E9ECD] drop-shadow-[0_3px_0_#012161]' : 'border-[#20B09B] text-[#20B09B] drop-shadow-[0_3px_0_#02534C]'} bg-white border rounded-full px-2 py-1 mt-3 max-w-[185px] text-center mx-auto`}>
                    <p className={classNames('text-[11px] leading-3 font-semibold text-center wordIssue',
                        {
                            'text-[10px] ': data?.programName?.length > 20,
                        })}>{ExtractedText(data?.programName)}</p>
                </div>

                <div className="z-10 mt-2.5 space-y-2.5 h-fit max-h-[180px]">
                    {data?.winners?.map((winner, index) => (
                        <div key={index}>
                            <div className="flex max-w-[270px] items-start">
                                <div className="relative h-fit">
                                    <img
                                        src={data.stageStatus ? position_bg_stage : position_bg_off_stage}
                                        alt=""
                                        className="w-7 min-w-7"
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
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default index;

