'use client'
import { useState } from 'react';
import './card.css'
import './custome.css'
import custome from './custome.module.scss'
import clsx from 'clsx'
function Card() {

    const [expanding, setExpanding] = useState(false)
    const handler = () => {
        setExpanding(!expanding)
        console.log("handler Button Login", expanding)
    }

return (
    // <div className={`card ${custome.card}`}>
    <>
    <div className={clsx(`card`, {[custome.card] : expanding})}>
        Welcome
    </div>

    <button onClick={handler} className={clsx('text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2',
                {
                    'bg-red-500 hover:bg-red-600 focus:ring-red-300': expanding,
                    'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800': !expanding
                })}>

                    {expanding? 'Login' : 'Logout'}
                
    </button>
    </>
);
}

export default Card;