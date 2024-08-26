'use client'

import { useState } from "react"

const Sidebar = () => {
  const [clicked, setClicked] = useState('servico')
  return (
    <div className="flex flex-col items-center w-[5.87vw] gap-[0.78vh] bg-[#2E5E9E] h-screen">
      <div className="w-full h-[7.03vh] flex justify-center items-center border-b-2 border-b-gray-500">
        <svg width={40} height={40}><use href="#svg-logo" /></svg>
      </div>
      <div className="mt-8 w-[5.87vw]">
        <button className={`w-full h-[6.25vh] flex items-center justify-center ${clicked === "servico" ? 'border-lime-400 border-l-4' : ''}`} >
          <svg width={24} height={24} className="mx-auto items-center"><use href={`${clicked === "servico" ? '#svg-servico-yellow' : '#svg-servico'} `} /></svg>
        </button>
        <button className={`w-full h-[6.25vh] flex items-center justify-center ${clicked === "historico" ? 'border-lime-400 border-l-4' : ''}`}>
          <svg width={24} height={24} className="mx-auto "><use href={`${clicked === "historico" ? '#svg-historico-yellow' : '#svg-historico'} `} /></svg>
        </button>
        <button className={`w-full h-[6.25vh] flex items-center justify-center ${clicked === "wallet" ? 'border-lime-400 border-l-4' : ''}`} onClick={() => setClicked('wallet')}>
          <svg width={24} height={24} className="mx-auto"><use href={`${clicked === "wallet" ? '#svg-wallet-yellow' : '#svg-wallet'} `} /></svg>
        </button>
      </div>
    </div >
  )
}

export default Sidebar