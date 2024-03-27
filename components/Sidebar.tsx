'use client'

import { useState } from "react"

const Sidebar = () => {
  const [clicked, setClicked] = useState('servico')
  return (
    <div className="flex flex-col items-center w-[88px] bg-[#2E5E9E] h-screen">
      <div className="w-[88px] h-[72px] flex justify-center items-center border-b-2 border-b-gray-400">
        <svg width={40} height={40}><use href="#svg-logo" /></svg>
      </div>
      <div className="mt-8 w-[88px] ">
        <button className={`w-[88px] h-[72px] flex items-center justify-center ${clicked === "servico" ? 'border-lime-400 border-l-4' : ''}`} onClick={() => setClicked('servico')}>
          <svg width={24} height={24} className="mx-auto items-center"><use href={`${clicked === "servico" ? '#svg-servico-yellow' : '#svg-servico'} `} /></svg>
        </button>
        <button className={`w-[88px] h-[72px] flex items-center justify-center ${clicked === "historico" ? 'border-lime-400 border-l-4' : ''}`} onClick={() => setClicked('historico')}>
          <svg width={24} height={24} className="mx-auto "><use href={`${clicked === "historico" ? '#svg-historico-yellow' : '#svg-historico'} `} /></svg>
        </button>
        <button className={`w-[88px] h-[72px] flex items-center justify-center ${clicked === "wallet" ? 'border-lime-400 border-l-4' : ''}`} onClick={() => setClicked('wallet')}>
          <svg width={24} height={24} className="mx-auto"><use href={`${clicked === "wallet" ? '#svg-wallet-yellow' : '#svg-wallet'} `} /></svg>
        </button>
      </div>
    </div >
  )
}

export default Sidebar