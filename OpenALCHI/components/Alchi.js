import React from "react";
import Link from "next/link";
import Image from "next/image";
import elric from "../assets/elric-alphonse.jpg"
import air from "../assets/air.png"
import fire from "../assets/fire.png"
import energy from "../assets/energy.png"
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks'


const Alchi = () => {
  const { address } = useWeb3()

  return <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
          
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
      
        <div className="m-auto p-4 w-1/2">
        <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert ">
          <div className="relative text-white text-[46px] font-semibold">
            OpenALCHI, Discover rare and mysterious NFTs.
          </div>
          <div className="text-[#151b22] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem] dark:text-gray-200">
            Experience the wonder of Little Alchemy in a whole new way with our NFTs
          </div>
          <div className="m-auto flex flex-wrap">
            {address ? (
              <>
                <Link href="/Game">
                  <button className='relative text-lg font-semibold px-12 py-4 bg-sky-400 rounded-lg mr-5 text-white hover:bg-blue-600 cursor-pointer'>New Elements</button>
                </Link>
                <Link href="/Stake">
                  <button className='relative text-lg font-semibold px-12 py-4 bg-sky-600 rounded-lg mr-5 text-white hover:bg-blue-800 cursor-pointer'>Stake Elements</button>
                </Link>
                
              </>
            ) : (
              <div >

                <div className='mx-auto p-2 '>
                <span className="inline-flex items-center justify-center p-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">switch to your favorite network</span>
                  
                
                </div>


              </div>
            )}


          </div>
          

          <p className="p-2 lead text-gray-900 dark:text-white ">
          Step into the world of alchemy with our OpenALCHI NFT game, inspired by the famous online game. Start by minting the four standard elements: fire, water, earth, and air. From there, use your elements to create new ones and climb the ladder of alchemical mastery.
          But watch out - the game is a race to the top, with every player vying to be the first to mint the ultimate prize: the Bitcoin element. As more players mint the Bitcoin element, the minting fee increases, making the game more challenging and exciting.
          To play, you'll need ALCHI tokens, which you can use to mint your elements and climb the ranks of alchemy. With stunning NFT artwork and endless possibilities, the OpenALCHI NFT game is a must-play for any crypto enthusiast. Will you be the first to mint the Bitcoin element and become the ultimate alchemist?
            </p>
            
          </div>
          <div className="flex  p-4 text-white ">
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
          className="m-auto rounded-t-lg"
          src={elric}
          width="400"
          alt=""
        />
      
    </div>
    
  </div>
}
export default Alchi