import React from 'react';
import { format, startOfWeek, endOfWeek, subWeeks, addWeeks } from 'date-fns'

const Semanal = () => {
  const currentDate = new Date()
  const [startDate, setStartDate] = React.useState<Date>(startOfWeek(currentDate));
  const [endDate, setEndDate] = React.useState<Date>(endOfWeek(currentDate));

  const showPreviousWeek = () => {
    const previousStartDate = subWeeks(startDate, 1);
    const previousEndDate = subWeeks(endDate, 1);

    setStartDate(previousStartDate);
    setEndDate(previousEndDate);
  }

  const showNextWeek = () => {
    const nextStartDate = addWeeks(startDate, 1);
    const nextEndDate = addWeeks(endDate, 1);

    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
  };

  return (
    <div className='flex flex-row bg-white p-2 rounded-md items-center'>
      <button onClick={showPreviousWeek}>
        <svg width={24} height={24}><use href="#svg-left-arrow" /></svg>
      </button>
      <div className='md:text-[2.5rem] sm:text-[1.3rem] px-[0.5rem]'>
        {`${format(startDate, 'MM/dd/yyyy')} à ${format(endDate, 'MM/dd/yyyy')}`}
      </div>
      <button onClick={showNextWeek}>
        <svg width={24} height={24}><use href="#svg-right-arrow" /></svg>
      </button>
    </div>
  )
}

export default Semanal