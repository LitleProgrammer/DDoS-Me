import React from 'react';

const ProgressBar = ({ value, color = '#FF0000' }) => {
    const safeValue = Math.min(Math.max(value || 0, 0), 100); // clamp between 0 and 100

    return (
        <div className='w-full h-6 relative'>
            {/* Background */}
            <div className='rounded-full w-full h-full bg-gray-400 border-b-[2px] border-x-[2px] border-gray-500/40'></div>

            {/* Foreground (actual progress) */}
            <div className={`rounded-full h-full min-w-6 translate-y-[-100%] border-b-[3px] border-white/40 transition-all duration-300 ease-in-out`} style={{ width: `${safeValue}%`, backgroundColor: color }}></div>

            {/* Percentage text */}
            <p className='translate-y-[-185%] text-right pr-1 transition-all duration-300 ease-in-out font-bold text-slate-200 text-xl' style={{ width: `${safeValue}%` }}>{safeValue}%</p>
        </div>
    );
};

export default ProgressBar;
