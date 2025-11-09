
import React, { useState } from 'react';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');

    const handleButtonClick = (value: string) => {
        if (value === 'C') {
            setDisplay('0');
            setExpression('');
        } else if (value === '=') {
            try {
                // Using Function constructor for safe eval-like behavior
                const result = new Function('return ' + expression)();
                setDisplay(String(result));
                setExpression(String(result));
            } catch (error) {
                setDisplay('Error');
                setExpression('');
            }
        } else {
            if (display === '0' || display === 'Error') {
                setDisplay(value);
                setExpression(value);
            } else {
                setDisplay(display + value);
                setExpression(expression + value);
            }
        }
    };

    const buttons = [
        'C', '/', '*', '-',
        '7', '8', '9', '+',
        '4', '5', '6',
        '1', '2', '3', '=',
        '0', '.',
    ];
    
    // FIX: Explicitly type the Button component as a React.FC to allow the 'key' prop.
    const Button: React.FC<{ value: string }> = ({ value }) => {
        const isOperator = ['/', '*', '-', '+', '='].includes(value);
        const isClear = value === 'C';
        let style = "bg-gray-200 hover:bg-gray-300";
        if(isOperator) style = "bg-sahaara-amber hover:bg-sahaara-amber-dark text-white";
        if(isClear) style = "bg-sahaara-red hover:bg-sahaara-red-dark text-white";
        if(value === '=') style += " col-span-2";
        if(value === '0') style += " col-span-2";

        return (
            <button onClick={() => handleButtonClick(value)} className={`p-4 rounded-lg text-xl font-bold transition-colors ${style}`}>
                {value}
            </button>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-xs mx-auto bg-white rounded-2xl shadow-2xl p-4 space-y-4">
                <div className="bg-gray-800 text-white text-4xl text-right p-4 rounded-lg break-all">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {buttons.map(btn => <Button key={btn} value={btn} />)}
                </div>
            </div>
        </div>
    );
};

export default Calculator;