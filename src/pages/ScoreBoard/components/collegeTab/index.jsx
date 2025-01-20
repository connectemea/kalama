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
        <div className="">
            {/* <div className='flex items-start justify-end max-w-[275px] mx-auto'>
                <button className="flex items-center gap-2 border border-gray-700 px-2 text-[13px] py-1">
                <Share2 size={16} className='fill-black'/>
                    Share Now
                </button>
            </div> */}

            {/* Search Box */}

            <div className='mt-8'>

                <div className="flex mb-4 items-center justify-center w-full p-2 border border-gray-800 shadow-sm max-w-[360px] mx-auto focus-within:border-blue-500 focus-within:shadow-md">
                    {/* <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" /> */}
                    <input
                        type="text"
                        placeholder="Search College"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ring-0 focus:ring-0 focus:outline-none w-full pl-2"
                    />
                </div>
                <div ref={parent} className='max-w-[360px] flex flex-col mx-auto'>
                    {filteredData.length > 0 ? filteredData.slice(0, 10).map((college, index) => {
                        return (
                            <CollegeCard key={index} college={college} />
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