import React from 'react'
import ResourceChart from './ResourceChart'
import RequestsAmountGraph from './RequestsAmountGraph'

const Diagrams = ({ stats, graph }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 w-full h-full bg-slate-400/20 border-[1px] border-slate-400/30 rounded-2xl shadow-xl p-2'>
            {graph && graph === "requests" && <RequestsAmountGraph data={stats?.requestsGraph || []} />}
            {graph && graph === "resources" && <ResourceChart data={stats?.resourceUsageGraph || []} />}
            {!graph &&
                <h2 className='text-3xl font-bold'>Kein graphen ausgewählt</h2>
            }
        </div>
    )
}

export default Diagrams