import { Star } from '@/assets/elements';

function index({ individual, index, title, individualIndex  }) {

    function pickShadowColor(index) {
        const colors = ['#012161', '#3548AC', '#146BB6', '#59AED2'];
        const color = colors[index] || '#012161';
        return `1.5px 1.5px 2px ${color}80`;
    }

    function pickColor(index) {
        if (index === 0) {
            return '#012161'
        } else if (index === 1) {
            return '#3548AC'
        } else if (index === 2) {
            return '#146BB6'
        } else if (index === 3) {
            return '#59AED2'
        } else {
            return '#000000'
        }
    }

    function getBorderColor(index) {
        return pickColor(index);
    }

    function getBgColor(index) {
        return pickColor(index);
    }

    return (
        <div
            key={individualIndex}
            className="flex flex-col relative justify-start rounded-xl w-full flex-1 bg-white items-center p-2 pb-2 mb-4 border border-b-[4px] mx-auto overflow-hidden"
            style={{ borderColor: getBorderColor(index), borderBottomColor: getBorderColor(index) }}
        >
            <img src={Star} alt="" className='absolute top-0 -right-[15px] w-[30px] h-[30px]' />
            {/* Category Title Inside Card */}
            {individualIndex === 0 && (
                <h3
                    className="text-sm font-bold text-white text-center rounded-[20px] flex items-center justify-center mx-auto"
                    style={{
                        width: '109px',
                        height: '24px',
                        backgroundColor: getBgColor(index)
                    }}
                >
                    {title}
                </h3>
            )}
            <div className="flex items-center gap-4 flex-1 w-full min-h-[60px]">
                <div className="h-20 w-20 bg-gray-300 flex-shrink-0">
                    <img
                        src={individual?.image}
                        alt={individual?.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className='flex-1 w-full flex flex-col gap-1'>
                    <div className="">
                        <p className="font-semibold leading-4 min-h-[42px] flex items-end">{individual?.name}</p>
                        <p className="text-sm min-h-[36px]">{individual?.college}</p>
                    </div>
                    <hr className="border-[1.5px] mb-[1px]" style={{ borderColor: getBorderColor(index) }} />
                    <div className='flex items-end justify-end'>
                        <span className="flex items-center justify-center px-3 py-1 text-white font-bold rounded-xl" style={{ backgroundColor: getBgColor(index) }}>
                            {individual?.points} Pts
                        </span>
                    </div>
                </div>
            </div>
            <img src={Star} alt="" className='absolute -bottom-[20px] left-20 w-[30px] h-[50px]' />
        </div>
    )
}

export default index
