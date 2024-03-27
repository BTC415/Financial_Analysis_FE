
import React, { useState } from 'react';
import Image from 'next/image';
import { getTransactions } from '@/lib/transactions'
import FinancialCard from '@/components/FinancialCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FormatDate from '@/components/FormatDate';
import FormatValue from '@/components/FormatValue';
import PaginationBar from '@/components/PaginationBar';
import Detail from '@/components/Detail';
import { Transaction } from '@/lib/transactions';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import
{ Select, Dropdown, Button, MenuProps } from "antd";
import {  Popover, ConfigProvider } from 'antd';

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
    <Popover placement="left" content={() => <DatePicker/>}>
      <div className='relative'>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </div>
    </Popover>
  )
}