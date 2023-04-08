import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

const supportedChainIds = [ 7700, 7701]
const connectors = {
  injected: {},
  walletlink: {
    appName: "thirdweb - demo", url: "https://thirdweb.com", darkMode: false, },
    walletconnect: {}
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
    
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
