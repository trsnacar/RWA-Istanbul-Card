require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/2b58c46cb9114e3ab711b8e84d6c402a`,
      accounts: [`0x4e82201c187f5a2a1303575998c1f9b24c3828358f44a66d4e8d1effd63822db`],
      chainId: 80002
    }
  },
  mocha: {
    require: 'esm'
  }
};
