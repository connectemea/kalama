import Star from '@/components/ui/Star';

function index({ individual, index, title, individualIndex  }) {

    function pickShadowColor(index) {
        const colors = ['#D71F30', '#15A352', '#EA9223', '#9C111D'];
        const color = colors[index] || '#D71F30';
        return `1.5px 1.5px 2px ${color}80`;
    }

    function pickColor(index) {
        if (index === 0) {
            return '#D71F30'
        } else if (index === 1) {
            return '#15A352'
        } else if (index === 2) {
            return '#EA9223'
        } else if (index === 3) {
            return '#9C111D'
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
            <Star color={getBorderColor(index)} className='absolute top-0 -right-[15px] w-[30px] h-[30px]' />
            {/* Category Title Inside Card */}
            {individualIndex === 0 && (
                <h3
                    className="text-sm font-bold text-white text-center rounded-[20px] flex items-center justify-center mx-auto px-2"
                    style={{
                        minWidth: '109px',
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
            <Star color={getBorderColor(index)} className='absolute -bottom-[20px] left-20 w-[30px] h-[50px]' />
        </div>
    )
}

export default index
