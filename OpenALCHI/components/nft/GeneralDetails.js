

const GeneralDetails = ({ selectedNft }) => {
  return (
    
      <div className='flex flex-col flex-1 justify-between mb-6'>
        <span className="text-xl text-gray-800 dark:text-white ml-3 whitespace-nowrap">{selectedNft?.name}</span>
        <span className="flex-1 text-gray-800 dark:text-white ml-3 whitespace-nowrap">Owned by</span>
        <span className="text-sm text-gray-800 dark:text-white ml-3 whitespace-nowrap">{selectedNft?.seller?.slice(0, 16)}...</span>

      
      </div>
  )
}

export default GeneralDetails