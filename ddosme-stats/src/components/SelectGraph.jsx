import React from 'react'
import Button from './Button'
import { startExperiment, stopExperiment, toggleAI, toggleAutoReq } from '../api'

const SelectGraph = ({ setGraph, graph }) => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full bg-slate-400/20 border-[1px] border-slate-400/30 rounded-2xl shadow-xl p-2 gap-10'>
            <div className='flex flex-col gap-2 items-center justify-center p-5 pt-3 bg-red-600/20 rounded-2xl border-[1px] border-red-600'>
                <h2 className='text-2xl font-bold'>Steuerung</h2>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <Button text='Start' onClick={() => startExperiment()} col='red' />
                    <Button text='Stopp' onClick={() => stopExperiment()} col='red' />
                    <Button text='Toggle AI' onClick={() => toggleAI()} col='red' />
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center p-5 pt-3 bg-purple-600/10 rounded-2xl border-[1px] border-purple-600'>
                <h2 className='text-2xl font-bold'>Graphen auswählen</h2>
                <div className='flex gap-2 items-center justify-center'>
                    <Button text="Anfragen" onClick={() => setGraph("requests")} toggled={graph === "requests"} />
                    <Button text="Ressourcen" onClick={() => setGraph("resources")} toggled={graph === "resources"} />
                </div>
            </div>
        </div>
    )
}

export default SelectGraph