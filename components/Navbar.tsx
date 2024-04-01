import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="hidden sm:block">
        <div className=" flex justify-between items-center sm:w-full w-[90%] h-[16rem] bg-white">
          <div className="p-2">
            <svg width={30} height={30}>
              <use href="#svg-three-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-[1.5rem] justify-between items-center">
            <div className="bg-[#F3F3F5] flex justify-evenly flex-row items-center gap-[2rem] w-[50rem] h-[9rem] rounded-[1rem] my-[1.5rem] px-[1rem]">
              <svg width={24} height={24}>
                <use href="#svg-wallet" />
              </svg>
              <div>
                <p className="text-[2rem] text-slate-300">Meu Saldo</p>
                <p className="font-bold md:text-[3rem] sm:text-[2.5rem]">R$ 2.450,00</p>
              </div>
              <div className="flex items-center justify-around p-[1rem] bg-[#3A5998] rounded-[1.5rem] w-[40%] h-[6rem]">
                <svg width={20} height={20}>
                  <use href="#svg-plus" />
                </svg>
                <p className="text-white text-[2rem]">Depositar</p>
              </div>
            </div>
            <div>
              <svg width={2} height={40}>
                <use href="#svg-vertical-bar" />
              </svg>
            </div>
            <div className="flex flex-row gap-[1rem] p-[1rem] items-center">
              <Image src="/avatar.png" alt="avatar"  width={40}
                height={40} sizes="0.2rem"
                style={{
                  width: '50%',
                  height: 'auto',
                }} className="rounded-full" />
              <p className="md:text-[3rem] sm:text-[2.5rem] font-bold">Ricardo Perez</p>
              <svg width={30} height={30}>
                <use href="#svg-down-arrow" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden bg-[#2E5E9E] flex flex-row justify-between px-[2.5rem] items-center">
        <div className="w-full h-[9rem] flex items-center">
          <svg width={40} height={40}>
            <use href="#svg-logo" />
          </svg>
        </div>
        <div className="flex flex-row justify-evenly items-center gap-[1rem] w-[80rem]">
          <div className="flex flex-row justify-evenly items-center w-[40rem] gap-[1.5rem] bg-[#264C80] my-[1.5rem] p-[1rem] rounded-[1.5rem]">
            <svg width={24} height={24}>
              <use href="#svg-wallet" />
            </svg>
            <div>
              <p className="sm:text-[1rem] text-[1.5rem] text-slate-300">Meu Saldo</p>
              <p className="font-bold sm:text-[2.5rem] text-[2.5rem]">R$ 2.450,00</p>
            </div>
          </div>
          <div>
            <svg width={2} height={40}>
              <use href="#svg-vertical-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-[1.5rem] p-[1.5rem] items-center">

            <Image src="/avatar.png" alt="avatar"  width={40}
                height={40} sizes="2.5rem"
                style={{
                  width: '100%',
                  height: 'auto',
                }} className="rounded-full" />
            
            <svg width={50} height={50}>
              <use href="#svg-three-bar-decreased" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
