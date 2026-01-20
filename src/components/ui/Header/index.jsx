import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import classNames from 'classnames';

function index({
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
        <div className='flex p-4 justify-between w-full items-center mt-6 '>
            <div onClick={handleNavigate} className='border-[3px] border-[#231F20] rounded-none relative h-[22px] w-[22px] flex items-center justify-center cursor-pointer'>
                <button className=" px-1"  {...props}>
                    <ArrowLeft color="#000000" strokeWidth={3} size={11} />
                    <div className='bg-white h-1 w-2 absolute -left-[7px] top-[35%]' />
                    <div className='bg-white h-1 w-2 absolute -right-[7px] top-[35%]' />
                </button>
            </div>
            <div className={classNames(' text-[#231F20] px-8 font-semibold py-[2px]',
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

export default index
