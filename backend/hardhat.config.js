require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
        ],
    },
    networks: {
        localhost: {
            chainId: 31337,
        },
    },
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}