import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'

const style = {
  wrapper: `bg-[#3d4a57] border border-sky-500 w-[18rem] h-[25rem] my-2 m-auto rounded-2xl overflow-hidden cursor-pointer drop-shadow-lg`,
  imgContainer: `h-3/4  flex justify-center items-center`,
  nftImg: `w-40 h-50 `,
  details: `border-t-4 border-indigo-500 p-3`,
  info: `flex justify-between text-[#e4e8eb] font-serif drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm font-serif text-[#8a939b]`,
  assetName: `font-bold text-lg font-serif mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}

const NFTCard = ({order, nftItem }) => {
  return (
    <div
      className={style.wrapper}
      onClick={() => {
        Router.push({
          pathname: `/list/${order}`,
        })
      }}
    > 
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>Name:</div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NFTCard