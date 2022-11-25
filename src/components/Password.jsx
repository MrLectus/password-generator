import { useId } from "react";
import { useState } from "react"
import { FaRegCopy } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
function Password() {
    const [range, setRange] = useState(0);
    const [data, setData] = useState({ upper: false, lower: false, number: false, symbol: false, password: false });

    const [password, setPassword] = useState('');

    const { upper, lower, number, symbol } = data;

    const String = {
        'upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'lower': 'abcdefghijklmnopqrstuvwxyz',
        'number': '0123456789',
        'symbols': '!@#$%^&*()'
    }

    const upperCaseLetter = upper ? String.upper : "";
    const lowerCaseLetters = lower ? String.lower : "";
    const Numbers = number ? String.number : "";
    const Symbols = symbol ? String.symbols : "";

    const combined_password = upperCaseLetter + lowerCaseLetters + Numbers + Symbols;

    let value = '';

    const genPassword = (length) => {
        for (var i = 0; i <= length; i++) {
            let randomNumber = Math.floor(Math.random() * combined_password.length);
            value += combined_password.substring(randomNumber, randomNumber + 1);
        }
        setPassword(value);
    }

    const form = [
        { name: 'upper', text: "Include upper case letter", checked: upper },
        { name: 'lower', text: 'Include lower case letter', checked: lower },
        { name: 'number', text: 'Include number', checked: number },
        { name: 'symbol', text: 'Include symbol', checked: symbol }
    ]

    const tick = (event) => {
        const { name, checked } = event.target;
        setData(prevData => {
            console.log(prevData);
            return {
                ...prevData, [name]: checked
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
                    {form.map(checkbox => {
                        return (
                            <>
                                <label
                                    className='tracking-widest text-xs flex items-center cursor-pointer'
                                    htmlFor={checkbox.name}
                                >
                                    <input
                                        className='outline-none border-none w-5 h-5 cursor-pointer'
                                        onChange={tick} type="checkbox"
                                        id={checkbox.name}
                                        name={checkbox.name}
                                        checked={checkbox.checked}
                                    />&emsp;{checkbox.text}
                                </label><br />
                            </>
                        )
                    })}
                </div>
                <div className='my-4 h-10 flex flex-row items-center justify-between p-4 bg-neutral-900'>
                    <p className='font-bold text-neutral-700 tracking-wider'>STRENGTH</p>
                    <p>
                        {Array(4).map(_ => {
                            return (
                                <span key={useId()} className='mx-1 w-1 h-5 border border-white inline-block'></span>
                            )
                        })}
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
