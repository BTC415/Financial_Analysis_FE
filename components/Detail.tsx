"use client"
import Image from 'next/image';
import { Transaction } from '@/lib/transactions';
import { Dispatch, SetStateAction } from 'react';
import { DetailedDate } from '@/components/FormatDate';

interface DetailProps {
  transaction: Transaction | undefined;
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>
}

const Detail: React.FC<DetailProps> = ({ transaction, clicked, setClicked }) => {
  return (
    clicked ? (
      <div>
        <div className='w-full bg-gray-500 opacity-50 h-full fixed left-0 right-0 top-0 bottom-0' onClick={() => setClicked(false)}></div>
        <div className='bg-white md:w-[30%] fixed right-0 md:top-0 mt-[72px] md:h-full shadow-md z-50 duration-300 ease-in-out bottom-0 min-h-fit w-full '>
          <div className='p-8 flex justify-between items-center border-b-2 border-gray-300'>
            <p className='font-bold text-[16px]'>Transação</p>
            <button onClick={() => setClicked(false)}>
              <svg width={20} height={20}><use href='#svg-exit' /></svg>
            </button>
          </div>
          <div className='my-4 p-4 '>
            <div className='p-3 flex justify-between items-center'>
              <p className='text-[14px]'>Número</p>
              <p className='text-[14px]'>{transaction?.id}</p>
            </div>
            <div className='p-3 flex justify-between items-center text-[12px]'>
              <p className='text-[14px]'>Data</p>
              {transaction && <DetailedDate dateString={transaction.Data} time={transaction.time} />}
            </div>
            <div className='p-3 flex justify-between items-center'>
              <p className='text-[14px]'>Prestador</p>
              <p className='col-span-2 sm:text-[2rem] text-[1.5rem] p-2 flex items-center'>
                {transaction?.Tipo === 'Retirada' ? (
                  <div className='flex flex-row gap-2 items-center'>
                    <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                    <p className='text-[14px]'>{transaction.Prestador}</p>
                  </div>
                ) : null}
              </p>
            </div>
            <div className='p-3 flex justify-between items-center border-b-2 border-gray-300'>
              <p className='text-[14px]'>Tipo</p>
              <p className={`col-span-1 text-[12px] my-1 p-1 rounded-full px-4 ${transaction?.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{transaction?.Tipo}</p>
            </div>
          </div>
          <div>
            <p className='m-4 p-4 font-bold text-[16px]'>Detalhes da transação</p>
            <div className='px-8 py-2 flex justify-between items-center'>
              <p className='text-[14px]'>Valor</p>
              <p className='text-[14px]'>{`R$ ${transaction?.Valor},00`}</p>
            </div>
            <div className='px-8 py-2 flex justify-between items-center'>
              <p className='text-[14px]'>% Catajobs</p>
              <p className='text-[14px]'><span className='text-[12px]'>5%</span> {`R$ 5,00`}</p>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Detail;