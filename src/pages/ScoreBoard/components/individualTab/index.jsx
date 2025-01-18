import { Empty } from '@/assets/elements';
import { useState } from 'react';
import IndividualCard from '@/components/IndividualCard';

function IndividualTab({ data }) {
    const [expandedCategories, setExpandedCategories] = useState({});

    console.log(data)

    const toggleExpand = (index) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

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
        <div className=" mt-10">
            {data.length ? data.map((category, index) => {
                // Only proceed if winners exist in the category
                if (category.winners.length === 0) return null;

                const isExpanded = expandedCategories[index];
                const topScorer = category.winners[0];
                const otherWinners = category.winners.slice(1);
                const winnersToShow = isExpanded ? category.winners : [topScorer];
                const title = category.title;

                return (
                    <div key={index} className="mb-8">
                        {winnersToShow.length > 0 && (
                            <>
                                {/* Render Top Scorer and Others (if expanded) */}
                                {winnersToShow.map((individual, individualIndex) => (
                                    <IndividualCard key={individualIndex} individual={individual} index={index} title={title} individualIndex={individualIndex} />
                                ))}

                                {/* Show More Button */}
                                {/* {otherWinners.length > 0 && (
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="block mx-auto px-4 py-2 bg-customEmerald text-white font-bold rounded mt-2"
                                    >
                                        {isExpanded ? 'Show Less' : `Show More (${otherWinners.length} more)`}
                                    </button>
                                )} */}
                            </>
                        )}
                    </div>
                )
            }) : (
                <div className="flex justify-center items-center w-full h-[300px] my-10">
                    <img src={Empty} alt="Empty" className="w-1/2" />
                </div>
            )
            }
        </div>
    );
}


export default IndividualTab;