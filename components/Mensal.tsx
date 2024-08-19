import React from 'react';
import { format, subMonths, addMonths } from 'date-fns'
import { pt } from 'date-fns/locale'; // Import Brazilian locale

const Mensal = () => {

  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  const showPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const showNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className='flex flex-row bg-white p-2 rounded-md items-center'>
      <button onClick={showPreviousMonth}>
        <svg width={24} height={24}><use href="#svg-left-arrow" /></svg>
      </button>
      <div className='text-[12px] px-[0.5rem]'>
        {format(currentDate, 'MM/yyyy', { locale: pt })}
      </div>
      <button onClick={showNextMonth}>
        <svg width={24} height={24}><use href="#svg-right-arrow" /></svg>
      </button>
    </div>
  )
}

export default Mensal