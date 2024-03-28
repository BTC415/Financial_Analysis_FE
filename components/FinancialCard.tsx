const FinancialCard = ({ svg, text, value }: { svg: string, text: string, value: string }) => {
  return (
    <div className="bg-white rounded-lg min-w-[200px] max-w-[200px] h-[134px] p-4">
      <svg width={40} height={40} className="mb-3"><use href={svg} /></svg>
      <p className="text-sm">{text}</p>
      <p className="font-bold text-2xl">{value}</p>
    </div>
  )
}

export default FinancialCard