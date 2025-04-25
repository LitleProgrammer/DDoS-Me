import React from 'react'

const NumberInput = ({ value, onChange, min, max, step }) => {
    return (
        <div>
            <input type="number" name="" id="" min={min} max={max} step={step} value={value} onChange={onChange} className='border-[1px] border-slate-400/70 rounded-2xl p-2 px-4 focus:ring-0' />
        </div>
    )
}

export default NumberInput