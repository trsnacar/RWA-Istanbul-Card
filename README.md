# RWA Istanbul Card

Tokenization of the Istanbul public transit card (Istanbulkart) as a real-world asset (RWA) on the Polygon blockchain, with an on-chain reward program for cardholders. Written in Solidity and built with Hardhat.

## Overview

This project explores tokenizing the Istanbulkart transit card by representing it as an ERC-20 token on Polygon, and rewarding token holders through a simple, owner-managed reward program.

## Smart Contracts

### `IstanbulkartToken.sol`

A standard ERC-20 token (`IST`) built on OpenZeppelin's `ERC20` implementation.

- Mints the full `initialSupply` to the deployer at construction time.
- Inherits standard ERC-20 functionality: `transfer`, `approve`, `transferFrom`, `balanceOf`, `allowance`, `totalSupply`.

### `RewardProgram.sol`

An `Ownable` contract that lets the contract owner distribute `IstanbulkartToken` rewards to users.

- `rewardUser(address user, uint256 amount)` — owner-only; increments the user's cumulative reward balance and transfers tokens to them (via OpenZeppelin `SafeERC20`).
- `rewards(address)` — public mapping tracking cumulative rewards granted per address.
- Emits a `RewardGranted` event on every reward.
- Guards against zero-address recipients/token and zero-amount rewards.

The `RewardProgram` contract must hold a sufficient `IstanbulkartToken` balance (e.g. via a transfer from the token owner) before it can pay out rewards.

## Tech Stack

- **Solidity** `0.8.20`
- **Hardhat** (`@nomicfoundation/hardhat-toolbox`, `hardhat-waffle`, `hardhat-ethers`)
- **OpenZeppelin Contracts** `^5.0.2`
- **Ethers.js** `v5`
- **Polygon Amoy testnet** via **Infura** as the target network
- **Mocha/Chai** for testing

## Project Structure

```
contracts/
  IstanbulkartToken.sol   # ERC-20 token contract
  RewardProgram.sol       # Owner-managed reward distribution contract
scripts/
  deploy.js               # Deployment script (token + reward program)
check-balance/
  checkBalance.js         # Standalone script to query a token balance
test/
  IstanbulkartToken.test.mjs
  RewardProgram.test.mjs
hardhat.config.js
```

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A MetaMask (or other) wallet with a funded account on Polygon Amoy for deployment
- An [Infura](https://infura.io/) account and project ID for RPC access to Polygon Amoy

## Installation

```bash
git clone https://github.com/trsnacar/RWA-Istanbul-Card.git
cd RWA-Istanbul-Card
npm install
```

The `check-balance` script has its own `package.json`; install its dependencies separately if you plan to run it:

```bash
cd check-balance
npm install
```

## Environment Variables

Create a `.env` file in the project root (see `.env.example`) with:

```
INFURA_PROJECT_ID=your_infura_project_id
METAMASK_PRIVATE_KEY=your_wallet_private_key
```

> **Security note:** Never commit your `.env` file or a real private key to version control. `.env` is already listed in `.gitignore`. Use a dedicated deployment/testnet wallet, not one holding real funds.

## Compiling

```bash
npx hardhat compile
```

## Testing

```bash
npx hardhat test
```

Tests cover basic ERC-20 transfer behavior for `IstanbulkartToken` and reward distribution for `RewardProgram`.

## Deployment

Deploy to the Polygon Amoy testnet (configured in `hardhat.config.js`):

```bash
npx hardhat run scripts/deploy.js --network amoy
```

This deploys `IstanbulkartToken` (with an initial supply) followed by `RewardProgram`, wired to the deployed token address.

You can also deploy to a local Hardhat network:

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## Checking Balances

`check-balance/checkBalance.js` queries the token balance of a given address using the RPC and key configured via environment variables. Update the `tokenAddress` and target address inside the script as needed, then run:

```bash
node check-balance/checkBalance.js
```

## License

This project is licensed under the terms of the [MIT License](LICENSE).
