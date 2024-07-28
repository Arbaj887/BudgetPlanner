import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CurrencyCode from '../assets/CurrencyCode.json';

function Summary() {
    const navigate = useNavigate();
    const [remainingAmount, setRemainingAmount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpens, setTotalExpens] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencyFrom, setCurrencyFrom] = useState({
        country: localStorage.getItem('country') || 'United States',
        code: localStorage.getItem('code') || 'USD'
    });
    const [currencyTo, setCurrencyTo] = useState({
        country: localStorage.getItem('country') || 'United States',
        code: localStorage.getItem('code') || 'USD'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_CURRENCY = currencyFrom.code;
    const TARGET_CURRENCY = currencyTo.code;

    //-------------------------------submit---------------------------------------------
    const goTOReview = () => {
        navigate('/review');
    };

    const fetchExchangeRate = async () => {
        if (BASE_CURRENCY === TARGET_CURRENCY) {
            // If currencies are the same, set exchange rate to 1 and exit
            setLoading(false);
            setExchangeRate(1);
            return;
        }

        setLoading(true);
        setError(null);  // Clear any previous error
        try {
            const response = await fetch(`https://api.frankfurter.app/latest?from=${BASE_CURRENCY}&to=${TARGET_CURRENCY}`);
            if (response.ok) {
                const data = await response.json();
                if (data.rates && data.rates[TARGET_CURRENCY]) {
                    setExchangeRate(data.rates[TARGET_CURRENCY]);
                } else {
                    setError('Exchange rate data is not available.');
                    setExchangeRate(1); // Fallback to 1 if exchange rate is not available
                }
            } else {
                setError('Error fetching exchange rate: ' + response.statusText);
                setExchangeRate(1);
            }
        } catch (error) {
            setError('Error fetching exchange rate.');
            console.error('Error fetching exchange rate:', error);
            setExchangeRate(1);
        } finally {
            setLoading(false);
        }
    };

    const remaining = async () => {
        try {
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            let totalExpenses = 0;
            expenses.forEach(item => {
                totalExpenses += parseFloat(item.amount) || 0;
            });

            const income = parseFloat(localStorage.getItem('income')) || 0;
            setTotalIncome(income);
            setTotalExpens(totalExpenses);
            setRemainingAmount(income - totalExpenses);
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        }
    };

    const convertFrom = (e) => {
        const selectedCountry = e.target.value;
        const countryObj = CurrencyCode.find(item => item.country === selectedCountry);
        if (countryObj) {
            setCurrencyFrom({
                country: countryObj.country,
                code: countryObj.currency_code
            });
        }
    };

    const convertTo = (e) => {
        const selectedCountry = e.target.value;
        const countryObj = CurrencyCode.find(item => item.country === selectedCountry);
        if (countryObj) {
            setCurrencyTo({
                country: countryObj.country,
                code: countryObj.currency_code
            });
        }
    };

    useEffect(() => {
        remaining();
        fetchExchangeRate();
    }, [currencyFrom.code, currencyTo.code]);

    const convertToTargetCurrency = (amount) => {
        return (amount * exchangeRate).toFixed(2);
    };

    return (
        <div className='flex flex-col h-screen md:w-1/2 w-full shadow-xl shadow-gray-400 mt-4 mx-4 bg-white rounded-xl p-4 md:p-8 lg:p-12 overflow-y-auto'>
            <div className='text-center mb-4 p-4 font-bold text-2xl md:text-3xl'>
                <h1>Budget Summary</h1>
            </div>
            {loading && <p className='text-center text-blue-500'>Loading exchange rates...</p>}
            {error && <p className='text-center text-red-500'>{error}</p>}
            <div className='space-y-4'>
                <div className='flex flex-col my-4 mb-8'>
                    <label className='block text-lg font-semibold text-center text-xl'>Currency Converter</label>
                    <label className='block text-lg font-semibold' htmlFor='currencyFrom'>
                        From:
                        <select
                            id='currencyFrom'
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                            value={currencyFrom.country}
                            onChange={convertFrom}
                            aria-label="Select source currency"
                        >
                            {CurrencyCode.map((item, i) => (
                                <option key={i} value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </label>
                    <label className='block text-lg font-semibold' htmlFor='currencyTo'>
                        To:
                        <select
                            id='currencyTo'
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                            value={currencyTo.country}
                            onChange={convertTo}
                            aria-label="Select target currency"
                        >
                            {CurrencyCode.map((item, i) => (
                                <option key={i} value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <label className='block text-lg font-semibold'>
                        Total Income ({TARGET_CURRENCY}):
                        <span className='block text-xl font-medium'>{convertToTargetCurrency(totalIncome)}</span>
                    </label>
                    <label className='block text-lg font-semibold'>
                        Total Expenses ({TARGET_CURRENCY}):
                        <span className='block text-xl font-medium'>{convertToTargetCurrency(totalExpens)}</span>
                    </label>
                </div>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <label className='block text-lg font-semibold'>
                        Remaining Amount ({TARGET_CURRENCY}):
                        <span className='block text-xl font-medium'>{convertToTargetCurrency(remainingAmount)}</span>
                    </label>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center my-8'>
                <Link to='/incomeandExpenses' className='float-right m-4 p-4 w-1/4 bg-blue-400 text-white rounded-lg text-lg hover:cursor-pointer text-center'>
                    <button>Back</button>
                </Link>

                <button
                    className='float-right m-4 p-4 w-1/4 bg-blue-400 text-white rounded-lg text-lg hover:cursor-pointer text-center'
                    onClick={goTOReview}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Summary;
