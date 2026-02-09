import React from "react";
import {
    first_badge,
    second_badge,
    third_badge,
    individual_first_bg,
    individual_second_bg,
    individual_third_bg,
} from "@/assets/poster/2026/index.js";
import classNames from 'classnames';

const getConfigByPosition = (position) => {
    switch (position) {
        case 1:
            return {
                bg: individual_first_bg,
                badge: first_badge,
                titleStyle: 'border-[#D81F31] text-[#D81F31]',
                nameStyle: 'text-[#720C16]',
                collegeStyle: 'text-[#D81F31]',
            };
        case 2:
            return {
                bg: individual_second_bg,
                badge: second_badge,
                titleStyle: 'border-[#15A253] text-[#15A253]',
                nameStyle: 'text-[#004E22]',
                collegeStyle: 'text-[#15A253]',
            };
        case 3:
            return {
                bg: individual_third_bg,
                badge: third_badge,
                titleStyle: 'border-[#EA9224] text-[#EA9224]',
                nameStyle: 'text-[#804801]',
                collegeStyle: 'text-[#EA9224]',
            };
        default:
            return {
                bg: individual_first_bg,
                badge: first_badge,
                titleStyle: 'border-[#D81F31] text-[#D81F31]',
                nameStyle: 'text-[#720C16]',
                collegeStyle: 'text-[#D81F31]',
            };
    }
}

function IndividualResultPoster(data ) {

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

            <img src={getConfigByPosition(data?.position)?.bg} alt="backgroundImg" className='absolute -z-10 top-0 left-0 right-0 w-[360px] h-[450px]' />

            <div className="flex justify-between flex-col h-full mt-[130px] mx-[70px]">
                <div className={`${getConfigByPosition(data?.position)?.titleStyle} bg-white drop-shadow-[0_3px_0_#1A2600] border rounded-full px-3 py-1 mt-3 min-w-32 max-w-[200px] text-center mx-auto`}>
                    <p className={classNames('text-[11px] leading-3 font-extrabold text-center wordIssue',
                        {
                            'text-[10px] ': data?.programName?.length > 20,
                        })}>{ExtractedText(data?.programName)}</p>
                </div>

                <div className="z-10 mt-6 space-y-2 h-fit w-full flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={data.profileImg}
                            alt="Winner"
                            crossOrigin="anonymous"
                            className="w-[100px] h-[125px] object-cover border-b-[3px] border-[#1A2600] rounded-[14px] bg-[#1A2600]"
                        />
                        <img
                            src={getConfigByPosition(data?.position)?.badge}
                            alt="Badge"
                            className="absolute -top-3 -right-3 w-[35px] h-[35px] object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className={`text-sm font-extrabold uppercase ${getConfigByPosition(data?.position).nameStyle}`}>
                            {data?.name}
                        </h2>
                        <p className={`text-[9px] font-semibold capitalize ${getConfigByPosition(data?.position).collegeStyle}`}>
                            {data?.collegeName}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default IndividualResultPoster;

