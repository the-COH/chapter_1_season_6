# 👛 multisig.canto - forkable Canto/Testnet multisig 
Repository: https://github.com/mugrebot/multisig.canto

🚀 Built with [Scaffold-Eth]


```bash
git clone https://github.com/mugrebot/multisig.canto
```

> install and start your 👷‍ Hardhat chain:

```bash
cd multisig.canto
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd multisig.canto
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd multisig.canto
yarn deploy
```

> in a fourth terminal window, 🗄 start your backend:

```bash
cd multisig.canto
yarn backend
```

📱 Open http://localhost:3000 to see the app

💬 Join the multisig.lol developer chat: https://t.me/+0wAfxh5Na9pkNzUx

## Experimental next-app 🧪

In `/packages/next-app` there is an experimental next-app, which ports the functionality in `packages/backend` and `packages/react-app` into a single Typescript `next.js` app (using Next API routes for the backend).

To run this app locally:

1. Copy `/packages/next-app/example.env.local` to `/packages/next-app/.env.local`, updating the DID_KEY -> ask in the multisig.lol Telegram for the `dev` key!
2. From the root run `yarn next-app:start`
3. Go to http://localhost:3000 to see the app (you will see API calls in the console)

## Some key features: 

Multisig.canto has two main contracts: Factory, and Wallet - The factory registers any wallet created to canto's turnstile contracts 

The next feature is that users/Owners may withdraw fees acrued on the multisig wallet - the faster approval the higher % of fees allocated to each user. 
