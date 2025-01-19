import { Star, pradhiba, BgRank, Empty } from '@/assets/elements';
import classNames from 'classnames';
import { college } from '@/assets/icons';
import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import CollegeCard from '@/components/collegeCard';



function CollegeTab({ data }) {

    const [searchTerm, setSearchTerm] = useState('');

    const [parent] = useAutoAnimate()

    // console.log(data);



    const rankedList = data.map((item, index) => ({
        ...item,
        rank: index + 1
    }));

    const filteredData = rankedList.filter((item) =>
        item.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border border-customBlue p-6 px-10 rounded-[50px] bg-white/80 blur-10 z-10 w-full">

            <div className='mt-4 flex  w-full flex-col gap-6'>
                <div className='px-2  relative flex flex-col items-center justify-center'>
                    <div className='bg-customBlue py-1 px-4  text-white font-semibold  text-3xl'>
                        College
                    </div>
                </div>
                <div ref={parent} className='flex-1 flex-grow w-full flex flex-col mb-6 '>
                    {filteredData.length > 0 ? filteredData.slice(0, 6).map((college, index) => {
                        return (
                            <div className='w-full flex-1 flex-grow ' key={index}>
                                <CollegeCard college={college} />
                            </div>
                        );
                    }) :
                        (
                            <div className="flex justify-center items-center w-full h-[300px] my-10">
                                <img src={Empty} alt="Empty" className="w-1/2" />
                            </div>
                        )}
                </div>
            </div>
        </div >
    );
}

export default CollegeTab;