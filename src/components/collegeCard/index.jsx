import { Star } from '../../assets/elements';

function index({ college }) {

    const BgRank = ({ color, rank }) => (
        <div 
            className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: color }}
        >
            {String(rank).padStart(2, '0')}
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

    function getBorderColor(rank) {
        return pickColor(rank);
    }

    function pickBgColor(rank) {
        if (rank === 1) {
            return 'bg-[#012161]'
        } else if (rank === 2) {
            return 'bg-[#3548AC]'
        } else if (rank === 3) {
            return 'bg-[#146BB6]'
        } else {
            return 'bg-[#000000]'
        }
    }



    return (
        <div
            className="flex relative justify-start gap-3 rounded-xl w-full flex-1 bg-white items-center p-2 pb-2 mb-4 border border-b-[4px] mx-auto overflow-hidden"
            style={{ borderColor: getBorderColor(college.rank), borderBottomColor: getBorderColor(college.rank) }}
        >
            <img src={Star} alt="" className='absolute top-0 -right-[15px] w-[30px] h-[30px]' />
            <div className="flex items-center gap-4 flex-1 w-full min-h-[60px]">
                <BgRank color={pickColor(college.rank)} rank={college.rank} />
                <div className='flex-1 w-full flex flex-col gap-1 '>
                    <p
                        className="font-semibold leading-4 min-h-[42px] flex items-end"
                        style={{
                            display: 'flex',  
                            width: '100%',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {college.collegeName}
                    </p>
                    <hr className="border-[1.5px] mb-[1px]" style={{ borderColor: getBorderColor(college.rank) }} />
                                        <div className='flex items-end justify-end'>
                        <span className={`flex items-center justify-center px-2 py-[1px]  text-white font-bold rounded-none  
                ${pickBgColor(college.rank)}`}>
                            {college.totalScore} Pts
                        </span>
                    </div>
                </div>
            
            </div>
            <img src={Star} alt="" className='absolute -bottom-[20px] left-20 w-[30px] h-[50px]' />
        
        </div>
    )
}

export default index
