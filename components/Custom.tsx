import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const Custom: React.FC = () => {
  const dateFormat: string = 'YYYY/MM/DD';
  const monthFormat: string = 'YYYY/MM';
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2015/01/01', dateFormat));

  return (
    <div className="flex flex-row p-1 rounded-md items-center lg:text-[3rem] md:text-[2.7rem] sm:text-[2.7rem] text-[2rem]">
      <DatePicker.RangePicker
        defaultValue={[dayjs('2024/03/25', dateFormat), dayjs('2024/03/28', dateFormat)]}
        format={dateFormat}
        style={{ width: "230px", height:"30px"}}
        className='md:text-[3rem] sm:text-[2.5rem]'
      />
    </div>
  );
};

export default Custom;
