import React from 'react'
import classNames from 'classnames';

function index({ college }) {

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

    function pickBgColor(rank) {
        if (rank === 1) {
            return 'bg-customBlue'
        } else if (rank === 2) {
            return 'bg-customEmerald'
        } else if (rank === 3) {
            return 'bg-customGreen'
        } else {
            return 'bg-[#000000]'
        }
    }

    function pickColor(rank) {
        if (rank === 1) {
            return '#276692'
        } else if (rank === 2) {
            return '#00A99D'
        } else if (rank === 3) {
            return '#8DC63F'
        } else {
            return '#000000'
        }
    }


    return (
        <div
            key={index}
            className={classNames(`flex justify-start gap-3 w-full flex-1 bg-white items-center p-4 pb-2 mb-4 border border-b-[4px] mx-auto  ${pickBorderColor(college.rank)}`)}
        >
            <div className="flex items-center gap-4 flex-1 w-full min-h-[60px]">
                <div
                    className="w-10 h-2 relative flex items-center justify-center font-bold text-white mr-4 pl-4"
                >
                    <span className="text-4xl z-20"> {college.rank}</span>

                    <div className='z-10 absolute'>
                        <BgRank color={pickColor(college.rank)} />
                    </div>
                </div>
                <div className='flex-1 w-full flex flex-col gap-1 '>
                    <p className="font-semibold leading-4 min-h-[42px]">{college.collegeName} </p>
                    <hr className={`border-[1.5px] mb-[1px] ${pickBorderColor(college.rank)}`} />
                    <div className='flex items-end justify-end'>
                        <span className={`flex items-center justify-center px-2 py-[1px]  text-white font-bold rounded-none  
                ${pickBgColor(college.rank)}`}>
                            {college.totalScore} Pts
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
