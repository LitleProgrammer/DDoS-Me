import React, { useEffect, useState } from 'react'
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts';

const RequestsAmountGraph = ({ data }) => {
    const [graphData, setData] = useState([]);

    useEffect(() => {
        if (data?.length > 0) {
            setData(data);
        }
    }, [data]);

    if (!graphData || graphData.length === 0) {
        return (
            <div className="w-full h-80 flex items-center justify-center bg-white/20 rounded-2xl shadow-xl text-slate-500">
                Loading resource usage...
            </div>
        );
    }

    const formattedData = graphData.map((item) => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
        total: item.total,
        blocked: item.blocked,
    }));

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="total" stroke="#1ba14f" strokeWidth={6} type={"monotone"} yAxisId="left" name='Gesamt (/5s)' animationDuration={0} animationEasing='linear' dot={false} />
                    <Line dataKey="blocked" stroke="#c9222d" strokeWidth={6} type={"monotone"} yAxisId="left" name='Blockiert (/5s)' animationDuration={0} animationEasing='linear' />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RequestsAmountGraph