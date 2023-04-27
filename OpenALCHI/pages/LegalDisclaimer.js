import React, { useEffect, useState } from 'react'
import Header from './../components/Header'


const LegalDisclaimer = () => {

  return (
    <div className=" h-screen  bg-gray-700 ">
      <Header />
      <div className="relative  rounded-lg shadow bg-gray-700">
        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold  text-white">
                    Legal Disclaimer
                </h3>
        </div>
            <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed  text-gray-400">
                    Please read this disclaimer carefully before using https://www.littlealci.xyz/ and/or any of its sub-domains (hereinafter referred to as the "Website").
                    By using the Website, you confirm that you accept this legal disclaimer and agree to comply with it. If you do not agree, you must not use the Website.
                    </p>
                    <p className="text-base leading-relaxed  text-gray-400">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                    </p>
            </div>
            <div className="p-6 space-y-6">
                <h3 className="text-l font-semibold  text-white">
                    Usage risks
                </h3>
                    <p className="text-base leading-relaxed  text-gray-400">
                    The Website will not be responsible for any losses, damages, or claims arising from events falling within the scope of events like, but not limited to: mistakes made by the user (e.g., payments sent to wrong addresses),
                     software problems of the Website or any related software or service (e.g., malware or unsafe cryptographic libraries), technical failures (e.g., hardware wallets malfunction), security problems experienced by the user (e.g., unauthorized access to wallets), actions or inactions of third parties (e.g., bankruptcy of service providers, information security attacks on service providers, and fraud conducted by third parties).
                    </p>
            </div>
            <div className="p-6 space-y-6">
                <h3 className="text-l font-semibold  text-white">
                Security
                </h3>
                    <p className="text-base leading-relaxed  text-gray-400">
                    Security audits don't eliminate risks completely. The Website is not guaranteed to be secure or free from bugs or viruses.
                    </p>
                    <p className="text-base leading-relaxed  text-gray-400">
                    As a commitment towards the safety of our users and partners, we want to be transparent about the changes and the status of the security audits of our smart contracts.
                    </p>
                    <p className="text-base leading-relaxed  text-gray-400">
                    OpenALCHI smart contract was adapted from Solidly, which codebase was open sourced. no security incidents related to Solidly smart contracts were reported.
                    
                    </p>
            </div>
           
       </div> 
    </div>
  )
}
export default LegalDisclaimer
