import React from 'react'

const Button = ({ text = "", onClick = () => { }, col = 'purple', toggled = false }) => {
    return (
        <div>
            {col === 'purple' &&
                <button className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-150 ${toggled ? 'bg-purple-900' : ''}`} onClick={onClick}>{text}</button>
            }
            {col === 'red' &&
                <button className={`bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-150 ${toggled ? 'bg-red-900' : ''}`} onClick={onClick}>{text}</button>
            }
        </div>
    )
}

export default Button