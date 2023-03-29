import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
}

const NFTImage = ({ selectedNft }) => {
  console.log(selectedNft)
  return (
    <div className=' bg-white border border-gray-200 w-[18rem] h-[25rem] my-2 m-auto rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            Price : {selectedNft?.price?.toString()/10**18 }
          </div>
        </div>
      </div>
      <div className='bg-gray-800  flex justify-center items-center border p-2 m-1 rounded-2xl  border-gray-300'>
        <img  className=' drop-shadow-lg' src={selectedNft?.image} width='200' alt='' />
      </div>
    </div>
  )
}

export default NFTImage