const FinancialCard = ({ svg, text, value }: { svg: string, text: string, value: string }) => {
  return (
    <div className="bg-white rounded-[1rem] sm:w-[80rem] md:w-[40rem] w-[30rem] p-[1rem]">
      <svg width={40} height={40} className="mb-3"><use href={svg} /></svg>
      <p className="font-Inter lg:text-[3.5rem] md:text-[3.1rem] sm:text-[3.1rem] text-[2.2rem]">{text}</p>
      <p className="font-bold lg:text-[5.5rem] md:text-[6rem] sm:text-[5.5rem] text-[5rem]">{value}</p>
    </div>
  )
}

export default FinancialCard