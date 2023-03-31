# Canto Starter Kit <<>> SE-2

GITHUB REPO : https://github.com/technophile-04/Canto-x-Se-2

DEMO Video : https://www.loom.com/share/6f40afd5ebbe4ba8ba006fa180bbd0a8

Live Demo DApp : https://canto-chi.vercel.app

| ![Screenshot 2023-04-01 at 1 43 44 AM](https://user-images.githubusercontent.com/80153681/229222176-9d103bc3-1e30-41eb-8757-c76692c250dd.jpg) | ![Screenshot 2023-04-01 at 1 49 26 AM](https://user-images.githubusercontent.com/80153681/229222246-a328bc8c-8273-4b68-aaf1-71ac0661c376.jpg) |
| :-------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| ![Screenshot 2023-04-01 at 1 46 18 AM](https://user-images.githubusercontent.com/80153681/229222279-bc552dd2-eaef-499e-812b-fb9dce71130c.jpg) | ![Screenshot 2023-04-01 at 1 49 55 AM](https://user-images.githubusercontent.com/80153681/229222459-fb0d939d-5ef7-469d-8ef4-ac6910652779.jpg) |

Ready to take your dApp development on Canto to the next level? Look no further than Canto StarterKit ! Our pre-configured kit makes it a breeze to run seamlessly on Canto and Canto testnets. Let Canto Starter Kit handle the heavy lifting so you can focus on unleashing your creativity and taking the dApp world by storm!

It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

Built using NextJS, RainbowKit, Hardhat, Redstone, Wagmi and Typescript.

- ✅ **Contract Component**: Edit and test Solidity smart contracts on your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Canto network.
- 📜 **Interact with all the Canto contracts through one page locally**
- 🧱 **Custom hooks / components / util function like fetching price from readstone**

## Contents

- [Requirements](#requirements)
- [Overview](#Overview)
- [Quickstart](#Quickstart)
- [Deploying your Smart Contracts to a Canto Mainnet](#Deploying-your-Smart-Contracts-to-a-live-network)
- [Deploying your NextJS App](#Deploying-your-NextJS-App)
- [Disabling Type & Linting Error Checks](#Disabling-type-and-linting-error-checks)
  - [Disabling commit checks](#Disabling-commit-checks)
  - [Deploying to Vercel without any checks](#Deploying-to-Vercel-without-any-checks)
  - [Disabling Github Workflow](#Disabling-Github-Workflow)
- [Contributing to Scaffold-Eth 2](#Contributing-to-Scaffold-Eth-2)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)

## Overview

The main aim of Canto Starter Kit is to easily onboard developers to Canto ecosystem by making them worry less about configuring stuff to get started and focus more on building products and leveraging the powers which Canto offers.

Its is a full-stack starter kit using `hardhat` for writing contracts and `NextJs` for fronent.

You just need to configure `.env` files and your full DApp gets configured for that network wihout you needing to change anyting else.

Eg: In `packages/nextjs/.env.development` if you configure `NETWORK=canto` now whenver you do transactions it will it will hint you to Canot Mainnet blockexplore instead of testnet explorer, similarly vice versa.

Even the deployed Canto contracts which you can interact thought UI like [cUSDC](https://docs.canto.io/evm-development/contract-addresses) will change based on this `.env`

Canto Starter kit is fork of [SE-2](https://github.com/scaffold-eth/se-2) so it has all the power of [SE-2](https://github.com/scaffold-eth/se-2) along with some great addtional tools specific to Canot ecosystem.

## Quickstart

To get started with Canto Starter Kit, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/technophile-04/Canto-x-Se-2
cd Canto-x-Se-2
yarn install
```

2. Rename `.env.example` to `.env` in `packages/hardhat` and fill the required keys which has some [`cantoTestnet` ETH](https://docs.canto.io/evm-development/testnet#faucet-instructions).

```
DEPLOYER_PRIVATE_KEY=1234 <- your private key with cantoTestnet eth
```

3. To deploy the NFT test contract with [turnstile](https://docs.canto.io/evm-development/contract-secured-revenue) example to cantoTestnet :

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts/YourContract.sol` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the `cantoTestnet` network. You can also customize the deploy script and network.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend.

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploying your Smart Contracts to a Canto Mainnet

Once you are ready to deploy your smart contracts, there are a few things you need to adjust.

1. Select the network

By default, `yarn deploy` will deploy the contract to the cantoTestnet. You can change the `defaultNetwork` key in `packages/hardhat/hardhat.config.ts.` You could also simply run `yarn deploy --network canto` to deploy to Canto mainnet network.

Check the `hardhat.config.ts` for the networks that are pre-configured. You can also add other network settings to the `hardhat.config.ts file`.

2. Verify your smart contract

You can verify your smart contract on Canto by running:

```
yarn verify --network canto
```

## Deploying your NextJS App

Run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**Make sure your `.env.production` file has the values you need.**

**Hint**: We recommend connecting the project GitHub repo to Vercel so you the gets automatically deployed when pushing to `main`

## Disabling type and linting error checks

> **Hint**
> Typescript helps you catch errors at compile time, which can save time and improve code quality, but can be challenging for those who are new to the language or who are used to the more dynamic nature of JavaScript. Below are the steps to disable type & lint check at different levels

### Disabling commit checks

We run `pre-commit` [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) which lints the staged files and don't let you commit if there is an linting error.

To disable this, go to `.husky/pre-commit` file and comment out `yarn lint-staged --verbose`

```diff
- yarn lint-staged --verbose
+ # yarn lint-staged --verbose
```

### Deploying to Vercel without any checks

Vercel by default runs types and lint checks while developing `build` and deployment fails if there is a types or lint error.

To ignore types and lint error checks while deploying, use :

```shell
yarn vercel:yolo
```

### Disabling Github Workflow

We have github workflow setup checkout `.github/workflows/lint.yaml` which runs types and lint error checks every time code is **pushed** to `main` branch or **pull request** is made to `main` branch

To disable it, **delete `.github` directory**

Generated from [SE-2](https://github.com/scaffold-eth/se-2) ❤️
