import React from 'react'

const NftElement = ({item}) => {
  return (
    <div className='flex border-1 rounded-sm text-sm'>
      <span className='py-4'> {item.balance} x  </span>
       
      <img
          width='30'
          height='30'
          className='p-1'
          src={item.image}
          alt=""
          />
    </div>
        
  )
}

export default NftElement