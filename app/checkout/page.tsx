"use client"
import React, { useState, useMemo } from 'react';

const initialUserData = {
    username: 'elona',
    displayName: 'Elona',
    profilePicture: 'https://placehold.co/128x128/fde047/1f2937?text=E',
    galaPrice: 500,
    currency:"NGN", // Price in Naira
    supporters: [
        { id: 1, name: 'Alex', amount: 200, message: 'Loved your latest project! Keep it up.' },
        { id: 2, name: 'Brenda', amount: 500, message: 'Here are five galas! Thanks for the help.' },
        { id: 3, name: 'Charlie', amount: 100, message: 'Amazing work!' },
        { id: 4, name: 'Diana', amount: 300, message: 'Three galas for the best creator!' },
    ],
};

export default function WithdrawPage({ user=initialUserData }:{user:any}) {
    const totalEarnings = useMemo(() => user.supporters.reduce((acc:any, s:any) => acc + s.amount, 0), [user.supporters]);

    const handleWithdraw = (e:any) => {
        e.preventDefault();
        const confirmationMessage = document.getElementById('withdraw-confirmation');
        if (confirmationMessage) {
            confirmationMessage.classList.remove('hidden');
            setTimeout(() => confirmationMessage.classList.add('hidden'), 5000);
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Withdraw Funds</h1>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8" role="alert">
                <p className="font-bold">Available Balance</p>
                <p className="text-3xl">₦{totalEarnings.toLocaleString()}</p>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">Bank Details</h2>
                <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <select id="bankName" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                        <option>Select your bank...</option>
                        <option>Access Bank</option>
                        <option>First Bank</option>
                        <option>Guaranty Trust Bank (GTB)</option>
                        <option>Kuda Bank</option>
                        <option>Opay</option>
                        <option>Palmpay</option>
                        <option>United Bank for Africa (UBA)</option>
                        <option>Zenith Bank</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input type="text" id="accountNumber" required pattern="\d{10}" title="Please enter a 10-digit account number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" placeholder="0123456789" />
                </div>
                 <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                    <input type="text" id="accountName" required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" value={user.displayName} readOnly />
                </div>
                 <div className="pt-4">
                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-700 transition" disabled={totalEarnings <= 0}>
                        Withdraw ₦{totalEarnings.toLocaleString()}
                    </button>
                </div>
            </form>
            <div id="withdraw-confirmation" className="hidden mt-6 text-center p-3 bg-blue-100 text-blue-800 rounded-lg">
                Withdrawal request submitted! Funds will be processed within 24 hours.
            </div>
        </div>
    );
}
