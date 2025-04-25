import React, { useEffect, useState } from 'react';
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

const ResourceChart = ({ data }) => {
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
        memoryMB: Math.round(item.memory / (1024 * 1024)),
        cpuPercent: Math.round(item.cpu).toFixed(2),
    }));

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                        yAxisId="left"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                        yAxisId="right"
                        domain={[0, 512]}
                        tickFormatter={(value) => `${value}MB`}
                        orientation="right"
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="cpuPercent"
                        stroke="#8884d8"
                        dot={false}
                        strokeWidth={6}
                        name="CPU (%)"
                        animationDuration={0}
                        animationEasing='linear'
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="memoryMB"
                        stroke="#68ab82"
                        dot={false}
                        strokeWidth={6}
                        name="Memory (MB)"
                        animationDuration={0}
                        animationEasing='linear'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResourceChart;
