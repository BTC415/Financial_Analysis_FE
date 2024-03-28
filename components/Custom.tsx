import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const Custom: React.FC = () => {
  const dateFormat: string = 'YYYY/MM/DD';
  const monthFormat: string = 'YYYY/MM';
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2015/01/01', dateFormat));

  return (
    <div className="max-w-sm mx-auto">
      <DatePicker.RangePicker
        defaultValue={[dayjs('2024/03/25', dateFormat), dayjs('2024/03/28', dateFormat)]}
        format={dateFormat}
        style={{ height: "40px" }}
      />
    </div>
  );
};

export default Custom;
