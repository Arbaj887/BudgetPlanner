import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyCode from '../assets/CurrencyCode.json';

function Review() {
    const navigate = useNavigate();

    
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const country = localStorage.getItem('country');
    const currencyCode = localStorage.getItem('code');
    const income = localStorage.getItem('income');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const remainingAmount = parseFloat(income) - totalExpenses;

    const handleSave = () => {
       
        alert('Your budget data has been saved successfully!');
    };

    return (
        <div className='flex flex-col h-screen md:w-1/2 w-11/12 shadow-xl shadow-gray-400 mt-4 mx-4 bg-white rounded-xl p-7 overflow-y-auto'>
            <div className='text-center mb-4 p-4 font-bold text-2xl md:text-3xl'>
                <h1>Review and Save</h1>
            </div>
            <div className='space-y-4 '>
                <div className='flex flex-col '>
                    <label className='block text-lg font-semibold flex flex-row  items-center  '>
                        Name:
                        <span className='block text-xl font-medium mx-4'>{name}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center '>
                        Email:
                        <span className='block text-xl font-medium mx-4'>{email}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center flex-start'>
                        Country:
                        <span className='block text-xl font-medium mx-4'>{country}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center '>
                        Currency Code:
                        <span className='block text-xl font-medium mx-4'>{currencyCode}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center '>
                        Monthly Income:
                        <span className='block text-xl font-medium mx-4'>{income}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center '>
                        Total Expenses:
                        <span className='block text-xl font-medium mx-4'>{totalExpenses.toFixed(2)}</span>
                    </label>
                    <label className='block text-lg font-semibold mt-2 flex flex-row  items-center '>
                        Remaining Amount:
                        <span className='block text-xl font-medium mx-4'>{remainingAmount.toFixed(2)}</span>
                    </label>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center my-8'>
                <button
                    className='m-2 p-4 bg-blue-400 text-white rounded-lg text-lg hover:bg-blue-500 transition-colors duration-300'
                    onClick={() => navigate('/summary')}  
                >
                    Edit
                </button>
                <button
                    className='m-2 p-4 bg-green-400 text-white rounded-lg text-lg hover:bg-green-500 transition-colors duration-300'
                    onClick={() => {
                        handleSave();
                        navigate('/');  
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default Review;
