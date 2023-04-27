
import {AiFillMediumCircle} from "react-icons/ai";
import {ImTelegram, ImTwitter} from "react-icons/im";
import React from "react";

const Footer =()=>{
    return <footer className="p-4  shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800">
            <span className="text-sm  text-gray-300 sm:text-center">© 2022 <a href="https://www.littlealci.xyz/">OpenALCHI</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm  text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="/LegalDisclaimer" className="mr-4 hover:underline md:mr-6">Legal Disclaimer</a>
                </li>
            </ul>
            <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                
                <a href="https://twitter.com/OpenALCHI" className="text-gray-400  hover:text-white">
                    <ImTwitter/>
                    <span className="sr-only">Twitter page</span>
                </a>
                <a href="https://t.me/AlchimetisNFT" className="text-gray-400  hover:text-white">
                    <ImTelegram/>
                    <span className="sr-only">Telegram</span>
                </a>
                <a href="https://medium.com/@alchy.metis" className="text-gray-400  hover:text-white">
                    <AiFillMediumCircle/>
                    <span className="sr-only">Medium</span>
                </a>
            </div>
        </footer>
}
export default Footer
