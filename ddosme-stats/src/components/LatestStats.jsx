import React from 'react';
import ProgressBar from './ProgressBar';
import { formatDuration } from '../dateUtils.js';
import { bytesToGB, bytesToMB } from '../mathUtils.js';

const LatestStats = ({ stats }) => {
    return (
        <div className='flex flex-col gap-2 w-full h-full bg-slate-400/20 rounded-2xl shadow-xl p-2 border-[1px] border-slate-400/30'>
            <h1 className='text-5xl font-bold underline decoration-wavy decoration-4 decoration-indigo-500 mb-3'>Server Aktuell</h1>
            <div>
                <h2 className='text-3xl font-bold'>CPU in %: </h2>
                <ProgressBar value={Math.round((stats?.latestStatus?.cpu || 0) * 10) / 10} color='#c41d23' />
            </div>
            <div>
                <h2 className='text-3xl font-bold'>Memory in %: </h2>
                <ProgressBar value={Math.round((stats?.latestStatus?.memory || 0) / (512000000) * 100 * 100) / 100} color='#2ca326' />
                <h2 className='text-xl'>{bytesToMB(stats?.latestStatus?.memory)}MB / 512MB</h2>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>Online seit: {formatDuration(stats?.latestStatus?.uptime || 0)}</h2>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>OS: {stats?.latestStatus?.platform}</h2>
            </div>
        </div>
    )
}

export default LatestStats