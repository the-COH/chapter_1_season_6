import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Select from 'react-select'
import constants from './../components/constants'
import NFT from './artifacts/LittleAlchemy.json'
import Token from './artifacts/Token.json'
import Staking from './artifacts/NFTStaking.json'
import Header from './../components/Header'
import NftElement from './../components/NftElement'
import {CgAttachment} from 'react-icons/cg'
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
  button: ` bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2 `,
  mintbutton: `bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 rounded-lg  px-5 py-2.5 text-center mr-2 mb-2`,
}

const Stake = () => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [NftBanalce, setNftBanalce] = useState([])
  const [nftaddress, setnftaddress] = useState()
  const [NFTamout, setNFTamount] = useState('0')
  const [stakingBal, setStakingBal] = useState()
  const [APY, setAPY] = useState()
  const [totalReward, setTotalReward] = useState()
  const [selectedNFT, setselectedNFT] = useState()
  const [RewardBox, setRewardBox] = useState()
  const [reward, setReward] = useState()
  const [limitId, setlimitId] = useState()
  const [totalstakedByUser, setTotalstakedByUser] = useState()
  const [listId, setlistId] = useState({ value: 'index', label: 'staking orders'})
  const [orderId, setOrderId] = useState('0')
  const [tokenAddress, setTokenAddress] = useState()
  const [stakingAddress, setStakingAdress] = useState()
  const [network, setnetwork] = useState()
  const [approvStake, setApprovedStake] = useState()
  const [elementA, setElementA] = useState({value: '', label: 'Element' })
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
    window.ethereum.on('networkChanged', function (networkId) {
      searchnetwork()
      accountInfo()
    })
  }, [tokenAddress, network])

  const notification = (msg) => toast(msg)

  async function searchnetwork() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      setnetwork(network)
      if (network.chainId == 7700) {
        setnftaddress(constants.Cgame)
        setTokenAddress(constants.Ctoken)
        setStakingAdress(constants.CStaking)
      } else if (network.chainId == 7701){
        setnftaddress(constants.Ctestgame)
        setTokenAddress(constants.Ctesttoken)
        setStakingAdress(constants.CtestStaking)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function ApproveStake() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let transaction = await contract.setApprovalForAll(stakingAddress, true)
      await transaction.wait()
      setApprovedStake(true)
    } catch (error) {
      console.log(error)
    }
  }
  async function accountInfo() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      // import contract ABI
      const contract1 = new ethers.Contract(tokenAddress, Token.abi, signer)
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
      const contract3 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      // read states
      const account = await signer.getAddress()
      const appro = await contract2.isApprovedForAll(account, stakingAddress)
      const totalstakedByUser = await contract3.getStakingInfo(account)
      const stakedBal = await contract3.stakedBalance(account)
      const totalstaked = await contract3.totalStaked()
      const selectedNFT = await contract3.selectedNFT()
      const limitId = await contract3.limitId()
      const RewardBox = await contract3.RewardBox()
      const totalReward = await contract3.totalTokenReward()
      const stakingBal = await contract3.stakedBalance(account)
      // balance
      const balance = await contract1.balanceOf(account)
      // APY
      const totalRewardPerYear = 0.001 * 5760 * 365
      const stakedPercentage = (stakedBal * 100) / totalstaked
      const stakedRewardPerYear = (totalRewardPerYear * stakedPercentage) / 100
      const apy = (stakedRewardPerYear * 100) / stakedBal
      // calculate reward
      var reward = 0
      for (var i = 0; i < totalstakedByUser.length; i++) {
        try {
          const indexreward = await contract3.calculateReward(account,totalstakedByUser[i].index)
          reward += parseFloat(ethers.utils.formatEther(indexreward))
          console.log(parseFloat(ethers.utils.formatEther(indexreward)),reward)
        } catch (error) {
          console.log(error)
        }
      }
      // staking balance
      const stakingBalance = await Promise.all(
        totalstakedByUser.map(async (i, key) => {
          let bal = {
            index: i.index.toString(),
            amount: i.amount.toString(),
            id: i.id.toString(),
            claimed: i.claimed,
          }
          return bal
        })
      )
      // list of index staking
      let selectstakingId = stakingBalance.map((e) => ({
        value: e.index,
        label: e.index,
      }))
      // NFT balance 
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
        
        setStakingBal(stakingBal.toString())
      } else {
        console.log('You need to mint your first element')
      }
      //set data
      setAccount(account)
      setReward(reward.toFixed(2))
      setselectedNFT(selectedNFT.toString())
      setlimitId(limitId.toString())
      setRewardBox(parseFloat(ethers.utils.formatEther(RewardBox)).toFixed(2))
      setTotalReward(parseFloat(ethers.utils.formatEther(totalReward)).toFixed(2))
      setApprovedStake(appro)
      setTotalstakedByUser(stakingBalance)
      setlistId(selectstakingId)
      setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(1))
      setAPY(apy ? apy.toFixed(2) : '0')
      
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
  }
  async function Stake() {
    setLoading2(true)
    console.log(elementA.value, NFTamout)
    if (account && elementA.value ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.stake(elementA.value, NFTamout)
        await transaction.wait()
        notification('Grate! you are staking ', NFTamout, 'NFT id:', elementA.value)
      } catch (error) {
        console.log(error)
        notification('input Error or NFT not Stakable!')
      }
      
    } else {
      notification('input required!')
    }
    accountInfo()
    setLoading2(false)
  }
  async function Swap() {
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.claimBox(selectedNFT)
        await transaction.wait()
        notification('Swap NFT:', selectedNFT, 'for ', RewardBox)
        accountInfo()
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
    }
  }
  async function Claim() {
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.claimRewards()
        await transaction.wait()
        notification('Reward claimed')
        accountInfo()
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
    }
  }
  async function unStake() {
    console.log('unstake', orderId.value)
    if (account && orderId.value ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.unstake(orderId.value)
        await transaction.wait()
        notification('Unstake successful!')
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
    } else {
      notification('input required!')
    }
    accountInfo()
  }
  const onChangeHandler = (event) => {
    setNFTamount(event.target.value)
  }
  async function setfundAddress() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setfundAddress(
        '0x2e72Bd602522F937e350d872D572451f877BC8ec'
      )
      await transaction.wait()
    }
  }
  async function setSelectedNFT() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setselectedNFT('23')
      await transaction.wait()
    }
  }
  async function setrewardBox() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setRewardBox('20000000000000000000')
      await transaction.wait()
    }
  }
  async function setLimitId() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setLimitId('2')
      await transaction.wait()
    }
  }

  
  return (
    <div className="bg-gray-700  ">
      <Header />
      <div className="text-neutral m-2 flex items-center text-white">
        
        <div>
          {account === '0xD687ca2fa168e7BAbed632803F6E4b06ef98B764' ? (
            <div>
              <button
                className={style.button}
                onClick={() => setfundAddress()}
              >
                setfundAdrress
              </button>
              <button
                className={style.button}
                onClick={() => setSelectedNFT()}
              >
                setselectedNFT
              </button>
              <button className={style.button} onClick={() => setrewardBox()}>
                setRewardBox
              </button>
              <button className={style.button} onClick={() => setLimitId()}>
                setLimitId
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        
        <div className="flex p-4 mb-4 text-sm rounded-lg bg-blue-50 dark:bg-gray-400 dark:text-gray-800" role="alert">
            <CgAttachment/>
            <div>
              <span className="font-medium">Important!</span> Staking will be limited for 4  NFT Elements: Computer, Internet, Blockchain and Bitcoin
            </div>
          </div>
      </div>
        
      <div className="flex flex-col p-2 gap-6 text-white lg:flex-row lg:items-stretch">
        <div className=" flex flex-1 flex-col items-center gap-6">
          
          <div className="bg-gray-800 h-full p-2 border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
            NFT Balance:
          
          <div className="m-auto justify-between flex flex-wrap w-60 ">
            {NftBanalce?.map((item, index) => (
              <NftElement key={index} item={item} />
            ))}
          </div>
          </div>
        </div>

        <div className="bg-gray-800 p-1 rounded-2xl flex flex-1 flex-col items-center gap-6">
          <div className="w-full max-w-[560px]">
            <div className="text-neutral" data-rttabs="true">
              <ul
                className="flex list-none flex-row flex-wrap gap-4"
                role="tablist"
              >
                <li
                  className="group-hover:bg-light hover:bg-light react-tabs__tab--selected flex-auto rounded-2xl text-center transition hover:duration-150 hover:ease-in-out focus-visible:outline-none"
                  role="tab"
                  id="tab:r1:0"
                  aria-selected="true"
                  aria-disabled="false"
                  aria-controls="panel:r1:0"
                  tabindex="0"
                  data-rttab="true"
                >
                  <div className="border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
                    Element to Stake
                    <div>
                      <Select
                        className="m-2 p-2 text-sm text-black"
                        value={elementA}
                        onChange={setElementA}
                        options={elementsOptions}
                      />
                    </div>
                    <div class="flex flex-wrap m-auto justify-center mb-6">
                      <input
                        type="number"
                        value={NFTamout}
                        onChange={onChangeHandler}
                        className="sm:text-md  m-2 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      ></input>
                      
                    </div>
                    {approvStake ? (loading2 ? (
                      <div className=" flex items-center justify-center">
                        <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          loading...
                        </div>
                      </div>
                    ): (
                      <button className={style.button} onClick={() => Stake()}>
                        Stake
                      </button>
                      
                    )
                      
                    ) : (
                      <button
                        className={style.button}
                        onClick={() => ApproveStake()}
                      >
                        Approve
                      </button>
                    )}
                    <Toaster />
                  </div>
                </li>
                <li
                  className="group-hover:bg-middle hover:bg-middle flex-auto rounded-2xl text-center transition hover:duration-150 hover:ease-in-out focus-visible:outline-none"
                  role="tab"
                  id="tab:r1:1"
                  aria-selected="false"
                  aria-disabled="false"
                  aria-controls="panel:r1:1"
                  data-rttab="true"
                >
                  <div className="border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
                    UnStake & Claim
                    <div>
                      <Select
                        className="m-2 p-2 text-sm text-black"
                        value={orderId}
                        onChange={setOrderId}
                        options={listId}
                      />
                    </div>
                    <div class=" mb-6"></div>
                    <div>
                      <button
                        className={style.button}
                        onClick={() => unStake()}
                      >
                        UnStake and Claim
                      </button>
                    </div>
                    <button
                      className={style.mintbutton}
                      onClick={() => Claim()}
                    >
                      Claim
                    </button>
                  </div>
                </li>
              </ul>
              <div
                className="react-tabs__tab-panel react-tabs__tab-panel--selected"
                role="tabpanel"
                id="panel:r1:0"
                aria-labelledby="tab:r1:0"
              ></div>
              <div
                className="react-tabs__tab-panel"
                role="tabpanel"
                id="panel:r1:1"
                aria-labelledby="tab:r1:1"
              ></div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">NFT Balance</div>
                <div className="text-right">Staked</div>
              </div>
            </div>
            <div>
              <div className="text-light flex justify-between py-4 text-[20px] font-light sm:text-[24px]">
                <div className="text-left">{NftBanalce.length} </div>
                <div className="text-right"> {stakingBal}</div>
              </div>
            </div>
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left"> Balance</div>
                <div className="text-right">Reward</div>
              </div>
            </div>
            <div>
              <div className="text-neutral flex justify-between text-[18px] font-extralight sm:text-[20px]">
                <div className="text-left"> {balance} ALCHI</div>
                <div className="text-right"> {reward} ALCHI</div>
              </div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">Total Reward</div>
                <div className="text-right">Staking APY</div>
              </div>
            </div>
            <div>
              <div className="text-middle flex justify-between pt-4 text-[18px] font-light sm:text-[24px]">
                <div className="text-left">{totalReward} ALCHI</div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p> {APY} %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">Amount</div>
                <div className="text-right">
                  Lucky NFT: {title[selectedNFT]}
                </div>
              </div>
            </div>
            <div>
              <div className="text-middle flex justify-between pt-4 text-[18px] font-light sm:text-[24px]">
                <div className="text-left"> {RewardBox} ALCHI</div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <button className={style.mintbutton} onClick={() => Swap()}>
                      Swap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-6">
        <div className="bg-gray-800 h-full p-2 border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
            Staked NFT:
            {totalstakedByUser ? (
              <div className="m-auto justify-between flex flex-wrap w-60">
                {totalstakedByUser.map((i, key) => (
                  <div className='bg-gray-500 border rounded-lg m-1 shadow-sm text-gray-200' key={key}>
                    <span className="flex items-center justify-center p-2 text-xs">
                      {' '}
                      Index: {i.index}{' '}
                    </span>

                    <span className="flex items-center justify-center p-2 text-xs "> NFT Id: {i.id} </span>
                    {i.id <= 20 ? (
                      <span className="flex items-center justify-center p-2 text-xs">reward factor: 25 %</span>
                    ): (i.id == 21 ? (
                      <span className="flex items-center justify-center p-2 text-xs">reward factor: 50 %</span>
                    ): (i.id == 22 ? (
                      <span className="flex items-center justify-center p-2 text-xs">reward factor: 75 %</span>
                    ): (
                      <span className="flex items-center justify-center p-2 text-xs">reward factor: 75 %</span>
                    )
                      )) }
                    <span className="flex items-center justify-center p-2 text-xs">
                      {' '}
                      Amount: {i.amount}{' '}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" flex items-center justify-center">
                <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  loading...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Stake
