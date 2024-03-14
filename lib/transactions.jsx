import fs from 'fs'
import path from 'path';

export async function getTransactions() {
  // Fetch data from JSON
  const filePath = path.join(process.cwd(), 'data', 'transactions.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  // console.log("data------------>", data.transactions)
  return data.transactions;
}