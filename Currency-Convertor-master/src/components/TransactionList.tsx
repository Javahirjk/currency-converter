import React from 'react';

export type Transaction = {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    result: number;
    date: string;
};
type TransactionListProps = {
    transactions: Transaction[];
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => (
    <div className="space-y-4">
        <div className="bg-orange-200 p-4">
            <h1 className="text-2xl font-bold">Transaction</h1>
        </div>
        {transactions.map((transaction, index) => (
            <div key={index} className="p-4 border rounded shadow">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">From: {transaction.fromCurrency}  Amount: {transaction.amount}</p>
                        <p className="text-sm text-gray-500">Date: {transaction.date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">To: {transaction.toCurrency}</p>
                        <p className="text-sm text-gray-500">Amount: {transaction.result}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default TransactionList;