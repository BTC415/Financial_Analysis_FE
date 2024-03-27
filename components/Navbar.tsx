import Image from "next/image";

const Navbar = () => {
  return (
    <>
    <div className="hidden sm:block">
      <div className=" flex justify-between items-center w-full h-18 bg-white">
        <div className=" p-2">
          <svg width={24} height={24}>
            <use href="#svg-three-bar" />
          </svg>
        </div>
        <div className="flex flex-row gap-5 justify-between items-center">
          <div className="bg-[#F3F3F5] flex flex-row items-center gap-3 rounded-md my-2 px-2">
            <svg width={24} height={24}>
              <use href="#svg-wallet" />
            </svg>
            <div>
              <p className="text-lg text-slate-300">Meu Saldo</p>
              <p className="font-bold text-lg">R$ 2.450,00</p>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#3A5998] rounded-lg">
              <svg width={20} height={20}>
                <use href="#svg-plus" />
              </svg>
              <p className="text-white font-lg pl-3">Depositar</p>
            </div>
          </div>
          <div>
            <svg width={2} height={40}>
              <use href="#svg-vertical-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-2 p-2 items-center">
            <Image src="/avatar.png" alt="avatar" width={40} height={40} />
            <p className="text-xl font-bold">Ricardo Perez</p>
            <svg width={24} height={24}>
              <use href="#svg-down-arrow" />
            </svg>
          </div>
        </div>
      </div>
    </div>
      
      <div className=" sm:hidden bg-[#2E5E9E] flex flex-row justify-between px-4">
        <div className="w-[88px] h-[72px] flex justify-center items-center">
          <svg width={40} height={40}>
            <use href="#svg-logo" />
          </svg>
        </div>
        <div className="flex flex-row justify-between items-center gap-3">
          <div className="flex flex-row items-center gap-2 bg-[#264C80] my-2 p-1 rounded-md">
            <svg width={24} height={24}>
              <use href="#svg-wallet" />
            </svg>
            <div>
              <p className="text-lg text-slate-300">Meu Saldo</p>
              <p className="font-bold text-lg">R$ 2.450,00</p>
            </div>
          </div>
          <div>
            <svg width={2} height={40}>
              <use href="#svg-vertical-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-2 p-2 items-center">
            <Image src="/avatar.png" alt="avatar" width={40} height={40} />
            <svg width={24} height={24}>
              <use href="#svg-three-bar-decreased" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
