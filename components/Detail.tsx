"use client"
import Image from 'next/image';
import { Transaction } from '@/lib/transactions';
import { Dispatch, SetStateAction } from 'react';
import DetailedDate from './DetailedDate';

interface DetailProps {
  transaction: Transaction | undefined;
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>
}

const Detail: React.FC<DetailProps> = ({ transaction, clicked, setClicked }) => {
  return (
    clicked ? (
      <>
        <div className='w-full bg-gray-500 opacity-50 h-full fixed left-0 right-0 top-0 bottom-0 ' onClick={() => setClicked(false)}></div>
        <div className='bg-white md:w-[30%] fixed right-0 md:top-0 mt-[72px] md:h-full shadow-md z-50 duration-300 ease-in-out bottom-0 min-h-fit w-full '>
          <div className='p-8 flex justify-between items-center border-b-2 border-gray-300'>
            <p className='font-bold text-xl'>Transação</p>
            <button onClick={() => setClicked(false)}>
              <svg width={20} height={20}><use href='#svg-exit' /></svg>
            </button>
          </div>
          <div className='my-4 p-4 '>
            <div className='p-3 flex justify-between items-center'>
              <p className='text-lg'>Número</p>
              <p className='text-lg'>{transaction?.id}</p>
            </div>
            <div className='p-3 flex justify-between items-center'>
              <p className='text-lg'>Data</p>
              { transaction && <DetailedDate dateString={transaction.Data} time={transaction.time} /> }
            </div>
            <div className='p-3 flex justify-between items-center'>
              <p className='text-lg'>Prestador</p>
              <p className='col-span-2 text-sm p-2 flex items-center'>
                {transaction?.Tipo === 'Retirada' ? (
                  <div className='flex flex-row gap-2 items-center'>
                    <Image src="/avatar2.png" alt="avatar2" width={24} height={24} />
                    <p className='text-sm'>{transaction.Prestador}</p>
                  </div>
                ) : null}
              </p>
            </div>
            <div className='p-3 flex justify-between items-center border-b-2 border-gray-300'>
              <p className='text-lg'>Tipo</p>
              <p className={`col-span-1 text-sm my-1 p-1 rounded-full px-4 ${transaction?.Tipo === 'Retirada' ? 'bg-red-300 text-red-600' : 'bg-green-300 text-green-600'}`}>{transaction?.Tipo}</p>
            </div>
          </div>
          <div>
            <p className='m-4 p-4 font-bold text-lg'>Detalhes da transação</p>
            <div className='px-8 py-2 flex justify-between items-center'>
              <p className='text-lg'>Valor</p>
              <p className='text-lg'>{`R$ ${transaction?.Valor},00`}</p>
            </div>
            <div className='px-8 py-2 flex justify-between items-center'>
              <p className='text-lg'>% Catajobs</p>
              <p className='text-lg'><span className='text-sm'>5%</span> {`R$ 5,00`}</p>
            </div>
          </div>
        </div>
      </>
    ) : null
  );
};

export default Detail;