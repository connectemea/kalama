import React from 'react'
import classNames from 'classnames';

function CollegeCard({ college }) {

    const BgRank = ({ color }) => (
        <svg width="32" height="42" viewBox="-2 0 68 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="13.0519" width="67" height="67.8701" rx="33.5" fill={color} />
            <path d="M33.231 69.377C34.0713 72.0337 35.3751 74.2674 37.1528 76.043C38.9084 77.7964 41.0964 79.0725 43.6831 79.8818C41.0681 80.7104 38.8615 82.0086 37.0962 83.8027C35.3727 85.5544 34.1004 87.7483 33.2671 90.3672C32.5216 87.9258 31.2119 85.7519 29.3169 83.8691C27.4121 81.9544 25.2288 80.6171 22.7456 79.8604C25.347 79.0281 27.5312 77.7616 29.2788 76.043C31.0881 74.2637 32.3966 72.0323 33.231 69.377Z" fill={color} stroke="white" strokeWidth="1.5" />
            <path d="M34.9712 3.24707C35.8115 5.90381 37.1153 8.13748 38.8931 9.91309C40.6486 11.6665 42.8366 12.9426 45.4233 13.752C42.8084 14.5805 40.6017 15.8788 38.8364 17.6729C37.1129 19.4245 35.8406 21.6184 35.0073 24.2373C34.2618 21.7959 32.9522 19.6221 31.0571 17.7393C29.1523 15.8245 26.969 14.4872 24.4858 13.7305C27.0873 12.8982 29.2714 11.6317 31.019 9.91309C32.8284 8.13378 34.1368 5.90237 34.9712 3.24707Z" fill={color} stroke="white" strokeWidth="1.5" />
        </svg>
    );

    const PointsBadge = ({ color, children }) => (
        <div className="flex items-center h-[18px]">
            {/* Left side: SVG with star decoration */}

            <svg width="8" height="18" viewBox="0 0 17 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9121 38C9.65154 38 3.34302 33.9268 0.144531 27.9414C1.99335 23.0572 5.76921 20.1936 11.3838 19.291C5.62182 18.4049 1.78964 15.3787 0 10.3311C3.15078 4.19678 9.5416 0 16.9121 0V38Z" fill={color}/>
            </svg>

            {/* Right side: div that scales with content */}
            <div
                className="h-full flex items-center justify-center pr-2 pl-1 ml-[-1px] text-white font-bold text-[10px] whitespace-nowrap"
                style={{
                    backgroundColor: color,
                    borderTopRightRadius: '99px',
                    borderBottomRightRadius: '99px'
                }}
            >
                {children}
            </div>
        </div>
    );

    function pickColor(rank) {
        if (rank === 1) {
            return '#012161'
        } else if (rank === 2) {
            return '#3548AC'
        } else if (rank === 3) {
            return '#146BB6'
        } else {
            return '#000000'
        }
    }

    return (
        <div
            key={CollegeCard}
            className={classNames(`flex justify-start w-full flex-1 h-full min-h-[45px] bg-white items-center`)}
        >
            <div className="flex items-center gap-1 flex-1 w-full">
                <div
                    className=" h-2 relative flex items-center justify-center font-bold text-white mr-4 pl-4"
                >
                    <span className="text-base z-30 relative">0{college.rank}</span>

                    <div className='z-10 absolute'>
                        <BgRank color={pickColor(college.rank)} />
                    </div>

                </div>
                <div className='flex-1 w-full flex gap-1.5'>
                    <p
                        className="font-semibold leading-4 flex items-center text-xs uppercase"
                        style={{
                            color: pickColor(college.rank),
                            display: 'flex',
                            width: '100%',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {college.collegeName}
                    </p>
                    <div className='flex items-center justify-center'>
                        <PointsBadge color={pickColor(college.rank)}>
                            {college.totalScore} Pts
                        </PointsBadge>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CollegeCard
