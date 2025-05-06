import React, { useEffect, useState } from 'react'
import Sparkle from './effects/Sparkle'
import NumberInput from './NumberInput'
import { setMinReqSpeed } from '../api'

const CurrentVariables = ({ stats }) => {
    const [interval, setInterval] = useState(stats?.experimentVars?.minReqSpeed);

    useEffect(() => {
        setInterval(stats?.experimentVars?.minReqSpeed);
    }, [stats]);

    const changeInterval = async (e) => {
        const val = e.target.value;
        console.log(val);
        if (!val || val < 0 || val === '') {
            setInterval(val);
            return;
        }

        setInterval(val);
        await setMinReqSpeed(val);
    }

    return (
        <div className='flex flex-col items-center justify-between gap-2 h-full w-full bg-slate-400/20 rounded-2xl shadow-xl p-2 relative border-[1px] border-slate-400/30'>
            <div className='flex flex-col gap-2 items-center'>
                <h1 className='text-5xl font-bold underline decoration-wavy decoration-4 decoration-indigo-500 mb-3'>Übersicht</h1>
                {stats?.experimentVars?.status === 'running' &&
                    <div className='bg-green-600/10 border-[1px] border-green-600 rounded-2xl p-2 text-center'>
                        <h2 className='text-3xl font-bold text-green-800'>Läuft</h2>
                    </div>
                }
                {stats?.experimentVars?.status === 'stopped' &&
                    <div className='bg-red-600/10 border-[1px] border-red-600 rounded-2xl p-2 text-center'>
                        <h2 className='text-3xl font-bold text-red-800'>Gestoppt</h2>
                    </div>
                }
            </div>
            <div className='relative flex justify-center items-center'>
                {stats?.experimentVars?.ai &&
                    <>
                        <div className='absolute z-10'>
                            <Sparkle count={50} />
                        </div>
                        <h1
                            className="text-4xl font-bold backdrop-blur-sm rounded-xl px-4 py-2 z-20"
                        >
                            KI Aktiv
                        </h1>
                    </>
                }
                {!stats?.experimentVars?.ai &&
                    <>
                        <h1
                            className="text-4xl font-bold backdrop-blur-sm rounded-xl px-4 py-2 z-20"
                        >
                            KI Inaktiv
                        </h1>
                    </>
                }
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h2 className='text-3xl font-bold'>MinDelay/Anfrage:</h2>
                <NumberInput value={interval} onChange={(e) => { changeInterval(e) }} min={0.1} max={50} step={0.1} />
            </div>
        </div>
    )
}

export default CurrentVariables