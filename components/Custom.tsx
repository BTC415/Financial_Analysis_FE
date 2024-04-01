// import { DatePicker } from 'antd';
// import dayjs, { Dayjs } from 'dayjs';
// import { useState } from 'react';
// // import { DatePicker } from '@mui/x-date-pickers';

// const Custom: React.FC = () => {
//   const dateFormat: string = 'YYYY/MM/DD';
//   const monthFormat: string = 'YYYY/MM';
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2015/01/01', dateFormat));

//   return (
//     <div className="max-w-sm mx-auto">
//       {/* <DatePicker.RangePicker
//         defaultValue={dayjs('Selecione um data ou período', dateFormat)}
//         format={dateFormat}
//         style={{ height: "40px" }}
//       /> */}
//       <DatePicker label="Selecione um data ou período" name="startDate" style={{ height: "40px" }} />
    
//     </div>
//   );
// };

// export default Custom;


import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import React from 'react';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} placeholder='Selecione um data ou período' style={{ height: "30px", width: "250px"}} />
  </Space>
);

export default App;