import React from "react";
import Link from "next/link";
import Image from "next/image";
import elric from "../assets/elric-alphonse.jpg"
import air from "../assets/air.png"
import fire from "../assets/fire.png"
import energy from "../assets/energy.png"
import {useWeb3, useSwitchNetwork} from '@3rdweb/hooks'

const style = {
    wrapper: `relative  `,
    container: ` before:content-[''] before:bg-red-800 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('../assets/fullmetal.png')] before:bg-cover before:bg-center before:opacity-60 before:blur`,
    contentWrapper: `flex relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-white text-[46px] font-semibold`,
    description: `text-[#151b22] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    accentedButton2: ` relative text-lg font-semibold px-12 py-4 bg-[#214d7a] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    cardContainer: `rounded-[3rem]`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `justify-center ml-4`,
    name: `text-2xl `,
    button: `text-white bg-gradient-to-r from-purple-500 via-purple-700 to-purple-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
    netbutton: `text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-sky-400 dark:focus:ring-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  
  }
const Alchi = () => {
  const {address, connectWallet, getNetworkMetadata } = useWeb3()
  const supportChainIds = [ 7700, 7701];
  const { switchNetwork } = useSwitchNetwork();

    return <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, The collection of Little Alchemy Elements
            </div>
            <div className={style.description}>
              Buy & Sell and search for new Alchemy Elements.
            </div>
            <div className={style.ctaContainer}>
            {address ? ( 
              <>
              <Link href="/Marketpalce">
              <button className='relative text-lg font-semibold px-12 py-4 bg-sky-600 rounded-lg mr-5 text-white hover:bg-blue-800 cursor-pointer'>Marketplace</button>
              </Link>
              <Link href="/Game">
              <button className='relative text-lg font-semibold px-12 py-4 bg-sky-400 rounded-lg mr-5 text-white hover:bg-blue-600 cursor-pointer'>Elements</button>
              </Link>
              </>
              ):(
                <div className={style.walletConnectWrapper}>
                    
                    <div className='mx-auto justify justify-center '>
                      <p className='mx-auto p-2 justify justify-center text-xl'>switch to your favorite network</p>
                    {supportChainIds.map((cId) => (
                      <button key={cId} className={style.netbutton} onClick={() => switchNetwork(cId)}>
                        {getNetworkMetadata(cId)?.chainName ? getNetworkMetadata(cId)?.chainName : (cId == 7700 ? '  Canto  ' : ( cId == 7700 ? 'canto testnet' : 'Unsupported' )) }
                      </button>
                    ))}
                    </div>
                  
                    
                </div>
              )}

              
            </div>
            <div className="flex m-4 opacity-2 border-spacing-1 ">
               
              <p className="text-sm">
The project is inspired by the famous game "Little Alchemy", which we build for the crypto community the little Alchemy NFT game. Everyone can play the game, But to start you need to mint the 4 standards element "fire" " water" "earth" "Air". Be the first to Mint the Standards elements and use them to create new ones. The last element to be minted in a cycle is the Bitcoin element. The Game is a race between players, everyone wants to be the first to mint the Bitcoin element because every time a bitcoin element has minted the fee for minting doubles.
The players need to have ALCHI token to play.
              </p>
              
            </div>
            <div className="flex justify-center  p-4 text-white ">
            <Image
              className="rounded-t-lg"
              src={fire}
              width="80"
              alt=""
            /> 
            <span className="text-2xl p-4 m-4">+</span>
            <Image
              className="rounded-t-lg"
              src={air}
              width="80"
              alt=""
            /> 
            <span className="text-2xl p-4 m-4">=</span>
            <Image
              className="rounded-t-lg"
              src={energy}
              width="80"
              alt=""
            />          
            </div>
            
          </div>
          <Image
              className="rounded-t-lg"
              src={elric}
              width="400"
              alt=""
              />
        </div>
      </div>
    </div>
}
export default Alchi