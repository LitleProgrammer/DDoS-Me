import React from 'react'

const AttackButton = ({ attack, isAttacking }) => {
    return (
        <div>
            <button className={`${isAttacking ? 'bg-rose-600' : 'bg-blue-500'} ${isAttacking ? 'hover:bg-rose-700' : 'hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded-full text-2xl`} onClick={() => attack()}>
                {isAttacking ? 'Stop' : 'Start'}
            </button>
        </div>
    )
}

export default AttackButton