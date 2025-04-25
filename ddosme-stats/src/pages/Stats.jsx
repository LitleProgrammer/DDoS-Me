import React, { useEffect, useState } from 'react'
import { getStats } from '../api.js';
import LatestStats from '../components/LatestStats.jsx';
import CurrentVariables from '../components/CurrentVariables.jsx';
import RequestStats from '../components/RequestStats.jsx';
import LastRequests from '../components/LastRequests.jsx';
import Diagrams from '../components/Diagrams.jsx';
import SelectGraph from '../components/SelectGraph.jsx';

const Stats = () => {
    const [stats, setStats] = useState({});
    const [graph, setGraph] = useState(null);

    useEffect(() => {
        refreshStats();

        const interval = setInterval(() => {
            refreshStats();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const refreshStats = async () => {
        const stats = await getStats();
        if (stats.success) {
            setStats(stats.data);
            console.log(stats.data);
        } else {
            console.log(stats.error);
        }
    }

    return (
        <div className='grid grid-rows-2 grid-cols-5 gap-5 h-screen p-6'>
            <div className='row-start-1 col-span-2'><LatestStats stats={stats} /></div>
            <div className='row-start-1'><CurrentVariables stats={stats} /></div>
            <div className='row-start-1 col-span-2'><RequestStats stats={stats} /></div>
            <div className='row-start-2 col-span-2'><Diagrams stats={stats} graph={graph} /></div>
            <div className='row-start-2'><SelectGraph setGraph={setGraph} graph={graph} /></div>
            <div className='row-start-2 col-span-2'><LastRequests stats={stats} /></div>
        </div>
    )
}

//<h1 className='text-2xl'>Stats</h1>
//<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { refreshStats() }}>Refresh</button>

export default Stats