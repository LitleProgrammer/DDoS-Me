import React from 'react'

const LastRequests = ({ stats }) => {
    const formatUnixTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    }

    return (
        <div className='relative flex flex-col gap-2 w-full h-full bg-slate-400/20 border-[1px] border-slate-400/30 rounded-2xl shadow-xl p-2 overflow-scroll'>
            <table className='table-auto text-left'>
                <thead className=''>
                    <tr className='sticky top-0 backdrop-blur-sm border-b-2 border-slate-500'>
                        <th className='text-2xl w-1/5 pb-2'>IP</th>
                        <th className='text-2xl w-1/5 pb-2'>Zeit</th>
                        <th className='text-2xl w-1/5 pb-2'>Größe</th>
                        <th className='text-2xl w-1/5 pb-2'>Blockiert</th>
                    </tr>
                </thead>
                <tbody>
                    {stats?.lastRequests?.map((request, index) => (
                        <tr key={index} className='odd:bg-black/5'>
                            <td className='text-xl'>{request.deviceIp}</td>
                            <td className='text-xl'>{formatUnixTimestamp(request.date)}</td>
                            <td className='text-xl'>{request.size}B</td>
                            <td className='text-xl pl-5'>{request.blocked ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LastRequests