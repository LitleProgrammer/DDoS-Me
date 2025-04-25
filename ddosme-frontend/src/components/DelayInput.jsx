import React from 'react'

const DelayInput = ({ dely, setDelay, min = 1.5 }) => {
    return (
        <div className='flex flex-row justify-center items-center space-x-0'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-full h-14 border-[1px] border-slate-500' onClick={() => { const newDelay = Math.round((parseFloat(dely) - 0.05) * 100) / 100; setDelay(newDelay < min ? min : newDelay); }}>-</button>
            <input type="number" name="" id="" step={0.05} min={min} readOnly className='border-[1px] border-slate-500 border-x-0 p-2 h-14 bg-slate-600 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' onChange={(e) => setDelay(e.target.value)} value={dely} />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full h-14 border-[1px] border-slate-500' onClick={() => setDelay(Math.round((parseFloat(dely) + 0.05) * 100) / 100)}>+</button>
        </div>
    )
}

export default DelayInput