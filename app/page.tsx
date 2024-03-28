"use client"

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Select, Popover, MenuProps, Checkbox } from "antd";

import { getTransactions } from '@/lib/transactions'
import FinancialCard from '@/components/FinancialCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { FormatDate, DetailedDate } from '@/components/FormatDate';
import FormatValue from '@/components/FormatValue';
import PaginationBar from '@/components/PaginationBar';
import Detail from '@/components/Detail';
import { Transaction } from '@/lib/transactions';
import Calendar from '@/components/CalendarPopup';
import Semanal from '@/components/Semanal';
import Mensal from '@/components/Mensal'
import Custom from '@/components/Custom'

interface PageProps {
  searchParams: { page?: string };
}

const PAGE_SIZE = 10;

export default function HomePage({ searchParams }: PageProps) {
  const [clicked, setClicked] = useState(false)
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [downloadbutton, setDownloadbutton] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [transaction, setTransaction] = React.useState<Transaction | undefined>(undefined);
  const [periodOption, setPeriodOption] = React.useState<string | undefined>("Semanal");
  const [tipo, setTipo] = React.useState<string | undefined>(undefined);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = React.useState<boolean>(false);
  const [searchExtend, setSearchExtend] = React.useState<boolean>(false);

  const page = searchParams.page ? parseInt(searchParams.page) : 1


  const showDrawer = (_transaction: Transaction) => {
    setTransaction(_transaction);
    setClicked(true)
  }

  const handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeriodOption(e.target.value);
  }
  React.useEffect(() => {
    (async () => {
      const { transactions, pageCount } = await getTransactions(PAGE_SIZE, page);
      setTransactions(transactions);
      setPageCount(pageCount);
    })();
  }, [page]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='flex  flex-row rounded-lg bg-white items-center'>
          <svg width={24} height={24}><use href='#svg-left-arrow' /></svg>
          <p className='text-xs mx-5'>02/05/22 à 08/05/22</p>
          <svg width={24} height={24}><use href='#svg-right-arrow' /></svg>
        </div>
      ),
    }
  ];

  return (
    <>
      <div className={`flex flex-row ${clicked ? 'bg-opacity-50 bg-gray-600' : ''}`}>
        <div className='w-[88px] hidden lg:block'>
          <Sidebar />
        </div>
        <div className='flex-grow bg-[#F3F3F5]'>
          <Navbar />
          <div className='flex items-center p-3 mx-2 gap-3'>
            <p className='font-bold text-xl flex flex-grow'>Extracto</p>
            <button onClick={() => setSearchExtend(!searchExtend)}>
              <svg width={40} height={40} className='block md:hidden'><use href='#svg-collapse' /></svg>
            </button>

            <div className="hidden sm:block">
              {" "}
              <div className="flex flex-row gap-2 ">
                {
                  periodOption === "Semanal" ? <Semanal /> : (periodOption === "Mensal" ? <Mensal /> : <Custom />)
                }
                {/* <div className='relative flex flex-row justify-between rounded-lg bg-white border border-[#DDDEE3] py-2 items-center w-[151px]'> */}
                {/* <div className='flex justify-between items-center w-full h-full pr-3' onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}>
                    <p className='text-sm mx-auto'>Todo Período</p>
                    <svg width={24} height={24}><use href='#svg-down-arrow' /></svg>
                  </div> */}
                <div className="max-w-sm mx-auto">
                  <select
                    id="periods"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handlePeriodChange}
                    value={periodOption}
                  >
                    <option selected disabled>Todo Período</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                </div>
                {/* <div id="dropdown" className={`absolute bottom-0 z-1 translate-y-[103%] bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 ${!isPeriodDropdownOpen && 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <div className='relative'>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setPeriodOption("Semanal")}>Semanal</div>
                      </div>
                      <div className='relative'>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mensal</a>
                      </div>

                      <Calendar />
                    </ul>
                  </div> */}
                {/* </div> */}
                <Select value={tipo} size='large'
                  onChange={(value: string) => {
                    setTipo(value);
                  }}
                  defaultValue="Tipo de transação"
                >
                  {/* <Select.Option value="tipo de transaco">Tipo de transaco</Select.Option> */}
                  <Select.Option value="Deposito"><Checkbox /> Deposito</Select.Option>
                  <Select.Option value="Pagemento Job"><Checkbox /> Pagemento Job</Select.Option>
                </Select>
              </div>
            </div>

            <div className='relative mt-2'>
              <button onClick={() => { setDownloadbutton(!downloadbutton) }}>
                <svg width={40} height={40}><use href='#svg-download' /></svg>
              </button>
              {downloadbutton && (<>
                <div className='flex flex-col w-28 bg-white rounded-sm absolute top-[40px] right-0'>
                  <button className=' p-2 text-left'>PDF</button>
                  <button className=' p-2 text-left'>Excel</button>
                </div>
              </>
              )}
            </div>
          </div>
          {searchExtend && (
            <div className="block md:hidden m-4">
              <div className="flex flex-col w-full gap-2">
                <div className='relative flex flex-row justify-between rounded-lg bg-white border border-[#DDDEE3] py-2 items-center z-50'>
                  <div className='flex justify-between items-center w-full h-full pr-3' onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}>
                    <p className='text-md mx-5'>Semanal</p>
                    <svg width={24} height={24}><use href='#svg-down-arrow' /></svg>
                  </div>

                  <div id="dropdown" className={`absolute bottom-0 z-1 translate-y-[103%] bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 ${!isPeriodDropdownOpen && 'hidden'}`}>
                    <ul className="mx-5 py-2 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li onClick={() => setIsPeriodDropdownOpen(false)}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Todo Período</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Semanal</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mensal</a>
                      </li>
                      <Calendar />
                    </ul>
                  </div>
                </div>
                <Select value={tipo} size='large'
                  onChange={(value: string) => {
                    setTipo(value);
                  }}
                  defaultValue="Tipo de transação"
                >
                  {/* <Select.Option value="tipo de transaco">Tipo de transaco</Select.Option> */}
                  <Select.Option value="Deposito"><Checkbox /> Deposito</Select.Option>
                  <Select.Option value="Pagemento Job"><Checkbox /> Pagemento Job</Select.Option>
                </Select>

              </div>
            </div>
          )}
         
          <div className='flex flex-row overflow-x-auto w-[calc(100vw-8px)] md:w-[calc(100vw-96px)] gap-4 '>
            <FinancialCard
              svg={"#svg-transacoes"}
              text={"Qtd. Transações"}
              value="250"
            />
            <FinancialCard
              svg={"#svg-saldo"}
              text={"Saldo Inicial"}
              value="R$ 1.500,00"
            />
            <FinancialCard
              svg={"#svg-entradas"}
              text={"Entradas (R$)"}
              value="R$ 1.500,00"
            />
            <FinancialCard
              svg={"#svg-saidas"}
              text={"Saídas (R$)"}
              value="R$ 3.500,00"
            />
            <FinancialCard
              svg={"#svg-total"}
              text={"Total"}
              value="R$ 1.500,00"
            />
            <FinancialCard
              svg={"#svg-saldo-final"}
              text={"Saldo Final"}
              value="R$ 2.000,00"
            />
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex-l px-1 md:px-5'>
              <div className='hidden md:block'>
                <div className='grid grid-cols-12 gap-2'>
                  <p className='col-span-2 text-sm font-bold p-4'>Data</p>
                  <p className='col-span-4 text-sm font-bold p-4'>Descrição</p>
                  <p className='col-span-2 text-sm font-bold p-4'>Prestador</p>
                  <p className='col-span-1 text-sm font-bold p-4'>Tipo</p>
                  <p className='col-span-2 text-sm font-bold p-4 text-center'>Valor</p>
                </div>
              </div>
              <div>
                <Detail clicked={clicked} setClicked={setClicked} transaction={transaction} />
              </div>
              {transactions.map((_transaction: Transaction, index) => (
                <div>
                  <div className='hidden md:block'>
                    <div key={index} className="w-full grid grid-cols-12 bg-white my-1 py-1">
                      <p className='col-span-2 text-sm p-2 flex flex-row items-center gap-2'>
                        <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                        <FormatDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                      </p>
                      <p className='col-span-4 text-sm p-2 flex items-center'>{_transaction.Descricao}</p>
                      <p className='col-span-2 text-sm p-2 flex items-center'>
                        {_transaction.Tipo === 'Retirada' ? (
                          <div className='flex flex-row gap-2 items-center'>
                            <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                            <p className='text-sm'>{_transaction.Prestador}</p>
                          </div>) : (<div></div>)}
                      </p>
                      <p className={`col-span-1 text-sm my-1 p-1 rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                      <p className={`col-span-2 text-sm p-2 font-bold ml-auto mr-6 flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <FormatValue value={_transaction.Valor} />
                      </p>
                      <p className='col-span-1 text-sm p-2 ml-auto mr-2 flex items-center'>
                        <button onClick={() => showDrawer(_transaction)}>
                          <svg width={24} height={24}><use href='#svg-detail' /></svg>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className='block md:hidden' onClick={() => showDrawer(_transaction)}>
                    <div key={index} className="w-full mx-auto bg-white my-2 rounded-lg">
                      <p className='text-md px-4 py-2 flex items-center'>{_transaction.Descricao}</p>
                      <div className='flex flex-row mx-6 my-4 justify-between '>
                        <p className='text-md flex flex-row items-center gap-2'>
                          <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                          <DetailedDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                        </p>
                        <p className='text-md pr-4 pb-2 flex items-center '>
                          {_transaction.Tipo === 'Retirada' ? (
                            <div className='flex flex-row gap-2 items-center'>
                              <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                              <p className='text-sm'>{_transaction.Prestador}</p>
                            </div>) : (<div></div>)}
                        </p>
                      </div>
                      <div className='flex flex-row justify-between mx-4 py-4 border-t-2 border-gray-300'>
                        <p className={`text-md my-1 p-1 rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                        <p className={`text-md p-2 font-bold  flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <FormatValue value={_transaction.Valor} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='md:ml-auto md:mr-10 mt-4 mx-auto mb-1'>
              <PaginationBar href="/" page={page} pageCount={pageCount} />
            </div>
          </div>
        </div>
      </div >
    </>
  );
};



