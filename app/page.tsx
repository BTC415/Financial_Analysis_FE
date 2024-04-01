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
        <div className='flex  flex-row rounded-[10rem] bg-white items-center'>
          <svg width={24} height={24}><use href='#svg-left-arrow' /></svg>
          <p>02/05/22 à 08/05/22</p>
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
        <div className='flex-grow bg-[#F3F3F5] md:none relative w-full'>
          <Navbar />
          <div className='flex items-center p-[2rem] mx-[2rem] gap-[2rem] px-[1rem] md:px-[3rem]'>
            <p className='font-bold text-[4rem] flex flex-grow'>Extracto</p>
            <button onClick={() => setSearchExtend(!searchExtend)}>
              <svg width={30} height={30} className='block md:hidden'><use href='#svg-collapse' /></svg>
            </button>

            <div className="hidden md:block">
              {" "}
              <div className="flex flex-row gap-[2rem] ">
                {
                  periodOption === "Semanal" ? <Semanal /> : (periodOption === "Mensal" ? <Mensal /> : <Custom />)
                }
                {/* <div className='relative flex flex-row justify-between rounded-lg bg-white border border-[#DDDEE3] py-2 items-center w-[151px]'> */}
                {/* <div className='flex justify-between items-center w-full h-full pr-3' onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}>
                    <p className='text-sm mx-auto'>Todo Período</p>
                    <svg width={24} height={24}><use href='#svg-down-arrow' /></svg>
                  </div> */}
                
                <Select value={periodOption} 
                  onChange={(value: string) => {
                    setPeriodOption(value);
                  }}
                >
                  <Select.Option value="Semanal">Semanal</Select.Option>
                  <Select.Option value="Mensal">Mensal</Select.Option>
                  {/* <Select.Option value="Deposito">Deposito</Select.Option> */}
                  <Select.Option value="Personalizado">Personalizado</Select.Option>
                  {/* <Select.Option value="Pagemento Job">Pagemento Job</Select.Option> */}
                </Select>
                
               
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
                <Select value={tipo}
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
                <svg width={30} height={30}><use href='#svg-download' /></svg>
              </button>
              {downloadbutton && (<>
                <div className='flex flex-col w-[70px] bg-gray rounded-[1rem] absolute top-[30px] right-0 border-[2px] z-2'>
                  <button className=' p-[1rem] text-left text-[3rem]'>PDF</button>
                  <button className=' p-[1rem] text-left text-[3rem]'>XLS</button>
                </div>
              </>
              )}
            </div>
          </div>
          {searchExtend && (
            <div className="block md:hidden">
              <div className="flex flex-col w-full gap-[2rem]">
                <div className='relative flex flex-row justify-between rounded-[1rem] bg-white border border-[#DDDEE3] py-2 items-center z-1'>
                  <div className='flex justify-between items-center w-full h-full pr-3' onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}>
                    <p className='text-[2rem] mx-5'>Semanal</p>
                    <svg width={24} height={24}><use href='#svg-down-arrow' /></svg>
                  </div>
                </div>                
                <Select value={tipo} 
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
         
          <div className='flex sm:w-full w-[100%] overflow-x-auto flow scroll-smooth sm:px-[3rem] px-[3rem]'>
            <div className='flex gap-[2rem] md:w-full w-[200rem] justify-between'>
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
          </div>
          <div className='flex flex-col'>
            <div className='flex-l px-[1rem] md:px-[3rem]'>
              <div className='hidden md:block'>
                <div className='grid grid-cols-12 gap-[2rem]'>
                  <p className='col-span-2 text-[3rem] font-bold p-[2rem]'>Data</p>
                  <p className='col-span-4 text-[3rem] font-bold p-[2rem]'>Descrição</p>
                  <p className='col-span-2 text-[3rem] font-bold p-[2rem]'>Prestador</p>
                  <p className='col-span-1 text-[3rem] font-bold p-[2rem]'>Tipo</p>
                  <p className='col-span-2 text-[3rem] font-bold p-[2rem] text-center'>Valor</p>
                </div>
              </div>
              <div>
                <Detail clicked={clicked} setClicked={setClicked} transaction={transaction} />
              </div>
              {transactions.map((_transaction: Transaction, index) => (
                <div id='card'>
                  <div className='hidden md:block'>
                    <div key={index} className="w-full grid grid-cols-12 bg-white my-[1rem] py-[1rem] items-center" onClick={() => showDrawer(_transaction)}>
                      <p className='col-span-2 text-[3rem] p-[1rem] flex flex-row items-center gap-[2rem]'>
                        <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                        <FormatDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                      </p>
                      <p className='col-span-4 text-[2rem] p-[1rem] flex items-center'>{_transaction.Descricao}</p>
                      <p className='col-span-2 text-[2rem] p-[1rem] flex items-center'>
                        {_transaction.Tipo === 'Retirada' ? (
                          <div className='flex flex-row gap-[2rem] items-center'>
                            <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                            <p className='text-[2rem]'>{_transaction.Prestador}</p>
                          </div>) : (<div></div>)}
                      </p>
                      <p className={`col-span-1 text-[2rem] h-[5rem] rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                      <p className={`col-span-2 text-[2rem] font-bold ml-auto mr-6 flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <FormatValue value={_transaction.Valor} />
                      </p>
                      <p className='col-span-1 text-[2rem] px-[2rem] ml-auto flex items-center'>
                        <button onClick={() => showDrawer(_transaction)}>
                          <svg width={24} height={24}><use href='#svg-detail' /></svg>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className='block md:hidden' onClick={() => showDrawer(_transaction)} id="bottomBar">
                    <div key={index} className="md:w-full w-full mx-auto bg-white my-2 rounded-lg">
                      <p className='md:text-[3rem] sm:text-[2.5rem] text-[1.8rem] px-4 py-2 flex items-center'>{_transaction.Descricao}</p>
                      <div className='flex flex-row mx-6 my-4 justify-between'>
                        <p className='md:text-[3rem] sm:text-[2rem] text-[1.5rem] px-[2rem] flex flex-row items-center gap-[2rem]'>
                          <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                          <DetailedDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                        </p>
                        <p className='md:text-[2rem] sm:text-[1.5rem] text-[1.5rem] pr-4 pb-2 flex items-center '>
                          {_transaction.Tipo === 'Retirada' ? (
                            <div className='flex flex-row gap-[2rem] items-center'>
                              <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                              <p>{_transaction.Prestador}</p>
                            </div>) : (<div></div>)}
                        </p>
                      </div>
                      <div className='flex sm:py-[1rem] sm:px-[1rem] px-[1.5rem] py-[1rem] flex-row justify-between border-t-2 border-gray-300'>
                        <p className={`md:text-[3rem] sm:text-[2rem] text-[1.5rem] rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                        <p className={`md:text-[3rem] sm:text-[2rem] text-[1.5rem] sm:px-[1rem] font-bold  flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <FormatValue value={_transaction.Valor} />
                        </p>
                      </div>
                    </div>
                  </div>                 
                </div>
              ))}
            </div>
          </div>
          <div className='md:fixed absolute md:bottom-[2rem] md:right-[3rem] bottom-[-5rem] right-[0rem]'>
            <PaginationBar href="/" page={page} pageCount={pageCount} />
          </div>
        </div>
      </div >
    </>
  );
};



