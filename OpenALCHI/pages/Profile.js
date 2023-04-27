import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import constants from './../components/constants'
import NFT from './artifacts/LittleAlchemy.json'
import Header from './../components/Header'
import Market from './artifacts/NFTMarket.json'
import NFTCard1 from './../components/NFTCard1'
import NFTCard2 from './../components/NFTCard2'
const imagelist = [
  '../imgs/water.png',
  '../imgs/air.png',
  '../imgs/fire.png',
  '../imgs/earth.png',
  '../imgs/steam.png',
  '../imgs/energy.png',
  '../imgs/lava.png',
  '../imgs/rain.png',
  '../imgs/mud.png',
  '../imgs/plant.png',
  '../imgs/rock.png',
  '../imgs/sand.png',
  '../imgs/metal.png',
  '../imgs/glass.png',
  '../imgs/swamp.png',
  '../imgs/eyeglasse.png',
  '../imgs/electricity.png',
  '../imgs/life.png',
  '../imgs/human.png',
  '../imgs/nerd.png',
  '../imgs/computer.png',
  '../imgs/internet.png',
  '../imgs/blockchain.png',
  '../imgs/Bitcoin.png',
]
const title = [
  'Water',
  'Air',
  'Fire',
  'Earth',
  'Steam',
  'Energy',
  'Lava',
  'Rain',
  'Mud',
  'Plant',
  'Rock',
  'Sand',
  'Metal',
  'Glass',
  'Swamp',
  'Eyeglasse',
  'Electricity',
  'Life',
  'Human',
  'Nerd',
  'Computer',
  'Internet',
  'Blockchain',
  'Bitcoin',
]

const style = {
  bannerImageContainer: `overflow-hidden flex justify-center items-center`,
  info: `flex justfy-between mx-auto text-[#e4e8eb] text-l drop-shadow-xl`,
  title: `text-5xl font-bold mb-4`,
}

const Profile = () => {
  const [account, setAccount] = useState()
  const [balanceArray, setBalanceArray] = useState([0])
  const [tokenName, setTokenName] = useState('')
  const [NftBanalce, setNftBanalce] = useState([])
  const [items, setNfts] = useState([])
  const [treasury, setTreasury] = useState(0)
  const [nftaddress, setnftaddress] = useState('')
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    searchnetwork()
  })
  useEffect(() => {
    if (!nftmarketaddress) return
    getAllListings()
    myElements()
    window.ethereum.on('accountsChanged', function (accounts) {
      getAllListings()
      myElements()
    })
  }, [nftmarketaddress])
  async function searchnetwork() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      if (network.chainId == 7700){
        setnftaddress(constants.Cgame);
        setnftmarketaddress(constants.Cmarket)
        setTokenName('Canto')
      } else if (network.chainId == 7701){
        setnftaddress(constants.Ctestgame);
        setnftmarketaddress(constants.Ctestmarket)
        setTokenName('Canto')
      }
    } catch(e){
        console.log(e)
      }
    }
  async function getAllListings() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      await provider.getNetwork()
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      )
      const data = await marketContract.fetchItemsCreated()
      let treasury = 0
      const items = await Promise.all(
        data.map(async (i) => {
          var meta = ''
          try {
            meta = imagelist[i.tokenId]
          } catch (error) {
            console.log('meta error')
            meta =
              'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
          }
  
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          let sold = 'Not yet'
          if (i.sold) {
            sold = 'Sold'
            treasury = treasury + parseFloat(price)
          }
          let item = {
            price,
            itemId: i.itemId.toNumber(),
            tokenId: i.tokenId.toNumber(),
            name: title[i.tokenId],
            seller: i.seller,
            owner: i.owner,
            sold: sold,
            image: meta,
          }
          return item
        })
      )
      setNfts(items)
      console.log("read data")
      setTreasury(treasury.toFixed(2))
    } catch{
      console.log(Error)
    }

  }
  async function myElements() {
    setLoading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
      const account = await signer.getAddress()
      setAccount(account)
  
      if (account) {
        const ownerAddress = [
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
          account,
        ]
        const ownerIds = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
        ]
  
        const balanceArray = await contract2.balanceOfBatch(
          ownerAddress,
          ownerIds
        )
        setBalanceArray(balanceArray)
        const itemBalance = await Promise.all(
          balanceArray.map(async (i, key) => {
            if (i.toString() !== '0') {
              let item = {
                tokenId: key,
                name: title[key],
                image: imagelist[key],
                balance: i.toString(),
              }
              return item
            } else return
          })
        )
        var filtered = itemBalance.filter((x) => x !== undefined)
        setNftBanalce(filtered)
        console.log(filtered)
      } else {
        console.log('You need to mint your first element')
      }
    } catch (e){
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-700 h-full ">
      <Header />
      { loading ?
         (<div className=" flex items-center justify-center h-screen">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center  rounded-full animate-pulse bg-blue-900 text-blue-200">loading...</div>
          </div>
          ):
          (
        <div className='m-auto p-2 bg-gray-700 '>
          <div className={style.bannerImageContainer}>
            <div className=" flex">
              <div className={style.info}>Balance
                <div className={'text-sm text-sky-400 m-auto px-4'}>
                  {NftBanalce.length}
                </div> 
              </div>
              <div className={style.info}>Listed NFT
                <div className={'text-sm text-sky-400 m-auto px-4'}>
                  {items.length}
                </div>
              </div>
              <div className={style.info}>Total earned 
              <div className={'text-sm text-sky-400 m-auto px-4'}>
                {treasury} { tokenName}
              </div>
              
              </div>
              
            </div>
          </div>
          <div className=' ' >
            <div className='p-4 m-2 border rounded-lg'>
            <span className="flex-1 ml-3 whitespace-nowrap text-gray-200 ">NFT balance</span>
            <div className=" m-auto p-2 flex flex-wrap justify-center ">
            
              {NftBanalce.map((nftItem, id) => (
                <div  className='flex justify-between p-2 ' key={id}>
                  <NFTCard1
                    key={id}
                    order={nftItem.tokenId}
                    nftItem={nftItem}
                    name={nftItem.name}
                    title={title[nftItem.tokenId]}
                    listings={nftItem.sold}
                    price={nftItem.price}
                    balance={nftItem.balance}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='p-4 m-2 border rounded-lg'>
            <span className="flex-1 ml-3 whitespace-nowrap text-gray-200">Listed NFT</span>
          
          <div className=" m-auto p-2 flex flex-wrap justify-center ">
            
              {items.map((nftItem, id) => (
                <div className='flex justify-between p-2' key={id}>
                  <NFTCard2
                    key={id}
                    order={id}
                    nftItem={nftItem}
                    name={nftItem.name}
                    title={title[nftItem.tokenId]}
                    listings={nftItem.sold}
                    price={nftItem.price}
                  />
                </div>
              ))}
          </div>
          </div>
          </div>
          
        </div>)
      }
    </div>
  )
}
export default Profile
