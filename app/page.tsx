
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
import Mensal from '@/components/Mensal';
import Custom from '@/components/Custom';
import MultiSelect from '@/components/multiselect';

interface PageProps {
  searchParams: { page?: string };
}

//Display items on each page
const PAGE_SIZE = 10;

export default function HomePage({ searchParams }: PageProps) {
  const [clicked, setClicked] = useState(false)
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [downloadbutton, setDownloadbutton] = React.useState<boolean>(false)
  const [selectbutton, setSelectbutton] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [transaction, setTransaction] = React.useState<Transaction | undefined>(undefined);
  const [periodOption, setPeriodOption] = React.useState<string | undefined>("Semanal");
  const [tipo, setTipo] = React.useState<string | undefined>(undefined);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = React.useState<boolean>(false);
  const [searchExtend, setSearchExtend] = React.useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string | undefined>(undefined);
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const showDrawer = (_transaction: Transaction) => {
    setTransaction(_transaction);
    setClicked(true)
  }

  // const handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setPeriodOption(e.target.value);
  // }

  // const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedOptions(e.target.value);
  // };  

  React.useEffect(() => {
    (async () => {

      const { transactions, pageCount } = await getTransactions(PAGE_SIZE, page);
      setTransactions(transactions);
      setPageCount(pageCount);
    })();
  }, [page]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className='flex  flex-row rounded-[10rem] bg-white items-center'>
          <svg width={24} height={24}><use href='#svg-left-arrow' /></svg>
          <p>02/05/22 à 08/05/22</p>
          <svg width={24} height={24}><use href='#svg-right-arrow' /></svg>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`flex flex-row ${clicked ? 'bg-opacity-50 bg-gray-600' : ''}`}>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <div className='flex-grow bg-[#F3F3F5] md:none relative w-full'>
          <Navbar />
          <div className='flex items-center py-[3rem] gap-[2rem] lg:px-[7.89rem] md:px-[5.26rem] sm:px-[3.94rem] px-[2.37rem]'>
            <p className='font-bold md:[5-rem] sm-[4.5rem] text-[20px] flex flex-grow'>Extracto</p>
            <button onClick={() => setSearchExtend(!searchExtend)}>
              <svg width={30} height={30} className='block md:hidden'><use href='#svg-collapse' /></svg>
            </button>
            <div className="hidden md:block">
              {" "}
              <div className="flex flex-row items-center lg:w-[53vw] w-[60vw] justify-end gap-[1rem]">
                {
                  periodOption === "Semanal" ? <Semanal /> : (periodOption === "Mensal" ? <Mensal /> : <Custom />)
                }               
                
                <Select value={periodOption} 
                  onChange={(value: string) => {
                    setPeriodOption(value);
                  }}
                  className='text-[12px] h-[30px]'
                >
                  <Select.Option value="Semanal">Semanal</Select.Option>
                  <Select.Option value="Mensal">Mensal</Select.Option>
                  <Select.Option value="Personalizado">Personalizado</Select.Option>
                </Select>    
                <MultiSelect 
                  options={[
                      "Doposito",
                      "Pagamento Job"
                  ]}
                  onChange={ (value) => {console.log(value)} }
                /> 
              </div>
            </div>

            <div className='relative mt-2'>
              <button onClick={() => { setDownloadbutton(!downloadbutton) }}>
                <svg width={30} height={30}><use href='#svg-download' /></svg>
              </button>
              {downloadbutton && (<>
                <div className='flex flex-col w-[70px] bg-gray rounded-[1rem] absolute top-[30px] right-0 border-[2px] z-2'>
                  <button className=' p-[1rem] text-left text-[12px]'>PDF</button>
                  <button className=' p-[1rem] text-left text-[12px]'>XLS</button>
                </div>
              </>
              )}
            </div>
          </div>
          {searchExtend && (
            <div className="block md:hidden py-[1rem]">
              <div className="flex flex-col w-full gap-[2rem]">
              <Select value={periodOption} 
                  onChange={(value: string) => {
                    setPeriodOption(value);
                  }}
                  className='text-[12px] h-[30px]'
                >
                  <Select.Option value="Semanal">Semanal</Select.Option>
                  <Select.Option value="Mensal">Mensal</Select.Option>
                  <Select.Option value="Personalizado">Personalizado</Select.Option>
                </Select>    
                <MultiSelect 
                  options={[
                      "Doposito",
                      "Pagamento Job"
                  ]}
                  onChange={ (value) => {console.log(value)} }
                />  
                {/* <Select
                  mode="multiple"
                  value={selectedOptions}
                  onChange={(value: string) => {
                    setSelectedOptions(value);
                  }}
                  placeholder="Deposito"
                  style={{ width: '50%', height: "30px"}}
                  // optionLabelProp="label"
                  className='text-[12px]'
                >
                  <Select.Option value="Deposito" label="Deposito">Deposito</Select.Option>
                  <Select.Option value="Pagamento Job" label="Pagamento Job">Pagamento Job</Select.Option>
                </Select> */}
              </div>
            </div>
          )}
         
          <div className='flex md:w-full w-[100%] overflow-x-auto flow scroll-smooth lg:px-[7.89rem] md:px-[5.26rem] sm:px-[3.94rem] px-[2.37rem]'>
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
          <div className='flex flex-col lg:px-[7.89rem] md:px-[5.26rem] sm:px-[3.94rem] px-[2.37rem]'>
            <div className='flex-l px-[1rem]'>
              <div className='hidden md:block mt-[2px]'>
                <div className='grid grid-cols-12 gap-[2rem]'>
                  <p className='col-span-2 text-[12px] font-bold py-[2rem]'>Data</p>
                  <p className='col-span-4 text-[12px] font-bold py-[2rem]'>Descrição</p>
                  <p className='col-span-2 text-[12px] font-bold py-[2rem]'>Prestador</p>
                  <p className='col-span-1 text-[12px] font-bold py-[2rem]'>Tipo</p>
                  <p className='col-span-2 text-[12px] font-bold py-[2rem] text-center'>Valor</p>
                </div>
              </div>
              <div>
                <Detail
                  clicked={clicked}
                  setClicked={setClicked}
                  transaction={transaction}
                />
              </div>
              {transactions.map((_transaction: Transaction, index) => (
                <div id='card'>
                  <div className='hidden md:block mb-[2rem]'>
                    <div key={index} className="w-full grid grid-cols-12 bg-white h-[4.68vh] items-center" onClick={() => showDrawer(_transaction)}>
                      <p className='col-span-2 text-[14px] p-[1rem] flex flex-row items-center gap-[2rem]'>
                        <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                        <FormatDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                      </p>
                      <p className='col-span-4 text-[14px] p-[1rem] flex items-center'>{_transaction.Descricao}</p>
                      <p className='col-span-2 text-[2rem] p-[1rem] flex items-center'>
                        {_transaction.Tipo === 'Retirada' ? (
                          <div className='flex flex-row gap-[2rem] items-center'>
                            <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                            <p className='text-[14px]'>{_transaction.Prestador}</p>
                          </div>) : (<div></div>)}
                      </p>
                      <p className={`col-span-1 text-[12px] h-[5rem] rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                      <p className={`col-span-2 text-[12px] font-bold ml-[20rem] flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <FormatValue value={_transaction.Valor} />
                      </p>
                      <p className='col-span-1 text-[2rem] px-[2rem] ml-auto flex items-center'>
                        <button onClick={() => showDrawer(_transaction)}>
                          <svg width={24} height={24}><use href='#svg-detail' /></svg>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className='block md:hidden my-[3rem]' onClick={() => showDrawer(_transaction)} id="bottomBar">
                    <div key={index} className="md:w-full justify-evenly p-[5rem] w-full mx-auto bg-white rounded-lg">
                      <p className='text-[14px] px-4 py-2 flex items-center'>{_transaction.Descricao}</p>
                      <div className='flex flex-row mx-6 my-4 justify-between'>
                        <p className='text-[14px] flex flex-row items-center gap-[2rem]'>
                          <svg width={16} height={16}><use href='#svg-calendar' /></svg>
                          <DetailedDate dateString={`${_transaction.Data}`} time={`${_transaction.time}`} />
                        </p>
                        <p className='text-[14px] pr-4 pb-2 flex items-center '>
                          {_transaction.Tipo === 'Retirada' ? (
                            <div className='flex flex-row gap-[2rem] items-center'>
                              <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                              <p className='text-[14px]'>{_transaction.Prestador}</p>
                            </div>) : (<div></div>)}
                        </p>
                      </div>
                      <div className='flex sm:py-[1rem] sm:px-[1rem] px-[1.5rem] py-[1rem] flex-row justify-between border-t-2 border-gray-300'>
                        <p className={`text-[14px] rounded-full px-4 justify-center flex items-center ${_transaction.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{_transaction.Tipo}</p>
                        <p className={`text-[14px] sm:px-[1rem] font-bold ml-[20rem] flex items-center  ${_transaction.Valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <FormatValue value={_transaction.Valor} />
                        </p>
                      </div>
                    </div>
                  </div>                 
                </div>
              ))}
            </div>
          </div>
          <div className='md:fixed absolute md:bottom-[2rem] bottom-[-7rem] right-[0rem] lg:px-[7.89rem] md:px-[5.26rem] sm:px-[3.94rem] px-[2.37rem]'>
            <PaginationBar href="/" page={page} pageCount={pageCount} />
          </div>
        </div>
      </div>
    </>
  );
}
