import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import Select, { components } from 'react-select';
import { ethers } from 'ethers'
import {useWeb3, useSwitchNetwork} from '@3rdweb/hooks'
import {CgProfile, CgShoppingCart, CgListTree} from "react-icons/cg"
import logo from "../assets/logo_name.png"

const Header =()=>{
    const [networkId, setNetworkId] = useState({ })
    const {address, connectWallet } = useWeb3()
    const { switchNetwork } = useSwitchNetwork();
    const supportChainIds = [{ value: 7700, label: 'Canto' }, { value: 7701, label: 'CantoTestnet' }];
    useEffect(() => {
        searchnetwork()
        console.log(networkId)
      },[!networkId])
      useEffect(() => {
        if (!networkId) return
        try {
          window.ethereum.on('accountsChanged', function (accounts) {
          searchnetwork()
        })
        window.ethereum.on('networkChanged', function(networkId){
          searchnetwork()
        });
        } catch (error) {
          alert('you need Metamask extension to run this App')
          console.log(error)
        }
        
      },[networkId])
    var handleChange = (selected) => {
        switchNetwork(selected.value)
        searchnetwork()
        console.log(networkId)
      };
    async function searchnetwork() {
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const network = await provider.getNetwork()
          if (network.chainId == 7700){
            setNetworkId({value: network.chainId, label: "Canto"})
          } else if (network.chainId == 7701){
            setNetworkId({value: network.chainId, label: "CantoTestnet"})
          } else {
            setNetworkId({value: network.chainId, label: "Unsupported"})
          } 
        } catch(e){
            console.log(e)
          }
        }
        const customStyles = {
          option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
          }),
      
          control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: "#212529",
            border: "none",
            boxShadow: "none",
          }),
          singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#5ce1e6" }),
        };
       
    return <nav className="justify-between px-4 py-3 text-gray-700 border border-gray-200  sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">     
                  <ul className="inline-flex items-center space-x-1 md:space-x-3 sm:mb-0">
                      <li>
                          <Link href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Image 
                            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            src={logo} 
                            height={40} 
                            width={40}
                            alt=''
                            />
                          <span className=" ml-3">OpenALCH</span>
                          </Link>
                      </li>
                      <div className='m-auto inline-flex items-center justify-between'>
                      {address ? (
                        <>
                        <li>
                        <ol className="flex items-center mx-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          
                            <Select
                              value={networkId}
                              styles={customStyles}
                              onChange={handleChange}
                              options={supportChainIds}
                            />
                          
                        </ol>
                      </li>
                        <li>
                          <Link href="/Game" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          <CgListTree/>
                          <span className="flex-1 ml-3 whitespace-nowrap">New Elements</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/Marketpalce" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          <CgShoppingCart/>
                          <span className="flex-1 ml-3 whitespace-nowrap">Marketpalce</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/Stake" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          <CgShoppingCart/>
                          <span className="flex-1 ml-3 whitespace-nowrap">StakeNFT</span>
                          </Link>
                      </li>
                      <li>
                          <Link  href="/Profile" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <CgProfile/>
                          <span className="flex-1 ml-3 whitespace-nowrap">User</span>
                          </Link>
                      </li>
                        </>
                      ): (
                        <div className=''>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                          onClick={() => connectWallet('injected')}>
                            Connect Wallet
                          </button></div>
                      )}
                      </div>
                      
                      
                  </ul>
    </nav>
}
export default Header