import { Empty } from '@/assets/elements';
import { useState } from 'react';
import IndividualCard from '@/components/IndividualCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
function IndividualTab({ data }) {
    const [expandedCategories, setExpandedCategories] = useState({});

    // console.log(data)

    const toggleExpand = (index) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    const [parent] = useAutoAnimate()
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
        <div className="blur-10 z-10 w-full flex items-start">

            <div className='mt-4 flex  w-full flex-col gap-4'>
                <div className='px-2  relative flex flex-col items-center justify-center'>
                    
                    <div className='bg-customBlue py-1 px-4   text-white font-semibold  text-3xl'>
                        Individual
                    </div>
                </div>
                <div ref={parent} className='flex-1 flex-grow w-full grid grid-cols-2 grid-rows-3 gap-x-4 '>
                    {data.length ? data.map((category, index) => {
                        // Only proceed if winners exist in the category
                        if (category.winners.length === 0) return null;

                        const isExpanded = expandedCategories[index];
                        const topScorer = category.winners[0];
                        const otherWinners = category.winners.slice(1);
                        const winnersToShow = isExpanded ? category.winners : [topScorer];
                        const title = category.title;

                        return (
                            <div key={index} className="mb-1">
                                {winnersToShow.length > 0 && (
                                    <>
                                        {winnersToShow.map((individual, individualIndex) => (
                                            <IndividualCard key={individualIndex} individual={individual} index={index} title={title} individualIndex={individualIndex} />
                                        ))}
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
            </div>
        </div>

    );
}


export default IndividualTab;