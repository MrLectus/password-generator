import { useState } from "react"
import { FaRegCopy } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
function Password() {
    const [range, setRange] = useState(0);
    const [data, setData] = useState({upper: false, lower: false, number: false, symbol: false, password: false});
    const [password, setPassword] = useState('');
    
    const {upper, lower, number, symbol} = data;
    const upperCase = upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const lowerCase = lower ? "abcdefghijklmnopqrstuvwxyz" : "";
    const x_number = number ? "0123456789" : "";
    const x_symbol = symbol ? "!@#$%^&*()" : "";

    const combined_password = upperCase + lowerCase + x_number + x_symbol;

    let value = '';

    const genPassword = (length) => {
        for (var i = 0; i <= length; i++) {
            let randomNumber = Math.floor(Math.random() * combined_password.length);
            value += combined_password.substring(randomNumber, randomNumber + 1);
        }
        setPassword(value);
    }
    
    const tick = (event) => {
        setData(prevData => {
            return {
                ...prevData, [event.target.name]: !JSON.parse(event.target.value)
            }
        })
    }
    return (
        <div className='flex flex-col p-2 text-white'>
            <h1 className='text-center text-gray-400 font-bold tracking-wider'>Password Generator</h1>
            <div className='mt-4'>
                <div className='bg-neutral-800 drop-shadow-md h-12 w-96 flex flex-row items-center p-4 justify-between'>
                    <span className='text-neutral-700 text-bolder text-xl'>{password ? password : 'P4$5WOrD!'}</span>
                    <FaRegCopy title='copy to clipboard' onClick={() => navigator.clipboard.writeText(password)} />
                </div>
            </div>
            <div className='bg-neutral-800 p-4 rounded-sm mt-4 drop-shadow-md'>
                <div className='my-4'>
                    <div className='flex my-4 flex-row justify-between'>
                        <p className='tracking-wider'>Character Length</p> <span>{range}</span>
                    </div>
                    <input onChange={(e) => setRange(e.target.value)} type="range" value={range} min='0' max='23' className='w-full appearance-none bg-black h-2 rounded-lg cursor-pointer outline-none border-none' />
                </div>
                <div className='flex flex-col'>
                    <label className='tracking-widest text-xs flex items-center cursor-pointer' htmlFor='upper' > <input className='outline-none border-none w-5 h-5 cursor-pointer' onChange={(event) => tick(event)} type="checkbox" id="upper" name="upper" value={upper} />&emsp;Include Uppercase Letters</label><br />
                    <label className='tracking-widest text-xs flex items-center cursor-pointer' htmlFor='lower' > <input className='outline-none border-none w-5 h-5 cursor-pointer' onChange={(event) => tick(event)} type="checkbox" id="lower" name="lower" value={lower} />&emsp;Include Lowercase Letters</label><br />
                    <label className='tracking-widest text-xs flex items-center cursor-pointer' htmlFor='number' > <input className='outline-none border-none w-5 h-5 cursor-pointer' onChange={(event) => tick(event)} type="checkbox" id="number" name="number" value={number} />&emsp;Include Numbers</label><br />
                    <label className='tracking-widest text-xs flex items-center cursor-pointer' htmlFor='symbol' > <input className='outline-none border-none w-5 h-5 cursor-pointer' onChange={(event) => tick(event)} type="checkbox" id="symbol" name="symbol" value={symbol} />&emsp;Include Symbols</label><br />
                </div>
                <div className='my-4 h-10 flex flex-row items-center justify-between p-4 bg-neutral-900'>
                    <p className='font-bold text-neutral-700 tracking-wider'>STRENGTH</p>
                    <p>
                        <span className='mx-1 w-1 h-5 border border-white inline-block'></span>
                        <span className='mx-1 w-1 h-5 border border-white inline-block'></span>
                        <span className='mx-1 w-1 h-5 border border-white inline-block'></span>
                        <span className='mx-1 w-1 h-5 border border-white inline-block'></span>
                    </p>
                </div>
                <div>
                    <button onClick={() => genPassword(range)} className='h-10 tracking-wider p-2 flex flex-row justify-center items-center bg-green-200 text-black w-full outline-none border-none font-bold'>GENERATE&emsp;<FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}

export default Password
