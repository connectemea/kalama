import { Star, pradhiba, BgRank, Empty } from '@/assets/elements';
import classNames from 'classnames';
import { college, SearchIcon } from '@/assets/icons';
import { useState } from 'react';
import { LoaderIcon, Share2 } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import CollegeCard from '@/components/collegeCard';
import Poster2 from '@/components/Poster2'
import html2canvas from 'html2canvas';


function CollegeTab({ data, ResultCount }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [parent] = useAutoAnimate()

    const rankedList = data.map((item, index) => ({
        ...item,
        rank: index + 1
    }));

    const filteredData = rankedList.filter((item) =>
        item.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShare = async () => {
        setLoading(true)
        const poster = document.getElementById('resultPosterId');
        poster.classList.remove('hidden');

        // Wait for fonts and layout to load
        await document.fonts.ready;
        // Capture the content of the element as a canvas
        html2canvas(poster, {
            scale: 5,
            useCORS: true
        }).then((canvas) => {
            poster.classList.add('hidden');
            // Convert the canvas to a Blob
            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // Create a File object from the Blob
                const file = new File([blob], 'poster.png', { type: 'image/png' });

                // Check if the Web Share API supports file sharing
                if (navigator.share) {
                    try {
                        // Share the image as a file
                        await navigator.share({
                            title: 'Kalama Leaderboard',
                            url: 'https://czonekalama.in',
                            text: "Check out the Kalama Leaderboard🎉",
                            files: [file],
                        });
                        setLoading(false)
                        // console.log('Shared successfully!');
                    } catch (err) {
                        console.error('Error sharing:', err);
                        setLoading(false)
                    }
                } else {
                    console.warn('Web Share API not supported or file sharing not supported');
                    setLoading(false)
                    alert('Sorry, file sharing is not supported on your device please download the image and share it manually');
                }
            });
        });
    };


    return (
        <div className="z-10">


            {/* Search Box */}

            <div className='mt-2'>

                <div className="flex mb-4 items-center justify-center gap-[10px] w-full max-w-[360px] mx-auto">
                    <div 
                        className='rounded-[200px] relative h-[30px] w-[30px] flex items-center justify-center flex-shrink-0'
                        style={{
                            background: 'radial-gradient(50% 50% at 50% 50%, #0F5BA8 0%, #022564 100%)'
                        }}
                    >
                        <img src={SearchIcon} alt="Search" className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search College"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ring-0 focus:ring-0 focus:outline-none w-full rounded-[200px] border border-borderColor px-4 py-2 h-[30px]"
                    />
                </div>
                <div className='flex items-center justify-between max-w-[360px] mx-auto my-4'>
                    <div className='flex items-start justify-start text-center bg-[#146BB6] w-fit gap-2 rounded-[200px] text-white font-semibold px-2 py-[2px]'>
                        After <div className='text-[#ccff00]'>{ResultCount || "..."}</div>Results
                    </div>
                    <button disabled={loading || data.length === 0}  className="flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed border border-gray-700 px-2 text-[13px] py-1 min-w-[100px] rounded-[200px]" onClick={() => handleShare()}>
                        {loading ? (
                            <>
                                <LoaderIcon className='animate-spin mx-auto'/>
                            </>
                        ) : (
                            <>
                                <Share2 size={16} className='fill-black' />
                                Share Now
                            </>
                        )}
                    </button>
                    {/* data.length === 0 */}
                </div>
                <div ref={parent} className='max-w-[360px] flex flex-col mx-auto'>
                <CollegeCard  college={{collegeName: 'EMEA College of Arts and Science,Kondotty', totalScore: 100, rank: 1}} />
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

            <div className='max-w-[400px] mx-auto hidden mt-[500px] z-20' id="resultPosterId" >
                <Poster2 data={data} ResultCount={ResultCount} />
            </div>
        </div >
    );
}

export default CollegeTab;