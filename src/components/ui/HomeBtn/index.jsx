import cn from 'classnames' 

function index({
    className,
    label,
    onClick,
    ...props
}) {
    return (
        <button 
            className={cn('border-none rounded-[200px] w-[171px] h-[36px] opacity-100 text-white font-medium flex items-center justify-center gap-2', className)} 
            style={{
                background: 'radial-gradient(52.63% 52.63% at 50% 50%, #F86270 0%, #D71F30 100%)',
            }}
            onClick={onClick} 
            {...props}
        >
            {label} 
        </button>
    )
}

export default index
