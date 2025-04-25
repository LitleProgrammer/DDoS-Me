import React from 'react';
import { bytesToMB } from '../mathUtils.js';

const RequestStats = ({ stats }) => {
    return (
        <div className='flex flex-col gap-2 w-full h-full bg-slate-400/20 border-[1px] border-slate-400/30 rounded-2xl shadow-xl p-2'>
            <h1 className='text-5xl font-bold underline decoration-wavy decoration-4 decoration-indigo-500 mb-3'>Anfragen</h1>
            <div className=''>
                <h2 className='text-3xl font-bold'>Gesamt: {stats?.requests?.total || 0}</h2>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>Blockiert: {stats?.requests?.blocked || 0} / {stats?.requests?.total || 0}</h2>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>Datenmenge: {bytesToMB(stats?.requests?.size || 0)}MB</h2>
            </div>
        </div>
    )
}

export default RequestStats