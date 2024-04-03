import React from 'react';
import { DatePicker } from 'antd';
import { MenuProps } from "antd";
import { Popover } from 'antd';

export default function () {

  const items1: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='flex  flex-row rounded-lg bg-white items-center'>
          <svg width={24} height={24}><use href='#svg-left-arrow' /></svg>
          <p className='text-xs mx-5'>Selecione um data ou período</p>
          <svg width={24} height={24}><use href='#svg-right-arrow' /></svg>
        </div>
      ),
    }
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <DatePicker
          format={{
            format: 'YYYY-MM-DD',
            type: 'mask',
          }}
        // onChange={onChange}
        />
      ),
    }
  ];

  return (
    <Popover placement="left" content={() => <DatePicker />}>
      <div className='relative'>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Personalizado</a>
      </div>
    </Popover>
  )
}