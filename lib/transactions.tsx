import data from '@/data/transacstions.json'
export interface Transaction {
  Data: string;
  time: string;
  Descricao: string;
  Prestador: string;
  image: string;
  Tipo: 'Depósito' | 'Retirada';
  Valor: number,
  id:number
};
export interface PaginatedTransactions {
  pageCount: number;
  transactions: Transaction[];
}

export async function getTransactions(pageSize: number, page: number): Promise<PaginatedTransactions> {
  // Fetch data from JSON

  const pageCount = Math.ceil(data.transactions.length / pageSize);
  let transactions: Transaction[] = [];
  const start = (page - 1) * pageSize;
  const end = Math.min(page * pageSize, data.transactions.length)

  for (let i = start; i < end; i++) {
    transactions.push(data.transactions[i] as Transaction)
  }
  return {
    transactions: transactions,
    pageCount: pageCount
  }
}
