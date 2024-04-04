import React from 'react'


type IItem = {
    title: string, 
    checked: boolean
}

interface IProps {
    options: string[],
    onChange: (value: any) => void
}

const MultiSelect = ({options, onChange}: IProps) =>{

    const [items, setItems] = React.useState<IItem[]>(options.map((item: string) => ({ title:  item, checked: false })))
    const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = React.useState<boolean>(false);

    const handleCheck = (title: string, value: boolean) => {
        setItems(items.map((item: IItem) => (item.title === title) ? {...item, checked: value} : {...item}));
        
    }

    React.useEffect(() => {
        const _items: string[] = items.filter((item: IItem) => item.checked).map((item: IItem) => item.title)
        onChange (_items);
    }, [items])

    const _renderItem = (title: string) => (
        <div className='border rounded-lg px-8'>{title}</div>
    )

    return(
        <div className='relative mt-2 text-[14px] items-center'>
            <div className='relative flex flex-row justify-between rounded-2xl bg-white border border-[#DDDEE3] py-2 items-center z-1'>
            <div className='flex min-w-[200px] justify-between items-center w-full h-full pr-3' onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}>
                <p className='mx-5 flex gap-2'>
                    { items.filter((item: IItem) => item.checked).length === 0 ? "Tipo de transação" : items.filter((item: IItem) => item.checked).map((item: IItem) => _renderItem(item.title)) }
                </p>
                <svg width={24} height={24}><use href='#svg-down-arrow' /></svg>
            </div>
            {isPeriodDropdownOpen && (
                <div className='flex flex-col w-full bg-white px-5 rounded-2xl absolute top-[30px] right-0 border-[2px] z-2'>
                {   //@ts-ignore
                    items.map((item:IItem) => 
                        <label key={item.title} className='cursor-pointer h-[30px] flex items-center gap-1'>                            
                            <input type="checkbox" checked={item.checked} onChange={(e: React.ChangeEvent<HTMLElement>) => handleCheck(item.title, e.target.checked)} className='items-center'/>{item.title}
                        </label>
                    )
                }
                </div>
            )}
        </div>
        </div>
    );
}

export default MultiSelect;