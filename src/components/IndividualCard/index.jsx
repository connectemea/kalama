import React from 'react'
import classNames from 'classnames';
import { Star, pradhiba } from '@/assets/elements';

function index({ individual, index, title, individualIndex  }) {

    function pickShadowColor(index) {
        switch (index) {
            case 0:
                return '1.5px 1.5px 5px #8DC63F';
            case 1:
                return '1.5px 1.5px 5px #00A99D';
            case 2:
                return '1.5px 1.5px 5px #3592BA';
            case 3:
                return '1.5px 1.5px 5px #F99D1C';
            default:
                return '1.5px 1.5px 1px #3592BA';
        }
    }
    return (
        <div
            key={individualIndex}
            className={classNames("border-b-[4px] border-b-customEmerald mx-auto mb-4 !bg-white z-30 relative",
                { 'border-b-customGreen': index === 0 },
                { 'border-b-customEmerald': index === 1 },
                { 'border-b-[#3592BA]': index === 2 },
                { 'border-b-customOrange': index === 3 }

            )}
        >
            <div className="border rounded-none border-[#000] flex items-center flex-col gap-2 relative p-2 bg-white">
                <img src={Star} alt="Star" className="absolute -top-2 right-3" />
                <img src={pradhiba} alt="Pradhiba" className="absolute bottom-0" />
                {/* Category Title Inside Card */}
                {individualIndex === 0 && (
                    <h3
                        style={{ textShadow: pickShadowColor(index) }}
                        className={classNames("text-xl font-bold text-gray-800 text-center text-shadow",
                        )}>
                        {title}
                    </h3>
                )}
                <div className="flex flex-1 w-full justify-start gap-4">
                    <div className="h-20 w-20 bg-gray-300">
                        <img
                            src={individual?.image}
                            alt={individual?.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 flex-grow">
                        <div className="">
                            <p className="font-medium text-xl">{individual?.name}</p>
                            <p className="text-sm min-h-[36px]">{individual?.college}</p>
                        </div>
                        <hr className="border-[1.5px] border-borderColor mb-1" />
                        <div className="flex items-end justify-end">
                            <span className={classNames("flex items-center justify-center px-2 py-[1px] bg-customEmerald text-white font-bold rounded-none border border-borderColor",
                                { 'bg-customGreen': index === 0 },
                                { 'bg-customEmerald': index === 1 },
                                { 'bg-[#3592BA]': index === 2 },
                                { 'bg-customOrange': index === 3 }
                            )}>
                                {individual?.points} Pts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
