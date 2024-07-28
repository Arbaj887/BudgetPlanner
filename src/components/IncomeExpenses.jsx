import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

function IncomeExpenses() {
    const navigate=useNavigate()
    const [income, setIncome] = useState(localStorage.getItem('income') || 0);
    const [list, setList] = useState(false);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenses, setExpenses] = useState([]);

    const toggleList = () => setList(prevList => !prevList);


    const goTOSummary=(e)=>{
        e.preventDefault()
        localStorage.setItem('income',income)
        navigate('/summary')
        
    }

    const handleAddExpense = (e) => {
        e.preventDefault();

        
        const amount = parseFloat(expenseAmount);
        if (!expenseName || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid expense name and amount.');
            return;
        }

        const newExpense = { name: expenseName, amount };
        const updatedExpenses = [...expenses, newExpense];
        try {
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }

        setExpenseName('');
        setExpenseAmount('');
        toggleList();
    };

    useEffect(() => {
        try {
            const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
            
            const validExpenses = storedExpenses.map(exp => ({
                name: exp.name,
                amount: typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount)
            }));
            setExpenses(validExpenses);
        } catch (error) {
            console.error("Error reading from localStorage:", error);
        }
    }, []);

    const handleDeleteExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        try {
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Error deleting from localStorage:", error);
        }
    };

    return (
        <div className='flex flex-col h-screen md:w-1/2 w-11/12 shadow-xl shadow-gray-400 mt-4 mx-4 bg-white rounded-xl p-7 scroll-smooth overflow-y-auto'>
            <div className='text-center m-4 mt-2 p-8 font-bold text-3xl'>
                <h1>Income and Expenses</h1>
            </div>
            <div>
                <label className='block text-lg font-semibold'>
                    Monthly Income:
                    <input
                        className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                        type='number'
                        placeholder='Enter Monthly Income'
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </label>
            </div>
            <div className='my-8 p-8 w-full'>
                <button
                    className='flex flex-row bg-pink-300 text-2xl px-8 py-4 rounded-xl items-center hover:bg-pink-500'
                    onClick={toggleList}
                >
                    Add Expenses
                    <span>
                        <GoPlus className='mx-2' />
                    </span>
                </button>
            </div>
            {list && (
                <div className='absolute flex flex-col h-1/2 md:w-1/2 w-11/12 shadow-xl shadow-gray-400 bg-white rounded-xl p-7 scroll-smooth overflow-y-auto'>
                    <form onSubmit={handleAddExpense}>
                        <RxCross1 className='float-end m-2 text-2xl hover:cursor-pointer' onClick={toggleList} />
                        <label className='block text-lg font-semibold'>
                            Expense Name:
                            <input
                                className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                                type='text'
                                value={expenseName}
                                placeholder='Enter Expense Name'
                                onChange={(e) => setExpenseName(e.target.value)}
                                required
                            />
                        </label>
                        <label className='block text-lg font-semibold mt-2'>
                            Amount:
                            <input
                                className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                                type='number'
                                value={expenseAmount}
                                placeholder='Enter Amount'
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                required
                            />
                        </label>
                        <button
                            type='submit'
                            className='m-8 flex flex-row bg-pink-300 text-xl px-8 py-4 rounded-xl items-center hover:bg-pink-500'
                        >
                            Add To Expense
                            <span>
                                <GoPlus className='mx-2' />
                            </span>
                        </button>
                    </form>
                </div>
            )}
            <div>
                <h2 className='text-xl font-semibold mt-4'>Expenses List:</h2>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr>
                            <th className='border px-4 py-2'>Expense Name</th>
                            <th className='border px-4 py-2'>Amount</th>
                            <th className='border px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index} className='text-center'>
                                <td className='border px-4 py-2'>{expense.name}</td>
                                <td className='border px-4 py-2'>{expense.amount.toFixed(2)}</td>
                                <td className='border px-4 py-2 bg-red-500'>
                                    <button onClick={() => handleDeleteExpense(index)}>
                                        <RiDeleteBin5Line className='text-xl w-full'/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-row justify-center items-center my-4'>
            <Link to='/' className='float-right m-4 p-4 w-1/4 bg-blue-400 text-white rounded-lg text-lg hover:cursor-pointer text-center'>
                <button  >Back</button>
                </Link>
                   
                <button  className='float-right m-4 p-4 w-1/4 bg-blue-400 text-white rounded-lg text-lg hover:cursor-pointer text-center'
                onClick={goTOSummary}> Next</button>
                
            </div>
        </div>
    );
}

export default IncomeExpenses;
