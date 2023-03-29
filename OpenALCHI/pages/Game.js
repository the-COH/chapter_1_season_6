import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Select from 'react-select';
import constants from './../components/constants'
import NFT from './artifacts/LittleAlchemy.json'
import Token from './artifacts/Token.json'
import Header from './../components/Header'
import {CgChevronDoubleRightO, CgChevronDoubleLeftO,CgShoppingBag, CgListTree} from "react-icons/cg"
import NftElement from './../components/NftElement'
import toast, { Toaster } from 'react-hot-toast'
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
const options = [
  { value: 'mintStandard', label: 'Standard Elements' },
  { value: 'mintPlant', label: 'RainEarth' },
  { value: 'mintSand', label: 'AirRock' },
  { value: 'mintRock', label: 'AirLava' },
  { value: 'mintMud', label: 'WaterEarth' },
  { value: 'mintRain', label: 'WaterAir' },
  { value: 'mintSteam', label: 'WaterFire' },
  { value: 'mintEnergy', label: 'FireAir' },
  { value: 'mintLava', label: 'FireEarth' },
  { value: 'mintMetal', label: 'FireRock' },
  { value: 'mintGlass', label: 'SandFire' },
  { value: 'mintSwamp', label: 'PantMud' },
  { value: 'mintEyeglasse', label: 'GlassGlass' },
  { value: 'mintElectricity', label: 'EnergyMetal' },
  { value: 'mintLife', label: 'EnergyMud' },
  { value: 'mintHuman', label: 'LifeEarth' },
  { value: 'mintNerd', label: 'EyeglasseHuman' },
  { value: 'mintComputer', label: 'ElectricityNerd' },
  { value: 'mintInternet', label: 'ComputerComputer' },
  { value: 'mintBlockchain', label: 'ComputerInternet' },
  { value: 'mintBitcoin', label: 'NerdBlockchain' }
]
const elementsOptions = [
  { value: 0, label: 'Water' },
  { value: 1, label: 'Air' },
  { value: 2, label: 'Fire' },
  { value: 3, label: 'Earth' },
  { value: 4, label: 'Steam' },
  { value: 5, label: 'Energy' },
  { value: 6, label: 'Lava' },
  { value: 7, label: 'Rain' },
  { value: 8, label: 'Mud' },
  { value: 9, label: 'Plant' },
  { value: 10, label: 'Rock' },
  { value: 11, label: 'Sand' },
  { value: 12, label: 'Metal' },
  { value: 13, label: 'Glass' },
  { value: 14, label: 'Swamp' },
  { value: 15, label: 'Eyeglasse' },
  { value: 16, label: 'Electricity' },
  { value: 17, label: 'Life' },
  { value: 18, label: 'Human' },
  { value: 19, label: 'Nerd' },
  { value: 20, label: 'Computer' },
  { value: 21, label: 'Internet' },
  { value: 22, label: 'Blockchain' },
  { value: 23, label: 'Bitcoin' },
]
const style = {
  container: ` py-4 px-4 rounded-xl `,
  wrapper: `justify-between items-stretch grid gap-6 mb-6 md:grid-cols-2 `,
  titleContainer: `text-4xl font-bold text-white mb-4`,
  info: `text-lg text-white mb-8`,
  priceValue: `flex justify-center  font-bold mt-2`,
  button0: `text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2 `,
  button: `text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 `,
  mintbutton: `text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
}

const Game = () => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [balanceArray, setBalanceArray] = useState([0])
  const [NftBanalce, setNftBanalce] = useState([])
  const [mintFee, setmintFee] = useState([])
  const [formula, setFormula] = useState('')
  const [resultat, setResultat] = useState('0')
  const [elementA, setElementA] = useState({ value: 'mintStandard', label: 'Standard Elements' })
  const [elementB, setElementB] = useState({ value: 'mintStandard', label: 'Standard Elements' })
  const [nftaddress, setnftaddress] = useState()
  const [tokenAddress, setTokenAddress] = useState()
  const [ImageIndex, setImageIndex] = useState()
  const [allowed, setAllowance] = useState()
  const [network, setnetwork] = useState()
  useEffect(() => {
    searchnetwork()

  }, [nftaddress])
  useEffect(() => {
    if (!tokenAddress || !network) return
    accountInfo()
    window.ethereum.on('accountsChanged', function (accounts) {
      searchnetwork()
      accountInfo()
    })
    window.ethereum.on('networkChanged', function(networkId){
      searchnetwork()
      accountInfo()
    });
  }, [tokenAddress, network])
  const confirmClaim = (msg) => toast(msg)

  async function searchnetwork() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      setnetwork(network)
      if (network.chainId == 7700) {
        setnftaddress(constants.Cgame);
        setTokenAddress(constants.Ctoken)
      } else if (network.chainId == 7701){
        setnftaddress(constants.Ctestgame);
        setTokenAddress(constants.Ctesttoken)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function accountInfo() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract1 = new ethers.Contract(tokenAddress, Token.abi, signer)
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
      const account = await signer.getAddress()
      console.log(account)
      const value = await contract1.allowance(account, nftaddress)
      const amount = (value/10**18).toString()
      console.log(amount/10**18)
      if (amount <= 40) {
        setAllowance(false)
      } else {
        setAllowance(true)
      }
      setAccount(account)
      // balance
      const balance = await contract1.balanceOf(account)
      setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(1))
      // fee
      const mintFee = await contract2.fee.call();
      setmintFee(parseFloat(ethers.utils.formatEther(mintFee)));
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
      } else {
        console.log('You need to mint your first element')
      }
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
  }
  function magicFormula(elementA, elementB) {

    const fusion = elementA.label + elementB.label
    const fusion0 = elementB.label + elementA.label
    for (let i = 0; i < options.length; i++) {
      if (fusion == options[i].label || fusion0 == options[i].label) {
        setResultat(options[i].value)
        setFormula(options[i].value)
        const index = title.indexOf(options[i].value.replace('mint', ''))
        setImageIndex(index)
        break
      }
      setResultat(1)
    }
  }

  async function Approuve() {
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.approve(nftaddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      await transaction.wait()
      setAllowance(true)
      confirmClaim('Approved successful!')
      } catch (error) {
        console.log(error)
      }
      
    }
  }
  //only owner
  async function setfundAddress() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      // set fund address to staking contract
      const transaction = await contract2.setfundAddress("0x5f2E88786214Ab5E4993d14C49f38ceA031B1004")
      await transaction.wait()
    }
  }

  async function Mint(element) {
    if (account) {
      setLoading2(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      const mintelement = element.toString();
      try {
        const transaction = await contract2[mintelement]();
        await transaction.wait()
        accountInfo()
        confirmClaim('transaction successful!')
      } catch (error) {
        console.log(error)
        confirmClaim("you can't mint this element")
      }
      setLoading2(false)
    }
  }
  async function mintStandard() {
    if (account) {
      setLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      try {
        const transaction = await contract2.mintStandard();
        await transaction.wait()
        accountInfo()
        confirmClaim('transaction successful!')
      } catch (error) {
        console.log(error)
        confirmClaim('transaction rejected')
        
      }
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-700 h-screen ">
      <Header />
      <aside className="fixed left-0 z-40 w-68 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-3">Balance </span>
                <span className="ml-3 text-sky-400 "> {balance}</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">ALCHI</span>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-3">Mint Fee </span>
                <span className="ml-3 text-sky-400 "> {mintFee}</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">ALCHI</span>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="ml-3 text-sky-400 ">Buy ALCHI</span>
                <li className="ml-3 "> {network?.chainId == 1088 ?
                      <a href="https://netswap.io/swap?inputCurrency=0x1d94cc954fce49db542a61d68901f787b874cf4b&outputCurrency/swap#/analytics/pairs/0xf2ad6d2bc50447c3688242c509a99bdd026ddcd7"
                        >
                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Netswap </span>
                        
                      </a> : (network?.chainId == 7701 ? (
                        <a href="#"
                          className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">CantoSwap</span>
                        </a>
                      ) : (network?.chainId == 7700 ? (
                      <a href="https://www.cantoswap.fi/#/swap?outputCurrency=0x5e8689741111442Eeb767507Fbf70BB5e8c3Bb6B">
                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">CantoSwap</span>
                      </a>)
                      : (
                        <a href="https://app.uniswap.org/#/tokens/optimism/0x36996c8642810add6c5bb814ed7a7ca8abc26fe0">
                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Uniswap</span>
                      </a>
                      )))

                    }</li> 
              </div>
            </li>
            
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
                  <CgShoppingBag/>
                <span className="flex-1 ml-3 whitespace-nowrap">NFT balance</span>
              </div>
            </li>
            <div className='bg-gray-700 flex flex-wrap w-60 rounded-lg'>
              {
                NftBanalce?.map((item, index) => (
                  <NftElement
                    key={index}
                    item={item}
                  />
                )
                )
              }
            </div>
          </ul>

        </div>
      </aside>
      <div className="p-2 sm:ml-64">
      {account === '0xD687ca2fa168e7BAbed632803F6E4b06ef98B764' ? (
                <div>
                    <button className={style.button0} onClick={() => setfundAddress()}>setfundAdrress</button>
                    
                </div>
            )
            : (
                <div></div>
            )}
        <div className=' p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700' >
        
              <div className="flex flex-wrap items-center justify-center p-2 mb-2 rounded bg-gray-50 dark:bg-gray-800">
              <p className="mb-2 p-4 font-light text-gray-400 dark:text-gray-300">To start you need first to have standard elements "Air", "Fire", "Earth" and "Water", total fee to mint is {4 * mintFee} ALCHI.</p>
                {loading ? (
                  <div className=" flex items-center justify-center">
                  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                </div>

                ) : (
                  allowed ? (
                  <button className={style.button0} onClick={() => mintStandard()}>Mint Standard Elements</button>
                  ):
                    (
                      <button className={style.button} onClick={() => Approuve()} >Approve ALCHI token</button>
                    )
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="flex flex-wrap items-center  justify-center  rounded bg-gray-50 dark:bg-gray-800">
                  <label className="block m-1 text-sm font-medium text-gray-900 dark:text-white">Select element</label>
                  <Select
                    className='m-4'
                    value={elementA}
                    onChange={setElementA}
                    options={elementsOptions}
                  />
                  <img
                          width='20'
                          src={imagelist[elementA.value]}
                          alt=""
                        />
                </div>
                <div className="flex items-center justify-center rounded">
                  
                  <button className={style.button} onClick={() => magicFormula(elementA, elementB)}>
                     Fusion 
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center  rounded bg-gray-50 dark:bg-gray-800">
                  <img
                          width='20'
                          src={imagelist[elementB.value]}
                          alt=""
                        />
                  <Select
                    className='m-4'
                    value={elementB}
                    onChange={setElementB}
                    options={elementsOptions}
                  />
                  <label className="block m-1 text-sm font-medium text-gray-900 dark:text-white">Select element </label>

                </div>

              </div>
              <div className="flex flex-wrap items-center justify-center py-4 m-auto rounded bg-gray-50 dark:bg-gray-800">
                
                {resultat == '0' ?
                  (<div className=''> </div>) :
                  resultat == 1 ?
                    <div>
                      <div className='py-4 flex flex-wrap'>
                        <img
                          width='100'
                          className="p-2 mx-auto  animate-bounce "
                          src={imagelist[elementA.value]}
                          alt=""
                        />
                        <img
                          width='100'
                          className="p-2 mx-auto animate-bounce "
                          src={imagelist[elementB.value]}
                          alt=""
                        />
                      </div>
                      <div className='block m-2 text-sm font-medium dark:text-[#fc7d8b] '>You cant combine these elements </div>
                    </div>

                    : (
                      <div className='py-4 space-y-2'>
                        <img
                          width="100"
                          className="  animate-bounce "
                          src={imagelist[ImageIndex]}
                          alt=""
                        />
                        <div className='flex p-2'>
                          {loading2 ? (
                            <div className=" flex items-center justify-center">
                            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                          </div>

                          ) : (
                            <button className={style.mintbutton} onClick={() => Mint(resultat)} > {resultat} </button>
                          )}
                        </div>
                        <Toaster
                          position="top-center"
                          reverseOrder={false}
                          gutter={8}
                          toastOptions={{
                            className: '',
                            duration: 5000,
                            style: {
                              background: '#0070ff',
                              color: '#fff',
                            },
                            success: {
                              duration: 3000,
                              theme: {
                                primary: 'green',
                                secondary: 'black',
                              },
                            },
                          }} />
                      </div>
                    )}

              </div>
              <Toaster />
        </div>

      </div>
    </div>
  )
}
export default Game
