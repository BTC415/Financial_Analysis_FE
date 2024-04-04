const FinancialCard = ({ svg, text, value }: { svg: string, text: string, value: string }) => {
  return (
    <div className="bg-white rounded-[1rem] sm:w-[80rem] md:w-[40rem] w-[30rem] p-[1vw]">
      <svg width={40} height={40} className="mb-3"><use href={svg} /></svg>
      <p className="font-Inter text-[14px]">{text}</p>
      <p className="font-bold text-[24px]">{value}</p>
    </div>
  )
}

export default FinancialCard