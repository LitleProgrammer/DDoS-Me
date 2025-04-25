import React, { useState, useEffect } from 'react';
import './Sparkle.css'; // You’ll need this for animations

const PURPLE_COLORS = ['#7f5af0', '#6246ea', '#3a0ca3', '#ad97f0', '#b646cf'];
const BLUE_COLORS = ['#3b82f6', '#60a5fa', '#2563eb', '#1e40af', '#93c5fd', '#38bdf8'];
const RED_COLORS = ['#ff4d4d', '#e63946', '#ff6b6b', '#d90429', '#f87171', '#fb7185'];
const GREEN_COLORS = ['#22c55e', '#10b981', '#4ade80', '#16a34a', '#6ee7b7', '#34d399'];
const YELLOW_COLORS = ['#fde047', '#facc15', '#fbbf24', '#eab308', '#fcd34d', '#fef08a'];


const Sparkle = ({ count = 20, radius = 100 }) => {
    const sparkles = Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 200 - 100; // Random X from -100 to 100
        const y = Math.random() * 200 - 100; // Random Y from -100 to 100
        const color = PURPLE_COLORS[i % PURPLE_COLORS.length];
        const size = Math.random() * 4 + 2;
        const duration = (Math.random() * 2 + 1.5).toFixed(2); // 2s to 2.5s    

        return (
            <div
                key={i}
                className="sparkle absolute top-1/2 left-1/2 w-2 h-2 rounded-full blur-xs opacity-70 animate-ping"
                style={{
                    backgroundColor: color,
                    animationDuration: `${duration}s`,
                    '--x': `${x}px`,
                    '--y': `${y}px`,
                    scale: `${size}px`,
                }}
            />
        );
    });

    return (
        <div className="relative w-64 h-64 overflow-visible pointer-events-none">
            {sparkles}
        </div>
    );
};

export default Sparkle;
