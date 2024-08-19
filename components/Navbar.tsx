import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className="hidden sm:block lg:px-[8.2rem] md:px-[5.26rem] sm:px-[3.94rem] px-[2.37rem] bg-white">
        <div className="flex justify-between items-center sm:w-full h-[7.03vh] ">
          <div>
            <svg width={24} height={24}>
              <use href="#svg-three-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-[1.5rem] justify-between items-center">

            <div className="bg-[#F3F3F5] flex justify-around flex-row items-center lg:w-[17vw] h-[63.89%] md:w-[25vw] sm:w-[30vw] rounded-[1rem]">
              <svg width={24} height={24}>
                <use href="#svg-wallet" />
              </svg>
              <div>
                <p className="text-[12px] text-slate-300">Meu Saldo</p>
                <p className="font-bold text-[14px]">R$ 2.450,00</p>
              </div>
              <div className="flex items-center justify-around bg-[#3A5998] rounded-[1.5rem] w-[39%] py-[1rem]">
                <svg width={20} height={20}>
                  <use href="#svg-plus" />
                </svg>
                <p className="text-white text-[12px]">Depositar</p>
              </div>
            </div>

            <div>
              <svg width={24} height={40}>
                <use href="#svg-vertical-bar" />
              </svg>
            </div>

            <div className="flex flex-row lg:w-[11.53vw] md:w-[17vw] sm:w-[23vw] items-center justify-around">
              <Image src="/avatar.png" alt="avatar" width={40}
                height={40}
                style={{
                  height: '55.56%',
                }} className="rounded-full" />
              <p className="text-[14px] font-bold ml-[2rem]">Ricardo Perez</p>
              <svg width={24} height={24}>
                <use href="#svg-down-arrow" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      <div className="sm:hidden sm:h-[5.74vh] bg-[#2E5E9E] flex flex-row justify-between items-center px-[3.33vw]">
        <div className="w-full flex items-center">
          <svg width={40} height={40}>
            <use href="#svg-logo" />
          </svg>
        </div>
        <div className="flex flex-row items-center gap-[1.5rem] w-[56.4vw] h-[75%]">
          <div className="flex flex-row justify-evenly items-center w-[34.17vw] gap-[1.5rem] bg-[#264C80] my-[1.5rem] p-[1rem] rounded-[1.5rem]">
            <svg width={32} height={32}>
              <use href="#svg-wallet" />
            </svg>
            <div>
              <p className="text-[12px] text-slate-300">Meu Saldo</p>
              <p className="font-bold text-[14px] text-slate-300">R$ 2.450,00</p>
            </div>
          </div>
          <div>
            <svg width={2} height={40}>
              <use href="#svg-vertical-bar" />
            </svg>
          </div>
          <div className="flex flex-row gap-[1.5rem] p-[1.5rem] items-center">

            <Image src="/avatar.png" alt="avatar" width={32}
              height={32} sizes="2.5rem"
              style={{
                width: '100%',
                height: 'auto',
              }} className="rounded-full" />

            <svg width={40} height={40}>
              <use href="#svg-three-bar-decreased" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
