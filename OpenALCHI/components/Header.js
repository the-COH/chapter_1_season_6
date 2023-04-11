import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import Select, { components } from 'react-select';
import { ethers } from 'ethers'
import {useWeb3, useSwitchNetwork} from '@3rdweb/hooks'
import {CgProfile, CgShoppingCart, CgListTree, CgImport, CgFormatJustify} from "react-icons/cg"
import logo from "../assets/logo.svg"

const Header =()=>{
    const [networkId, setNetworkId] = useState({ })
    const {address, connectWallet } = useWeb3()
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const { switchNetwork } = useSwitchNetwork();
    
    const supportChainIds = [{ value: 7700, label: 'Canto' }, { value: 7701, label: 'CantoTestnet' }];
    useEffect(() => {
        searchnetwork()
      },[!networkId])
      useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        setIsMenuHidden(mediaQuery.matches);
        const updateIsLargeScreen = () => setIsMenuHidden(mediaQuery.matches);
        mediaQuery.addListener(updateIsLargeScreen);
        return () => mediaQuery.removeListener(updateIsLargeScreen);
      }, []);
      useEffect(() => {
        if (!networkId) return
        try {
          window.ethereum.on('accountsChanged', function (accounts) {
          searchnetwork()
        })
        window.ethereum.on('chainChanged', function(networkId){
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
        function handleClick() {
          setIsMenuHidden(!isMenuHidden);
        }   
    return <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600" aria-label="Sidebar">     
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <Image 
                  className="h-8 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  src={logo} 
                  alt=''
                  />
                </Link>
              <div className="flex md:order-2">
                  {address ? (
                    <span >  </span>
                  ): (
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                          onClick={() => connectWallet('injected')}>
                            Connect Wallet
                          </button>
                  ) }
                  <button data-collapse-toggle="navbar-sticky" onClick={handleClick} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <CgFormatJustify size={42} />
                  </button>
              </div>
              <div className="hidden md:block">
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                  <ul className="inline-flex items-center space-x-1 md:space-x-3 sm:mb-0">
                          
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
                                  className='w-40'
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
                              <CgImport/>
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
                            </div>
                          )}
                          </div>
                          
                          
                  
                  </ul>
                </div>
              </div>
              <div className={isMenuHidden ? 'hidden ' : ''} id="mobile-menu">
                <div className=" px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <ul className=" items-center space-x-1 md:space-x-3 sm:mb-0">
                  
                  {address ? (
                    <>
                    <li>
                    <ol className="flex items-center mx-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      
                        <Select
                          value={networkId}
                          styles={customStyles}
                          onChange={handleChange}
                          options={supportChainIds}
                          className='w-40'
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
                      <CgImport/>
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
                    </div>
                  )}
                </ul>
                </div>
              </div>
            </div>           
    </nav>
}
export default Header