import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyCode from '../assets/CurrencyCode.json';
import profileImage from '../assets/image.png';
import { UserContext } from '../context/UserContext';

function Userinfo() {
    const { currency, setCurrency } = useContext(UserContext);
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('country', currency.country);
        localStorage.setItem('code', currency.code);
        
        navigate('/incomeandExpenses');
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const countryObj = CurrencyCode.find(item => item.country === selectedCountry);
        if (countryObj) {
            setCurrency({
                country: countryObj.country,
                code: countryObj.currency_code
            });
        } else {
            console.error('Selected country not found.');
        }
        console.log(currency)
    };

    return (
        <div className="flex flex-col h-screen md:w-1/2 w-11/12 shadow-xl shadow-gray-400 mt-4 mx-4 bg-white rounded-xl p-7 overflow-y-auto">
            <form onSubmit={submitForm}>
                <div className='flex justify-center mb-8'>
                    <img src={profileImage} alt='Profile' className='w-24 h-24 rounded-full border-2 border-gray-300' />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label className='block text-lg font-semibold'>Name:
                        <input
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                            type='text'
                            value={name}
                            placeholder='Enter Name'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className='block text-lg font-semibold mt-2'>Email:
                        <input
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                            type='email'
                            value={email}
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='flex flex-col'>
                    <label className='block text-lg font-semibold mb-2'>
                        Country:
                        <select
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                            value={currency.country}
                            onChange={handleCountryChange}
                        >
                            <option value="" disabled>Select a country</option>
                            {CurrencyCode.map((item, i) => (
                                <option key={i} value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </label>
                    <label className='block text-lg font-semibold mt-4'>
                        Currency Code:
                        <input
                            type='text'
                            placeholder='Currency Code'
                            value={currency.code}
                            readOnly
                            className='w-full mt-1 border border-gray-300 rounded-lg p-2'
                        />
                    </label>
                </div>
                <div className='flex justify-end'>
                    <button
                        className='m-4 p-4 w-1/4 bg-blue-400 text-white rounded-lg text-lg hover:cursor-pointer'
                        type='submit'
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Userinfo;
