
import React from 'react';
import { getTransactions } from '@/lib/transactions'

// Define the type for transactions
type Transaction = {
  effectedAt: string;
  value: number;
  description: string;
};

export default async function Homepage() {
  //Get transactions 
  const transactions = await getTransactions();

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-bold mb-4">Transaction Extract</h1>
      <div className="flex justify-center items-center">
        <table className="max-w-xl table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody >
          {transactions.map((transaction: Transaction, index: number) => (
            <tr key={index} className="w-full ">
              <td className="border text-center px-4 py-2 ">{transaction.effectedAt}</td>
              <td className="border text-center px-4 py-2">{transaction.description}</td>
              <td className={`border text-center px-4 py-2 ${transaction.value >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {transaction.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

