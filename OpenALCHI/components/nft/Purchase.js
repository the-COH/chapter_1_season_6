import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import constants from '../constants'
import Market from '../../pages/artifacts/NFTMarket.json'



const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ selectedNft}) => {
  const [nftaddress, setnftaddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  const confirmClaim = (msg) => toast(msg)

  useEffect(() => {
    searchnetwork()
  })
  useEffect(() => {
    console.log(selectedNft)
  }, [])
  async function searchnetwork() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      console.log(network)
      if (network.chainId == 7700){
        setnftaddress(constants.Cgame);
        setnftmarketaddress(constants.Cmarket)
      }  else if (network.chainId == 7701){
        setnftaddress(constants.Ctestgame);
        setnftmarketaddress(constants.Ctestmarket)
      }
    } catch(e){
        console.log(e)
      }
    }

  async function buyItem(nft) {
    setLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      );
      const price = nft.price
      console.log("buy for :" + price, 'this toktn id; ' + nft.tokenId + '  ' + nft.item)
      try {
        const transaction = await marketContract.createMarketSale(nftaddress, nft.item, {
          value: price.toString()
        })
        await transaction.wait()
        confirmClaim('Purchase successful!')
      } catch (error) {
        console.log(error)
        confirmClaim('transaction rejected')
      }
      setLoading(false)
  }

  return ( <>
            {loading ? (
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>

                ) : (
                  <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2 ' onClick={() => buyItem(selectedNft)}>Buy Element</button>
                )}
                <Toaster 
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  toastOptions={{
                    className: 'text-sm ',
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                  }}  />
        </>
  )
}

export default MakeOffer