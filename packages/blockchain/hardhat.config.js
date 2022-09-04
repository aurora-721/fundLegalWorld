require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("hardhat-openzeppelin-defender");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["0xa6c8fbd561dcb1270cf4b9fee6d7d3912114ceb856a30ec0ed9b5d7389af5fbd"]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: ["0xa6c8fbd561dcb1270cf4b9fee6d7d3912114ceb856a30ec0ed9b5d7389af5fbd"]
    }
  },
  OpenzeppelinDefenderCredential: {
    apiKey: "",
    apiSecret: "",
  }
};
