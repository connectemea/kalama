import React from 'react'
import cn from 'classnames'
import BtnArrow from '@/assets/icons/btnArrow.svg'

function index({
    className,
    label,
    onClick,
    ...props
}) {
    return (
        <button className={cn('border-none rounded-none bg-[#191A23] px-3 py-1.5 text-white font-medium flex items-center justify-center gap-2', className)} onClick={onClick} {...props}>
            {label} <div className=''><img src={BtnArrow} alt='' /></div>
        </button>
    )
}

export default index
