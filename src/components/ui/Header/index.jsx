import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import classNames from 'classnames';

function Header({
    className,
    title,
    href,
    color = 'white',
    ...props
}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(href)
    }

    return (
        <div className={classNames('flex p-4 justify-between w-full items-center mt-6', className)}>
            <div 
                onClick={handleNavigate} 
                className='rounded-[200px] relative h-[30px] w-[30px] flex items-center justify-center cursor-pointer'
                style={{
                    background: 'radial-gradient(50% 50% at 50% 50%, #0F5BA8 0%, #022564 100%)'
                }}
            >
                <button className=" px-1"  {...props}>
                    <ArrowLeft color="#ffffff" strokeWidth={3} size={11} />
                </button>
            </div>
            <div className={classNames(' text-[#231F20] px-8 font-semibold py-[2px] rounded-[200px]',
                {
                    'bg-[#3592BA] border-2 border-[#3592BA]': color === '#3592BA',
                    'bg-customEmerald border-2 border-customEmerald': color === '#00A99D',
                    'bg-customGreen border-2 border-customGreen': color === '#8DC63F',
                    'bg-black border-2 border-white': color === 'black',
                    'bg-white border-2 border-borderColor': color === 'white',
                })}>
                <h1 className={classNames(
                    {
                        'text-black': color === 'white',
                        'text-white': color !== 'white',
                    }
                )}>{title}</h1>
            </div>
            <div />
        </div>
    )
}

export default Header
