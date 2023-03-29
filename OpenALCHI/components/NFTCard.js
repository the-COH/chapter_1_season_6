import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'

 
const NFTCard = ({order, nftItem, tokenName }) => {
  return (
    <div
      className='bg-gray-400 border-2 border-gray-800 w-[18rem] h-[25rem] my-2 m-auto rounded-2xl overflow-hidden cursor-pointer drop-shadow-lg'
      onClick={() => {
        Router.push({
          pathname: `/nfts/${order}`,
        })
      }}
    > 
      <div className='bg-gray-800 h-3/4  flex justify-center items-center border m-1 rounded-2xl  border-gray-300'>
        <img src={nftItem.image} alt={nftItem.name} className='w-40 h-50 drop-shadow-lg' />
      </div>
      <div className='bg-gray-50 text-base font-normal dark:bg-gray-800 border rounded-lg  border-sky-200 '>
        <div className=' flex justify-between text-[#e4e8eb] drop-shadow-xl'>
          <div className='flex-0.6 flex-wrap'>
          <span className="flex-1 px-1 whitespace-nowrap">{nftItem.name}</span>
            <div className='border m-2 p-2 rounded-lg  border-sky-200 '>
            <span className="flex-1 whitespace-nowrap">{nftItem.description}</span>
            </div>
            
          </div>
          
            <div className='flex-0.4 text-right'>
            <span className="text-sky-400 flex-1 m-2 whitespace-nowrap">Price: {nftItem.price + ' ' + tokenName}</span>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default NFTCard